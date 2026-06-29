import { getMutation } from "../core/server";

export const getVendorBookingRequest = async (vendorId) => {
    return await getMutation(`/api/booking/vendor/${vendorId}`);
};