'use server';

import { getUserToken } from "../api/session";

export const authHeader = async () => {
    const token = await getUserToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
}

export const postMutation = async (url, data) => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

    try {
        const authHeadersObj = await authHeader();

        const res = await fetch(`${baseUrl}${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...authHeadersObj
            },
            body: JSON.stringify(data),
            cache: 'no-store'
        });

        if (!res.ok) {
            const rawText = await res.text();
            console.error(rawText);
            return { error: true, status: res.status };
        }

        return await res.json();
    } catch (err) {
        console.error(err);
        return { error: true, message: "Server connection failed!" };
    }
};

export const deleteMutation = async (url) => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

    try {
        const authHeadersObj = await authHeader();

        const res = await fetch(`${baseUrl}${url}`, {
            method: "DELETE",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
                ...authHeadersObj
            }
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error(error);
        return { success: false, error: error.message };
    }
};

export const patchMutation = async (url, data) => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

    try {
        const authHeadersObj = await authHeader();

        const res = await fetch(`${baseUrl}${url}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                ...authHeadersObj
            },
            body: JSON.stringify(data),
            cache: "no-store"
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error(error);
        return { success: false, error: error.message };
    }
};

export const getMutation = async (url) => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

    try {
        const authHeadersObj = await authHeader();

        const res = await fetch(`${baseUrl}${url}`, {
            method: "GET",
            cache: "no-store",
            headers: {
                ...authHeadersObj
            }
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error(error);
        return { success: false, error: error.message };
    }
};