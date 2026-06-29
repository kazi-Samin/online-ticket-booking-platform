import { postMutation } from "../core/server";

export const bookingTicket = async (bookingPayload)=>{
    return await postMutation('/api/booking',bookingPayload);
};