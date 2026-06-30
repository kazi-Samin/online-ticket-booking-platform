"use client";
import React, { useState } from 'react';
import TicketFilter from './TicketFilter';
import TicketCard from './TicketCard';
import { AnimatePresence } from 'framer-motion';

export default function MyTicketsClient({ initialTickets }) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Pagination State Configuration
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Pro page matrix item render limit

  const filteredTickets = initialTickets.filter((ticket) => {
    const matchesSearch =
      ticket.title?.toLowerCase().includes(search.toLowerCase()) ||
      ticket.from?.toLowerCase().includes(search.toLowerCase()) ||
      ticket.to?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "all" || ticket.verificationStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Calculate Paginated Arrays Node Segment
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTickets.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth view scroll back
  };

  const handleUpdate = (id) => console.log("Update ID:", id);
  const handleDelete = (id) => console.log("Delete ID:", id);

  return (
    <div className="w-full space-y-8">
      {/* Decoupled Dynamic Filter Engine */}
      <TicketFilter
        search={search}
        setSearch={(val) => { setSearch(val); setCurrentPage(1); }}
        filterStatus={filterStatus}
        setFilterStatus={(val) => { setFilterStatus(val); setCurrentPage(1); }}
      />

      {/* Grid Container Card Layout wrapper */}
      {currentItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {currentItems.map((ticket, idx) => (
              <TicketCard
                key={ticket._id}
                ticket={ticket}
                index={idx}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="w-full text-center py-20 bg-white dark:bg-[#0F172A] border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-6">
          <p className="text-sm font-bold text-slate-500">No matching vendor ticket asset logs found.</p>
        </div>
      )}

      {/* Modern Classic Pagination Shell Controller */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6 select-none">
          {/* Prev Button */}
          <button
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
          </button>

          {/* Numeric Pages Array Mapper */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`w-10 h-10 rounded-xl text-xs font-black border transition-all duration-200 ${
                currentPage === number
                  ? "bg-teal-600 border-teal-600 text-white shadow-md shadow-teal-900/20"
                  : "bg-white dark:bg-[#0F172A] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-400"
              }`}
            >
              {number}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      )}
    </div>
  );
}