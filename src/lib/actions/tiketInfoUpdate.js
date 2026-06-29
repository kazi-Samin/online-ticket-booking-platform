import { patchMutation } from "../core/server";

export const updateTicket = async (ticketId, updatedPayload) => {
    return await patchMutation(`/api/tickets/vendor/${ticketId}`, updatedPayload);
};