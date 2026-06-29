import AddTicketForm from '@/Components/Dashboard/Vendor/AddTicketForm';
import React from 'react';

export const metadata = {
  title: "TicketCore || Add-Ticket",
  description: "Online ticket booking platform",
};

const AddTicketPage = () => {
    return (
        <div>
            <AddTicketForm/>
        </div>
    );
};

export default AddTicketPage;