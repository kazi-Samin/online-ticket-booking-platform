import { getMutation } from "../core/server";

export const getVendorRevenue = async (vendorId) => {
    return await getMutation(`/api/revenue/vendor/${vendorId}`);
};