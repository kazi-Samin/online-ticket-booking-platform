
import { deleteMutation } from "../core/server";


// vendor ticket delete action:
export const deleteTicket = async (ticketId) => {
    return await deleteMutation(`/api/tickets/vendor/${ticketId}`,{});
};

