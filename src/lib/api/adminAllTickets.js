import { getMutation } from "../core/server";

export const getAdminAllTickets = async () => {
    return await getMutation(`/api/tickets/admin/all`);
};