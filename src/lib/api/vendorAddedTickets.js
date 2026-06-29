'use server';

import { getMutation } from "../core/server";

export const getVendorAddedTickets = async (userId) => {
   return await getMutation(`/api/tickets/vendor/${userId}`);
};