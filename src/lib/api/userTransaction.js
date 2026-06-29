import { getMutation } from "../core/server";

export const getTransactions = async (userId) => {
    return await getMutation(`/api/transactions/user/${userId}`);
};