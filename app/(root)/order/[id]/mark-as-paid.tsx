'use client'

import React, { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog'
import { updateOrderToPaid } from '@/lib/actions/action-order'

const MarkAsPaidDialog = ({ id }: { id: string }) => {
    const [isPending, startTransition] = useTransition()

    const handleMarkPaid = () => {
        startTransition(async () => {
            const { success, message } = await updateOrderToPaid(id)
            if (!success) {
                toast.error(message)
                return
            }
            toast.success(message)
        })
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="bg-blue-500 hover:bg-blue-600 rounded-full text-white">
                    Mark as Paid
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Payment</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to mark order <strong>#{id.slice(-6)}</strong> as paid? This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
                    <AlertDialogAction disabled={isPending} onClick={handleMarkPaid} className="bg-blue-500 hover:bg-blue-600 rounded-full text-white">
                        Confirm
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default MarkAsPaidDialog
