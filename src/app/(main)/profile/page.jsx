import ProfilePage from '@/Components/Profile/ProfilePage';
import React from 'react';

export const metadata = {
  title: "Your Profile || TicketCore",
  description: "Online ticket booking platform",
};
const MyProfilePage = () => {
    return (
        /*
          pt-24 / pt-28 diye navbar er thika niche namano hoyeche.
          bg-zinc-50 dark:bg-zinc-950 diye profile page-e ekta clean, modern backdrop dewa hoyeche
          ja uporer standard dark/light navbar theke alada bhed kora jabe.
        */
        <div className="min-h-screen pt-24 pb-12 bg-zinc-50 dark:bg-zinc-950/60 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ProfilePage />
            </div>
        </div>
    );
};

export default MyProfilePage;