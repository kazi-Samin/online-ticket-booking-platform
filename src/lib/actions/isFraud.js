import { patchMutation } from "../core/server";

export const updateUserIsFraud = async (userId ,isFraudPayload) => {
    return await patchMutation(`/api/users/fraud/${userId}`, isFraudPayload);
};