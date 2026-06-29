import { getMutation } from "../core/server";

export const getLatestTickets = async () => {
    return await getMutation(`/api/tickets/latest`);
};