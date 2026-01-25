import Link from "next/link";
import { Button } from "@/components/button";
import { ShieldOff, ArrowLeft, Fingerprint } from "lucide-react";

export const metadata = {
  title: "Unauthorized"
}

export default function Unauthorized() {
  return (
    <div className="min-h-screen bg-red-50/30 flex items-center justify-center px-6">
      <div className="text-center max-w-xl">

        <div className="flex justify-center mb-6">
          <div className="bg-red-100 text-red-600 p-4 rounded-full">
            <ShieldOff size={40} />
          </div>
        </div>

        <h1 className="flex items-baseline justify-center text-6xl font-extrabold text-slate-900 mb-4 ">
          401
        </h1>

        <h2 className="text-2xl font-bold mb-3 flex items-baseline justify-center">
            Unauthorized
        </h2>

        <p className="text-slate-600 mb-8">
          You don’t have permission to access this page 🔒
        </p>

        <Link href="/">
          <Button variant="glass" className="h-12 px-6 text-lg">
            <ArrowLeft className="mr-2 w-5 h-5" />
            Go Home
          </Button>
        </Link>

      </div>
    </div>
  );
}
