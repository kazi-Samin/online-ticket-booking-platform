import { getMutation } from "../core/server";

export const getUserBookedTickets = async (userId) => {
    return await getMutation(`/api/booking/user/${userId}`);
};