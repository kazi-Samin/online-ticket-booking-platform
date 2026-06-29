'use server';

import { postMutation } from "../core/server";

export const addTicket = async (finalTicketPayload)=>{
  return await postMutation('/api/tickets',finalTicketPayload);
   ;
}