'use client'

import { Button } from '@/components/ui/button'
import { updateOrderToDelivered } from '@/lib/actions/action-order'
import { useTransition } from 'react'
import { toast } from 'sonner'
import { 
    AlertDialog, 
    AlertDialogAction, 
    AlertDialogCancel, 
    AlertDialogContent, 
    AlertDialogDescription, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogTitle, 
    AlertDialogTrigger 
} from '@/components/ui/alert-dialog'

const MarkAsDelivered = ({ id }: { id: string }) => {
    const [isPending, startTransition] = useTransition()

    const handleMarkDelivered = () => {
        startTransition(async () => {
            const { success, message } = await updateOrderToDelivered(id)
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
                <Button variant="outline" className="bg-transparent">Mark as Delivered</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Delivery</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to mark the order{' '}
                        <strong><span className="text-orange-400">#</span>{id.slice(-6)}</strong> as delivered? This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
                    <AlertDialogAction disabled={isPending} onClick={handleMarkDelivered} className="bg-green-400 hover:bg-green-500 rounded-full">
                        Confirm
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default MarkAsDelivered
