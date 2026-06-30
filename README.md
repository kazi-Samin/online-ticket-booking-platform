<div align="center">
  <h1>🎫 TicketBari</h1>
  <p><strong>Next-Generation Online Ticket Booking Platform</strong></p>
  <p>Seamlessly discover, book, and manage your travel tickets including Bus, Train, Launch, and Flights with a highly secure and beautifully designed MERN stack application.</p>
  
  [![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel)](https://online-ticket-booking-platform-gamma.vercel.app/)
  [![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
</div>

<hr />

## 🌟 Live Demo

🌍 **Live Website:** [TicketBari on Vercel](https://online-ticket-booking-platform-gamma.vercel.app/)

---

## 🎯 Purpose
TicketBari bridges the gap between travel vendors and passengers. Vendors can easily add and manage their transport inventory, while users can securely browse, book, and download tickets. With a robust dashboard system, Admins can oversee all operations, ban fraudulent users, and advertise premium tickets.

---

## 🚀 Key Features

### 👤 Role-Based Access Control (RBAC)
- **Admin Dashboard:** Complete oversight over users, vendors, and tickets. Admins can approve/reject tickets, advertise top picks, and ban fraudulent vendors.
- **Vendor Dashboard:** A dedicated workspace for vendors to manage their transport fleet, add new tickets, track bookings, and analyze revenue metrics.
- **User Dashboard:** A personalized space for users to track booking history, download PDF tickets, and manage payments.

### 🛡️ Secure & Modern Authentication
- Integrated **BetterAuth** for rock-solid security.
- Supports both **Email/Password** and **Google Social Login**.

### 💳 Seamless Payment Integration
- Implemented **Stripe Checkout** for secure and reliable payment processing.

### 🎨 Stunning UI/UX Design
- Built with **Tailwind CSS** and **HeroUI**.
- Fully responsive design with **Dark/Light Mode** support.
- Micro-interactions powered by **Framer Motion**.

---

## 🛠️ Technology Stack

| Category | Technologies Used |
|----------|------------------|
| **Frontend Framework** | Next.js, React 19 |
| **Styling & UI** | Tailwind CSS, HeroUI, Framer Motion, Lucide React, React Icons |
| **Authentication** | BetterAuth |
| **Payment Gateway** | Stripe, `@stripe/react-stripe-js` |
| **Data Visualization** | Recharts |
| **Utilities** | Axios, React Toastify, html2canvas, html2pdf.js |

---

## ⚙️ Installation & Setup (Local Development)

Follow these steps to run the frontend application locally:

### 1. Clone the Repository
```bash
git clone https://github.com/kazi-Samin/online-ticket-booking-platform.git
cd online-ticket-booking-platform
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory and add the following keys:
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 4. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🤝 Contribution Guidelines
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

<div align="center">
  <p>Crafted with ❤️ for seamless travel experiences.</p>
</div>
