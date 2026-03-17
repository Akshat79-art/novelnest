"use client"

import React, { useState } from 'react';

// Temporary mock data for visualizing the design
const mockRentals = [
    { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', borrowDate: '2023-10-12', returnDate: '2023-10-26', status: 'Returned', condition: 'Good' },
    { id: '2', title: '1984', author: 'George Orwell', borrowDate: '2024-03-01', returnDate: '2024-03-15', status: 'Active', condition: 'Excellent' },
    { id: '3', title: 'The Hobbit', author: 'J.R.R. Tolkien', borrowDate: '2024-02-10', returnDate: '2024-02-24', status: 'Overdue', condition: 'Fair' },
];

export default function RentalHistory() {
    const [filter, setFilter] = useState('All');

    // Helper for status colors
    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Active': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
            case 'Returned': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
            case 'Overdue': return 'bg-red-500/10 text-red-500 border-red-500/20';
            default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header & Primary Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
                <div>
                    <h2 className="text-xl font-bold text-slate-100">Chronicles of Borrowing</h2>
                    <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Your rental ledger</p>
                </div>

                {/* Search / Filter Bar */}
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search titles or authors..."
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-2 pl-9 pr-4 text-sm focus:border-amber-500/50 outline-none transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Quick Filters */}
            <div className="flex gap-2 text-sm overflow-x-auto pb-2">
                {['All', 'Active', 'Returned', 'Overdue'].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-1.5 rounded-full border transition-all ${filter === f
                                ? 'bg-amber-500/10 border-amber-500/50 text-amber-500 font-bold'
                                : 'border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200'
                            }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Modern Table Container */}
            <div className="bg-slate-900/40 border border-slate-700/50 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-300">
                        <thead className="text-xs text-slate-500 uppercase tracking-widest bg-slate-800/50 border-b border-slate-700/50">
                            <tr>
                                <th className="px-6 py-4 font-bold cursor-pointer hover:text-amber-500 transition-colors flex items-center gap-1">
                                    Book Details
                                </th>
                                <th className="px-6 py-4 font-bold cursor-pointer hover:text-amber-500 transition-colors">Dates</th>
                                <th className="px-6 py-4 font-bold cursor-pointer hover:text-amber-500 transition-colors">Condition</th>
                                <th className="px-6 py-4 font-bold cursor-pointer hover:text-amber-500 transition-colors text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/50">
                            {mockRentals.map((rental) => (
                                <tr key={rental.id} className="hover:bg-slate-800/30 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            {/* Dummy Cover */}
                                            <div className="w-10 h-14 bg-slate-800 rounded shadow-md group-hover:shadow-amber-500/10 transition-shadow"></div>
                                            <div>
                                                <p className="font-bold text-slate-100 group-hover:text-amber-500 transition-colors">{rental.title}</p>
                                                <p className="text-xs text-slate-500">{rental.author}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-col gap-1 text-xs">
                                            <span className="text-slate-400">Out: <span className="text-slate-200">{rental.borrowDate}</span></span>
                                            <span className="text-slate-400">Due: <span className="text-slate-200">{rental.returnDate}</span></span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-300">
                                            {rental.condition}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${getStatusStyle(rental.status)}`}>
                                            {rental.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Skeleton */}
                <div className="px-6 py-4 border-t border-slate-700/50 flex items-center justify-between text-xs text-slate-500">
                    <span>Showing 1 to 3 of 3 entries</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 border border-slate-700 rounded hover:bg-slate-800 text-slate-400 transition-colors disabled:opacity-50">Prev</button>
                        <button className="px-3 py-1 border border-slate-700 rounded hover:bg-slate-800 text-slate-400 transition-colors disabled:opacity-50">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}