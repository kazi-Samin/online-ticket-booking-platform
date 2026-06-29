import { patchMutation } from "../core/server";

export const updateUserRole = async (userId,userRolePayload) => {
    return await patchMutation(`/api/users/role/${userId}`,userRolePayload);
};