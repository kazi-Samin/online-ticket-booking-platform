'use client';

import React, { useState } from 'react';
import { Ticket, MapPin, Calendar, Clock, Download } from 'lucide-react';
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';
import { toast } from 'react-toastify';

const pdfStyles = StyleSheet.create({
  page: { padding: 30, backgroundColor: '#FFFFFF', fontFamily: 'Helvetica' },
  ticketContainer: { border: '2px dashed #CBD5E1', padding: 20, borderRadius: 10, backgroundColor: '#FAFAFA' },
  header: { borderBottom: '1px solid #E2E8F0', paddingBottom: 10, marginBottom: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 18, fontWeight: 'bold', color: '#1E3A8A' },
  status: { fontSize: 10, color: '#15803D', backgroundColor: '#DCFCE7', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 5, textTransform: 'uppercase' },
  grid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15, backgroundColor: '#F1F5F9', padding: 10, borderRadius: 8 },
  gridCol: { width: '48%' },
  label: { fontSize: 8, color: '#94A3B8', textTransform: 'uppercase', marginBottom: 2 },
  value: { fontSize: 12, color: '#1E293B', fontWeight: 'bold' },
  metaGrid: { flexDirection: 'row', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', paddingBottom: 10, marginBottom: 10 },
  metaCol: { width: '30%' },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 5 },
  passenger: { fontSize: 11, color: '#334155' },
  price: { fontSize: 16, color: '#1E3A8A', fontWeight: 'bold' }
});

