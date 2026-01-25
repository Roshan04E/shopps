'use client'

import React, { useEffect } from 'react'
import { useActionState } from 'react' // its actually equivalent to useFormState in react 18
import { useFormStatus } from 'react-dom'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signInUser } from '@/lib/actions/action-users'
import { Button } from "@/components/button"
import { useRouter, useSearchParams } from 'next/navigation'

type SignInState = {
  success: boolean
  message: string
}

 function SignInFormCredentials({callbackUrl = "/"}: {callbackUrl: string}) {
  const router = useRouter();
  const [data, action] = useActionState(signInUser, {
    success: false,
    message: ""
  } as SignInState)


  useEffect(() => {
  if (data?.success) {
    router.push(callbackUrl);
  }
}, [data?.success, callbackUrl, router]);


  function SignInFormButton() {
    const {pending} = useFormStatus();
    return (
      <>
        <Button disabled={pending} type="submit" className="w-full">
          {pending ? "Signing in ..." : "Sign In"}
        </Button>
        {/* <Button variant="outline" className="w-full">
          Login with Google
          </Button> */}
      </>
    )
  }

  return (
    <form action={action}>
      <div className="flex flex-col gap-6">
        <Input type="hidden" name="callbackUrl" value={callbackUrl} />
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name='email'
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" name='password' required />
        </div>

      </div>
      <div className="mt-6">
        <SignInFormButton />
      </div>

      {data && !data.success && (
        <div className="text-destructive text-center">{data.message}</div>
      )}

    </form>
  )
}

export default SignInFormCredentials