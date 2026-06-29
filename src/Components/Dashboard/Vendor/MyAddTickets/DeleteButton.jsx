'use client';
import { deleteTicket } from "@/lib/actions/ticketDelete";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

// 💡 Props হিসেবে { ticket } কে ডি-স্ট্রাকচার করা হলো টেক্সট ডাইনামিক করার জন্য
const DeleteButton = ({ ticket }) => {
    const router = useRouter();
    const ticketId = ticket?._id;
    const handleDelete = async (id) => {
        if (!id) return alert("Ticket ID not found!");

        try {
            const data = await deleteTicket(id);
            // MongoDB delete database response payload structure checks 'deletedCount'
            if (data && data.deletedCount > 0) {
                toast.success("Ticket deleted successfully!");

                setTimeout(() => {
                    router.refresh();
                }, 700);

            } else {
                toast.error("Failed to delete from database. Record might be missing.");
            }
        } catch (error) {
            console.error("Deletion execution failed:", error);
        }
    };

    return (
        <div>
            <AlertDialog>
                <Button className="flex-1 py-3 rounded-xl text-xs font-black tracking-wider uppercase bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/10 active:scale-95 transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed">
                    Delete Asset
                </Button>
                <AlertDialog.Backdrop>
                    <AlertDialog.Container>
                        <AlertDialog.Dialog className="sm:max-w-100">
                            <AlertDialog.CloseTrigger />
                            <AlertDialog.Header>
                                <AlertDialog.Icon status="danger" />
                                <AlertDialog.Heading>Delete Ticket permanently?</AlertDialog.Heading>
                            </AlertDialog.Header>
                            <AlertDialog.Body>
                                <p>
                                    This will permanently delete <strong> {ticket?.title || 'this ticket'} </strong> from your
                                    TicketBari terminal listing. This operational action cannot be undone.
                                </p>
                            </AlertDialog.Body>
                            <AlertDialog.Footer>
                                <Button slot="close" variant="tertiary">
                                    Cancel
                                </Button>
                                <Button onClick={() => handleDelete(ticketId)} slot="close" variant="danger">
                                    Confirm Delete
                                </Button>
                            </AlertDialog.Footer>
                        </AlertDialog.Dialog>
                    </AlertDialog.Container>
                </AlertDialog.Backdrop>
            </AlertDialog>
        </div>
    );
};

export default DeleteButton;