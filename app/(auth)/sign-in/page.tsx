
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
import SignInFormCredentials from "./sign-in-form-credentials"
import Link from "next/link"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function SignInPage({ searchParams }: { searchParams: Promise<{ callbackUrl?: string }> }) {
  
  
  const session = await auth();
  const { callbackUrl } = await searchParams;
  

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
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Link href={'/sign-up'}>
            <Button variant="ghost">Sign Up</Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <SignInFormCredentials callbackUrl={callbackUrl as string} />
      </CardContent>
      <CardFooter className="flex-col gap-2">

      </CardFooter>
    </Card>
  )
}
