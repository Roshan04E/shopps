import React, { use } from 'react'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import UserProfileForm from './user-profile-form'
import { getUserById } from '@/lib/actions/action-users'
import { redirect } from 'next/navigation'


export const metadata = {
  title: "User Profile"
}

async function UserProfile() {
  const session = await auth()
  const user = await getUserById(session?.user.id as string)
  return (
    <SessionProvider session={session}>
      <div className="pt-5 max-w-md mx-auto space-y-4">
        <div className="font-bold text-3xl">
          Profile 
        </div>
        <UserProfileForm userPhone={user.phone ?? ''} />
        
      </div>
      </SessionProvider>
  )
}

export default UserProfile