'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Headphones, MessageSquare, Send, HelpCircle, ChevronDown } from 'lucide-react';

const contactMethods = [
  // 🚀 Updated: UK based contact hotline number & official TicketCore email
  { icon: <Phone className="h-5 w-5 text-teal-600 dark:text-teal-400" />, title: "Call Hotline", value: "+44 20 7946 0958", sub: "24/7 Instant Transit Expert Line" },
  { icon: <Mail className="h-5 w-5 text-blue-500" />, title: "Email Support", value: "ticketcore@gmail.com", sub: "Response within 15 Minutes" },
  { icon: <MapPin className="h-5 w-5 text-emerald-500" />, title: "Corporate HQ", value: "Dhaka, Bangladesh", sub: "Drop by for official inquiries" },
];

const faqs = [
  { q: "How can I refund my ticket?", a: "Go to your dashboard, select the active ticket, and tap 'Cancel Ticket'. Your refund will be processed immediately according to transport guidelines." },
  { q: "Are there any hidden service charges?", a: "Absolutely not! What you see on the seat selection layout is exactly what you pay at the final payment step." },
  { q: "What should I do if my payment fails?", a: "Don't panic! If money is deducted, it will automatically rollback to your bKash/Nagad or bank card within 3-5 business days." },
];

export default function SupportPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [openFaq, setOpenFaq] = useState(null);
  const [successStatus, setSuccessStatus] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessStatus(true);
    setTimeout(() => setSuccessStatus(false), 5000);
    setForm({ name: '', email: '', message: '' });
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main className="bg-slate-50 dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 min-h-screen py-16 px-4 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">

        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 text-xs font-black uppercase tracking-widest mb-3 border border-teal-100 dark:border-teal-900/30">
            <Headphones className="h-3.5 w-3.5" />
            Support Center
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-950 dark:text-white">
            We are Here to Help 24/7
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-xl mx-auto font-medium">
            Faced a glitch? Need an urgent rescheduling? Drop us a line and let our transit core terminal handle the rest.
          </p>
        </div>

        {/* 🛠️ মেইন কন্টেন্ট গ্রিড */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">

          {/* বাম পাশে: কন্টাক্ট কার্ডসমূহ */}
          <div className="lg:col-span-5 space-y-3">
            {contactMethods.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-[20px] flex gap-3.5 items-center shadow-sm transition-all duration-200 hover:border-teal-500/30"
              >
                <div className="p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl shrink-0 shadow-inner">
                  {c.icon}
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">{c.title}</h4>
                  <p className="text-sm font-black text-slate-950 dark:text-white mt-0.5 tracking-tight">{c.value}</p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 font-semibold">{c.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ডান পাশে: কন্টাক্ট ফর্ম */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 rounded-[28px] border border-slate-200 dark:border-slate-800/80 shadow-sm transition-colors duration-200"
          >
            <div className="flex items-center gap-2 text-slate-950 dark:text-white font-black text-base tracking-tight mb-5">
              <MessageSquare className="h-4 w-4 text-teal-600 dark:text-teal-400" /> Instant Support Ticket
            </div>

            {successStatus && (
              <div className="mb-4 p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-xl text-xs font-bold text-emerald-600 dark:text-emerald-400">
                Success! Your message has been routed to our support terminal team. We will get back to you shortly.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1.5 uppercase tracking-wide">Full Name</label>
                  <input
                    type="text" required value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-950 dark:text-white placeholder-slate-400 focus:border-teal-500 dark:focus:border-teal-400 focus:bg-white dark:focus:bg-slate-900 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold outline-none transition-all duration-200"
                    placeholder="e.g. Kazi Mahedi"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1.5 uppercase tracking-wide">Email Address</label>
                  <input
                    type="email" required value={form.email} onChange={(e) => setForm({...form, email: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-950 dark:text-white placeholder-slate-400 focus:border-teal-500 dark:focus:border-teal-400 focus:bg-white dark:focus:bg-slate-900 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold outline-none transition-all duration-200"
                    placeholder="name@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1.5 uppercase tracking-wide">Describe your Issue</label>
                <textarea
                  rows={4} required value={form.message} onChange={(e) => setForm({...form, message: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-950 dark:text-white placeholder-slate-400 focus:border-teal-500 dark:focus:border-teal-400 focus:bg-white dark:focus:bg-slate-900 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold outline-none transition-all duration-200 resize-none"
                  placeholder="Tell us what went wrong..."
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500 text-white font-black text-xs rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 uppercase tracking-widest"
              >
                <Send className="h-3.5 w-3.5" /> Open Ticket
              </button>
            </form>
          </motion.div>
        </div>

        {/* ❔ FAQ সেকশন */}
        <div className="border-t border-slate-200/80 dark:border-slate-800 pt-14">
          <div className="flex items-center gap-2 text-slate-950 dark:text-white font-black text-lg sm:text-xl tracking-tight mb-6">
            <HelpCircle className="h-5 w-5 text-teal-600 dark:text-teal-400" /> Frequently Asked Questions
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm transition-colors duration-200"
                >
                  <button
                    onClick={() => toggleFaq(i)}
                    className="w-full flex items-center justify-between p-5 text-left outline-none bg-transparent hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <span className="text-xs sm:text-sm font-black text-slate-950 dark:text-white tracking-tight pr-4">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-teal-600 dark:text-teal-400' : ''}`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-5 pb-5 pt-1 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed bg-slate-50/40 dark:bg-slate-950/40">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </main>
  );
}