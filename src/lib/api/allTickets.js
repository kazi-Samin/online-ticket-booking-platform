// import { getMutation } from "../core/server";


// export const getAllTickets = async (searchParams = {}) => {
//   const { from = '', to = '', transport = 'all', sort = 'none', page = 1 } = searchParams;

//   const params = new URLSearchParams();
//   if (from) params.append('from', from);
//   if (to) params.append('to', to);
//   if (transport && transport !== 'all') params.append('transport', transport);
//   if (sort && sort !== 'none') params.append('sort', sort);
//   params.append('page', page);
//   params.append('limit', 6);

//   return await getMutation(`/api/tickets/all?${params.toString()}`);
// };

// export const getTicketDetails = async (id) => {
//     return await getMutation(`/api/tickets/${id}`);
// };


export const getAllTickets = async (searchParams) => {
  try {
    const query = new URLSearchParams({
      from: searchParams?.from || '',
      to: searchParams?.to || '',
      transport: searchParams?.transport || 'all',
      sort: searchParams?.sort || 'none',
      page: searchParams?.page || '1',
      limit: searchParams?.limit || '6'
    }).toString();

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
    
    const response = await fetch(`${backendUrl}/api/tickets/all?${query}`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data from Express server');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Gateway error:", error);
    return null;
  }
};

// 🚀 Fixed: এই ফাংশনটি মিসিং থাকার কারণেই বিল্ড এরর আসছিল, এখন এটি ব্যাকএন্ড এপিআই অনুযায়ী যুক্ত করা হলো
export const getTicketDetails = async (id) => {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
    
    const response = await fetch(`${backendUrl}/api/tickets/${id}`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch ticket details');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch ticket details error:", error);
    return null;
  }
};