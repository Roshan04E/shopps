'use client'

import { Trash2 } from "lucide-react"
import { Button } from "../ui/button"
import { useTransition } from "react"
import { toast } from "sonner"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"

const DeleteDialogue = ({ id, action }: { id: string, action: (id: string) => Promise<{ success: boolean, message: string }> }) => {
    const [isPending, startTransition] = useTransition();
    const handleDelete = () => {
        startTransition(async () => {
            const { success, message } = await action(id);
            if (!success) {
                toast.error(message);
                return
            }
            toast.success(message)
        })
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant={'outline'} className="w-8 h-8 rounded-full bg-transparent" ><Trash2 /></Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the
                        order with id: <strong><span className="text-orange-400">#</span>{id.slice(-6)}</strong> and remove the data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
                    <AlertDialogAction disabled={isPending} onClick={handleDelete} className="bg-red-400 hover:bg-red-500 rounded-full">Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteDialogue