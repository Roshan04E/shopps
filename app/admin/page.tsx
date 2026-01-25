import { redirect } from 'next/navigation'
import React from 'react'

function AdminPage() {
  redirect('/admin/overview')
  return (
    <></>
  )
}

export default AdminPage