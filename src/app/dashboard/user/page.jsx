import UserDashboardOverview from "@/Components/Dashboard/User/Overview/UserDashboardOverview";
import { getUserBookedTickets } from "@/lib/api/userBookingTickets";
import { getTransactions } from "@/lib/api/userTransaction";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const metadata = {
  title: "TicketCore || User-Dashboard-Overview",
  description: "Online ticket booking platform",
};

const UserDashboardPage = async () => {
    const session = await auth.api.getSession({ headers: await headers() });
    const user = session?.user;
    const userId = user?.id;


    const tickets = await getUserBookedTickets(userId) || [];
    const transaction = await getTransactions(userId) || [];

    return (
        <UserDashboardOverview
          tickets={tickets}
          transactions={transaction}
          user={user}
        />
    );
};

export default UserDashboardPage;