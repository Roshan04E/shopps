/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { compareSync } from "bcrypt-ts-edge";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { mergeCartOnLogin } from "./lib/actions/action-cart";

export const config = {
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },

  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60,
  },

  adapter: PrismaAdapter(prisma),

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },

      async authorize(credentials) {
        if (!credentials) return null;

        const user = await prisma.user.findFirst({
          where: { email: credentials.email as string },
        });

        if (!user || !user.password) return null;

        const isMatch = compareSync(
          credentials.password as string,
          user.password
        );

        if (!isMatch) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone ?? "",
        };
      },
    }),
  ],

  callbacks: {
    async session({ session, token, trigger, user }: any) {
      session.user.id = token.sub;
      session.user.role = token.role;
      session.user.name = token.name;
      session.user.phone = token.phone ?? "";

      if (trigger === "update") {
        session.user.name = user.name;
        session.user.phone = user.phone;
      }

      return session;
    },

    async jwt({ token, user, trigger }: any) {

      // LOGIN
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.name = user.name;
        token.phone = user.phone ?? "";

        // 🔥 merge guest cart
        await mergeCartOnLogin()
      }

      // PROFILE UPDATE
      if (trigger === "update") {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.sub },
        });

        token.name = dbUser?.name;
        token.phone = dbUser?.phone ?? "";
      }

      // PAGE REFRESH
      if (!user) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.sub },
        });

        token.phone = dbUser?.phone ?? token.phone;
      }

      return token;
    },

    authorized({ request, auth }: any) {
      const protectedPaths = [
        /^\/shipping-address/,
        /^\/payment-method/,
        /^\/place-order/,
        /^\/profile/,
        /^\/user\/(.*)/,
        /^\/order\/(.*)/,
        /^\/admin/,
      ];

      const { pathname } = request.nextUrl;

      if (!auth && protectedPaths.some((p) => p.test(pathname))) {
        return false;
      }

      if (pathname.startsWith("/admin") && auth?.user?.role !== "admin") {
        return NextResponse.redirect(
          new URL("/unauthorized", request.url)
        );
      }


      if (!request.cookies.get("sessionCartId")) {
        const sessionCartId = crypto.randomUUID();

        const response = NextResponse.next();
        response.cookies.set("sessionCartId", sessionCartId);
        return response;
      }

      return true;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
