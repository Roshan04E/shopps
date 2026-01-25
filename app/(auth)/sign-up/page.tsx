
import { Button } from "@/components/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import SignUpFormCredentials from "./sign-up-form-credentials"
import Link from "next/link"
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function SignInPage({searchParams}: {searchParams: Promise<{callbackUrl: string}>}) {
  const urlParameters = await searchParams;
  const callbackUrl = urlParameters.callbackUrl || "/";

  const session = await auth();
   let safeCallback = "/"
  
  if (callbackUrl) {
    const decoded = decodeURIComponent(callbackUrl)

    try {
      const url = new URL(decoded)
      // console.log("Callbackurl :  >>>   ", url);
  

      if (url.origin === process.env.NEXTAUTH_URL) {
        safeCallback = url.pathname + url.search
        // console.log("Callbackurl :  >>>   ", safeCallback);

      }
    } catch {}
  }

  if (session) {
    redirect(safeCallback)
  }
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>
          Enter the details below to register your account
        </CardDescription>
        <CardAction>
          <Link href={'/sign-in'}>
          <Button variant="outline">Sign In</Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <SignUpFormCredentials />
      </CardContent>
      <CardFooter className="flex-col gap-2">
       
      </CardFooter>
    </Card>
  )
}
