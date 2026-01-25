import { auth } from '@/auth'
import { getOrderSummary } from '@/lib/actions/action-order';
import React from 'react'
import OverviewSection from './overview-section';




async function AdminOverviewPage() {
  const session = await auth();
  if (session?.user.role !== 'admin') {
    throw new Error("User not authorised")
  }

  const summary = await getOrderSummary();
  console.log(summary);
  
  return (
    <div className='max-w-380 pt-10 mx-auto'>
      <OverviewSection summary={summary}/>
    </div>
  )
}

export default AdminOverviewPage