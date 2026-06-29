import VendorDashboardClient from '@/Components/Dashboard/Vendor/Overview/VendorDashboardClient';
import { getVendorAddedTickets } from '@/lib/api/vendorAddedTickets';
import { getVendorBookingRequest } from '@/lib/api/vendorBookingRequest';
import { getVendorRevenue } from '@/lib/api/vendorRevenue';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

export const metadata = {
  title: "TicketCore- Vendor-Dashboard-Overview",
  description: "Online ticket booking platform",
};
export const dynamic = 'force-dynamic';
export default async function VendorDashBoardPage() {
  // ⚡ Session fetching with proper await for headers
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;
  const vendorId = user?.id;

  // 🔄 Parallel Data Fetching for peak performance
  const [addTickets, bookingRequest, revenue] = await Promise.all([
    getVendorAddedTickets(vendorId).then(d => d || []),
    getVendorBookingRequest(vendorId).then(d => d || []),
    getVendorRevenue(vendorId).then(d => d || [])
  ]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#000001] p-4 md:p-8 text-[#0e5ad5]">
      <VendorDashboardClient
        user={user}
        tickets={addTickets}
        bookings={bookingRequest}
        revenueData={revenue}
      />
    </div>
  );
}