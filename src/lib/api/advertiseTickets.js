import { getMutation } from "../core/server";

export const getAdvertiseTickets = async () => {
    return await getMutation(`/api/tickets/admin/advertise`);
};