import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import UserProfileForm from './user-profile-form'


export const metadata = {
  title: "User Profile"
}

async function UserProfile() {
  const session = await auth()
  return (
    <SessionProvider session={session}>
      <div className="pt-5 max-w-md mx-auto space-y-4">
        <div className="font-bold text-3xl">
          Profile 
        </div>
        <UserProfileForm />
        
      </div>
      </SessionProvider>
  )
}

export default UserProfile