"use server";

import { auth, signIn, signOut } from "@/auth";
import {
  paymentMethodSchema,
  signInFormSchema,
  signUpFormSchema,
} from "@/util/validators";
import { hashSync } from "bcrypt-ts-edge";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import prisma from "../prisma";
import z, { success, ZodError } from "zod";
import { toPlain } from "@/util/helpers";
import { shippingAddress, user, userProfileUpdate } from "@/types";
import { clearCartCookie } from "./action-cart";

export async function signInUser(prevState: unknown, formData: FormData) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", user);
    return {
      success: true,
      message: "Successfully signed in",
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return {
      success: false,
      message: "Invalid email or password",
    };
  }
}

// Sign out user

export async function signOutUser() {
  await signOut();
  await clearCartCookie();
}

// Sign up the user

export async function signUpUser(prevState: unknown, formData: FormData) {
  try {
    const user = signUpFormSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    const isUserExist = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (isUserExist)
      return {
        success: false,
        message: "Email already in database",
      };

    // add to the database

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashSync(user.password, 10),
      },
    });

    // sign in the user

    await signIn("credentials", {
      email: user.email,
      password: user.password, // pass the plain password
    });

    return {
      success: true,
      message: "User registered successfully.",
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    if (error instanceof ZodError) {
      const errorsFromZod = error.issues.map((i) => i.message).join(", ");
      return {
        success: false,
        message: errorsFromZod,
      };
    }

    return {
      success: false,
      message: "Some errors occured while registering the user.",
    };
  }
}

export async function getUserById(id: string) {
  const user = await prisma.user.findFirst({
    where: {
      id: id,
    },
  });

  if (!user) throw new Error("User does not exist.");

  return toPlain(user);
}

// update the shipping address
export async function updateUserAddress(data: shippingAddress) {
  try {
    const session = await auth();

    if (!session || !session?.user?.id) throw new Error("Session not found");

    const user: user = await getUserById(session.user.id);
    if (!user) throw new Error("User not found");

    await prisma.user.update({
      where: { id: user.id },
      data: {
        address: [data],
      },
    });

    return {
      success: true,
      message: "Address updated.",
    };
  } catch {
    return {
      success: false,
      message: "Error while updating the user address",
    };
  }
}

// update users payment method

export async function updateUserPaymentMethod(
  data: z.infer<typeof paymentMethodSchema>
) {
  try {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Unauthorized");
    const currentUser: user = await getUserById(session?.user?.id as string);

    if (!currentUser) throw new Error("User not found");

    // validate the payment method
    console.log(data);
    
    const paymentMethod = paymentMethodSchema.parse(data);
    await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        paymentMethod: paymentMethod.type,
      },
    });

    return {
      success: true,
      message: "User updated successfully",
    };
  } catch (err) {
    console.log(err);
    
    return {
      success: false,
      message: "Error occured while updating user preferred payment method",
    };
  }
}



// update user profile

export async function updateUserProfile({name, email, phone}: userProfileUpdate) {
  try {
      const session = await auth();
      if (!session) throw new Error("User not authenticated");

      const currentUser = await prisma.user.findFirst({
        where: {
          id: session.user?.id
        }
      }); // currentUser

      if (!currentUser) throw new Error("User not found");

      // update user info
      await prisma.user.update({
        where: {
          id: session.user?.id
        },
        data: {
          name: name,
          email: email,
          phone: phone
        }
      }); // prisma name and email update         


      return {
        success: true,
        message: "User informations updated successfully"
      }

  } catch (error) {
    console.log("user action error >>> ", error);
    
    return {
      success: false,
      message: "Error while updating user informations"
    }
  }
}