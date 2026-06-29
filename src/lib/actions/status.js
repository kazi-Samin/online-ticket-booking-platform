import { patchMutation } from "../core/server";


export const updateTicketStatus = async (ticketId, { verificationStatus: targetStatus }) => {
    return await patchMutation(`/api/tickets/status/${ticketId}`, { verificationStatus: targetStatus });
};