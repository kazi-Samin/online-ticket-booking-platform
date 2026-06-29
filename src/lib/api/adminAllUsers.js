import { getMutation } from "../core/server";

export const getAllUsers = async () => {
    return await getMutation(`/api/users/admin/all`);
}