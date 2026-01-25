import { redirect } from 'next/navigation'
import React from 'react'

function UserPage() {
    redirect('/user/profile')
  return (
    <></>
  )
}

export default UserPage