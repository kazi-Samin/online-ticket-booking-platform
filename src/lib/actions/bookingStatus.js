import { patchMutation } from "../core/server";

export const updateBookingStatus = async(bookingId, { status: targetStatus }) => {
    return await patchMutation(`/api/booking/status/${bookingId}`, { status: targetStatus });
}