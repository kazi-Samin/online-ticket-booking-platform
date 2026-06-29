import TicketDetailsClient from '@/Components/Main/DetailsCard/TicketDetailsClient';
import { getTicketDetails } from '@/lib/api/allTickets';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata = {
  title: "TicketCore || Ticket-Details",
  description: "Online ticket booking platform",
};

const TicketDetailsPage = async ({ params }) => {
  const { id } = await params;

  const session = await auth.api.getSession({
    headers: await headers() 
  });

  if (!session) {
    redirect('/login');
  }

  // Fetch single ticket dynamic server network data
  const ticket = await getTicketDetails(id);

  if (!ticket) {
    return (
      // 🎨 Fixed: Error node screens updated perfectly to deep luxury slate backing dark theme configuration
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-red-500/5 rounded-full blur-[80px] pointer-events-none" />
        <p className="text-xs font-black uppercase tracking-widest text-zinc-500 bg-zinc-950/40 border border-zinc-900/60 px-5 py-3 rounded-xl relative z-10 shadow-lg">
          Ticket network data not found.
        </p>
      </div>
    );
  }

  return (
    // 🎨 Fixed: Main Layout view ports converted into rich obsidian background matching TicketCore templates
    <div className="min-h-screen bg-[#09090b] text-zinc-100 antialiased p-4 sm:p-8 transition-colors duration-300 relative overflow-hidden">
      {/* Strategic Organic Gradient Bleed Ring Layouts */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Pass fetched data to dynamic client element */}
        <TicketDetailsClient ticket={ticket} />
      </div>
    </div>
  );
};

export default TicketDetailsPage;