// 🎫 ২. পিডিএফে টিকেটের লেআউট কম্পোনেন্ট (Unchanged)
const MyTicketPDF = ({ ticket }) => {
  const dateObj = ticket.departureDateTime ? new Date(ticket.departureDateTime) : new Date();
  const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const formattedTime = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.ticketContainer}>
          <View style={pdfStyles.header}>
            <View>
              <Text style={pdfStyles.title}>{ticket.ticketTitle || 'Bus Ticket'}</Text>
              <Text style={{ fontSize: 9, color: '#64748B', marginTop: 2 }}>ID: #{ticket._id ? ticket._id.slice(-8).toUpperCase() : 'UNKNOWN'}</Text>
            </View>
            <Text style={pdfStyles.status}>{ticket.status || 'PAID'}</Text>
          </View>

          <View style={pdfStyles.grid}>
            <View style={pdfStyles.gridCol}>
              <Text style={pdfStyles.label}>From Location</Text>
              <Text style={pdfStyles.value}>{ticket.from || 'N/A'}</Text>
            </View>
            <View style={pdfStyles.gridCol}>
              <Text style={pdfStyles.label}>To Destination</Text>
              <Text style={pdfStyles.value}>{ticket.to || 'N/A'}</Text>
            </View>
          </View>

          <View style={pdfStyles.metaGrid}>
            <View style={pdfStyles.metaCol}>
              <Text style={pdfStyles.label}>Journey Date</Text>
              <Text style={{ fontSize: 11, color: '#1E293B' }}>{formattedDate}</Text>
            </View>
            <View style={pdfStyles.metaCol}>
              <Text style={pdfStyles.label}>Departure Time</Text>
              <Text style={{ fontSize: 11, color: '#1E293B' }}>{formattedTime}</Text>
            </View>
            <View style={[pdfStyles.metaCol, { alignItems: 'flex-end' }]}>
              <Text style={pdfStyles.label}>Seats Booked</Text>
              <Text style={{ fontSize: 12, color: '#1E293B', fontWeight: 'bold' }}>{ticket.bookingQuantity || 0} Units</Text>
            </View>
          </View>

          <View style={pdfStyles.footer}>
            <View>
              <Text style={pdfStyles.label}>Passenger Name</Text>
              <Text style={pdfStyles.passenger}>{ticket.userName || 'Guest User'}</Text>
              <Text style={{ fontSize: 9, color: '#64748B' }}>{ticket.userEmail}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={pdfStyles.label}>Total Fare</Text>
              <Text style={pdfStyles.price}>BDT {ticket.totalPrice || 0}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default function TicketDownloadClient({ initialTickets = [] }) {
  const [downloadingId, setDownloadingId] = useState(null);

  const handleDownload = async (ticket) => {
    setDownloadingId(ticket._id);
    const toastId = toast.loading('Preparing your PDF ticket... Please wait.');

    try {
      const doc = <MyTicketPDF ticket={ticket} />;
      const asBlob = await pdf(doc).toBlob();

      const url = URL.createObjectURL(asBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Ticket_${(ticket.ticketTitle || 'Pass').replace(/\s+/g, '_')}_${ticket._id.slice(-6)}.pdf`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.update(toastId, {
        render: 'Ticket downloaded successfully! 🎉',
        type: 'success',
        isLoading: false,
        autoClose: 3000
      });
    } catch (error) {
      console.error(error);
      toast.update(toastId, {
        render: 'Failed to generate PDF. Please try again!',
        type: 'error',
        isLoading: false,
        autoClose: 4000
      });
    } finally {
      setDownloadingId(null);
    }
  };

  if (!initialTickets || initialTickets.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center text-slate-400 dark:text-slate-500 font-medium shadow-sm transition-colors duration-200">
        No paid tickets found. Once you book and pay for a fleet, your ticket will appear here!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {initialTickets.map((ticket) => {
        const dateObj = ticket.departureDateTime ? new Date(ticket.departureDateTime) : new Date();
        const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const formattedTime = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        return (
          // 🎯 মেইন কার্ড র্যাপার ডার্ক মোড ফ্রেন্ডলি করা হয়েছে
          <div key={ticket._id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm space-y-6 flex flex-col justify-between transition-colors duration-200">

            {/* স্ক্রিন ভিউ টিকেট বক্স */}
            <div className="bg-white dark:bg-slate-950 p-5 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 relative space-y-4 transition-colors duration-200">

              {/* টিকিট হেডার */}
              <div className="flex justify-between items-start border-b border-slate-100 dark:border-slate-900 pb-3">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 rounded-xl">
                    <Ticket className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-800 dark:text-slate-200 text-base">{ticket.ticketTitle}</h3>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">ID: #{ticket._id ? ticket._id.slice(-8).toUpperCase() : 'UNKNOWN'}</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400 text-[10px] font-black uppercase rounded-full tracking-wider">
                  {ticket.status || 'PAID'}
                </span>
              </div>

              {/* রুট ট্র্যাকার্স */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors duration-200">
                <div>
                  <span className="text-[9px] text-slate-400 dark:text-slate-500 uppercase block mb-0.5">From</span>
                  <div className="flex items-center text-slate-800 dark:text-slate-200">
                    <MapPin className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400 mr-1 shrink-0" /> {ticket.from || 'N/A'}
                  </div>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 dark:text-slate-500 uppercase block mb-0.5">To</span>
                  <div className="flex items-center text-slate-800 dark:text-slate-200">
                    <MapPin className="h-3.5 w-3.5 text-orange-600 dark:text-orange-500 mr-1 shrink-0" /> {ticket.to || 'N/A'}
                  </div>
                </div>
              </div>

              {/* টাইম ও সীট ডিটেইলস */}
              <div className="grid grid-cols-3 gap-2 text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                <div>
                  <span className="text-[9px] text-slate-400 dark:text-slate-500 uppercase block mb-0.5">Date</span>
                  <div className="flex items-center font-bold text-slate-800 dark:text-slate-200">
                    <Calendar className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500 mr-1" /> {formattedDate}
                  </div>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 dark:text-slate-500 uppercase block mb-0.5">Time</span>
                  <div className="flex items-center font-bold text-slate-800 dark:text-slate-200">
                    <Clock className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500 mr-1" /> {formattedTime}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-slate-400 dark:text-slate-500 uppercase block mb-0.5">Seats</span>
                  <span className="font-mono font-black text-slate-800 dark:text-slate-200 text-sm">{ticket.bookingQuantity || 0} Pcs</span>
                </div>
              </div>

              {/* প্যাসেঞ্জার ও প্রাইস ইনফো */}
              <div className="border-t border-slate-100 dark:border-slate-900 pt-3 flex justify-between items-center">
                <div>
                  <span className="text-[9px] text-slate-400 dark:text-slate-500 uppercase block">Passenger</span>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{ticket.userName}</span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-slate-400 dark:text-slate-500 uppercase block">Total Price</span>
                  <span className="text-base font-black text-teal-700 dark:text-teal-400">৳{(ticket.totalPrice || 0).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* 📥 ডাউনলোড বাটন (আল্ট্রা প্রিমিয়াম রয়্যাল ব্লু থিম বজায় রাখা হয়েছে) */}
            <button
              onClick={() => handleDownload(ticket)}
              disabled={downloadingId === ticket._id}
              className="w-full flex items-center justify-center py-3 bg-teal-600 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700 text-white text-xs font-bold rounded-xl transition-all shadow-md disabled:opacity-60"
            >
              {downloadingId === ticket._id ? (
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              ) : (
                <Download className="h-4 w-4 mr-2" />
              )}
              {downloadingId === ticket._id ? 'Generating...' : 'Download Ticket (PDF)'}
            </button>

          </div>
        );
      })}
    </div>
  );
}