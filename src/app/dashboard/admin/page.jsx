import AdminDashboardClient from '@/Components/Dashboard/Admin/Overview/AdminDashboardClient';
import { getAdminAllTickets } from '@/lib/api/adminAllTickets';
import { getAllUsers } from '@/lib/api/adminAllUsers';
import { getAdvertiseTickets } from '@/lib/api/advertiseTickets';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

export const metadata = {
  title: "TicketCore || Admin-Dashboard-Overview",
  description: "Online ticket booking platform",
};
export default async function AdminDashboardPage() {
    // সেশন সিকিউরিটি চেক
    const session = await auth.api.getSession({ headers: await headers() });

    // ব্যাকএন্ড এপিআই থেকে ডেটা ফেচিং
    const tickets = (await getAdminAllTickets()) || [];
    const allUsers = (await getAllUsers()) || [];
    const advertiseTickets = (await getAdvertiseTickets()) || [];

    return (
        <AdminDashboardClient
            tickets={tickets}
            allUsers={allUsers}
            advertiseTickets={advertiseTickets}
        />
    );
}