import { patchMutation } from "../core/server";

export const updateTicketIsAdvertise = async (ticketId, payload) => {
  // payload = { isAdvertised: targetStatus }
  return await patchMutation(`/api/tickets/advertise/${ticketId}`, payload);
};