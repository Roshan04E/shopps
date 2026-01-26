import { auth } from "@/auth";
import { Button } from "@/components/button";
import Link from "next/link";
import { BiLogoWhatsapp } from "react-icons/bi";

export default async function ContactPage() {
  const session = await auth();

  const userName = session?.user.name || "A shops user";
  const message = `Hi, I am ${userName}. I have some queries.`;
  const url = `https://wa.me/916200020159?text=${encodeURIComponent(message)}`;

  return (
    <section className="pt-32 pb-20 container mx-auto px-6 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      <p className="text-slate-600 mb-6">Questions? Issues? We’re here.</p>

      <div className="bg-white/80 border rounded-2xl p-6 shadow space-y-4">
        <p>
          Email:{" "}
          <a
            href="mailto:roshan04e@proton.me"
            className="font-semibold text-blue-600 hover:underline"
          >
            roshan04e@proton.me
          </a>
        </p>
        <p>
          WhatsApp: <span className="font-semibold">+91 6200020159</span>
        </p>

        <Button variant="green">
          <Link href={url} target="_blank" rel="noopener noreferrer">
            <div className="flex gap-2 items-center  justify-center">
              <span>Chat now</span>
              <BiLogoWhatsapp className="h-6 w-6" />
            </div>
          </Link>
        </Button>
      </div>
    </section>
  );
}
