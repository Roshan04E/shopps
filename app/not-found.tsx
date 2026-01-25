import Link from "next/link";
import { Button } from "@/components/button";
import { ArrowLeft, Leaf } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-orange-50/30 flex items-center justify-center px-6">
      <div className="text-center max-w-xl">

        <div className="flex justify-center mb-6">
          <div className="bg-green-100 text-green-600 p-4 rounded-full">
            <Leaf size={40} />
          </div>
        </div>

        <h1 className="text-6xl font-extrabold text-slate-900 mb-4">
          404
        </h1>

        <h2 className="text-2xl font-bold mb-3">
          Page Not Found
        </h2>

        <p className="text-slate-600 mb-8">
          Looks like this page got lost on the way to the farm 🌱
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
