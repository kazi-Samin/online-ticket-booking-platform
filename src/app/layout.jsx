
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/Providers";

const sansHeading = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
});

const sansBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata = {
  title: "TicketCore || Online Ticket Booking Platform",
  description: "Online ticket booking platform",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sansBody.className} h-full antialiased`}
    >
      
      <body 
        className="min-h-full flex flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 transition-colors duration-300" 
        suppressHydrationWarning={true}
      >
        <Providers>
          
          <main className="w-full flex-1 flex flex-col">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}