import ProfilePage from '@/Components/Profile/ProfilePage';
import React from 'react';

export const metadata = {
  title: "Admin Profile || TicketCore",
  description: "Online ticket booking platform",
};
const AdminProfile = () => {
    return (
        <div>
            <ProfilePage />
        </div>
    );
};

export default AdminProfile;