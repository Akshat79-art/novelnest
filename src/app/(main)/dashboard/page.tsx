"use client"

import React, { useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {

    const [activeTab, setActiveTab] = useState('library');

    const mockBooks = [
        { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Classic", cover: "bg-amber-900/40" },
        { id: 2, title: "1984", author: "George Orwell", category: "Dystopian", cover: "bg-slate-700" },
        { id: 3, title: "The Hobbit", author: "J.R.R. Tolkien", category: "Fantasy", cover: "bg-emerald-900/40" },
        { id: 4, title: "Moby Dick", author: "Herman Melville", category: "Classic", cover: "bg-blue-900/40" },
    ];

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 flex font-sans">

            {/* Main Content */}
            <main className="flex-1 p-10">
                {/* Search & Profile */}
                <header className="flex items-center justify-between mb-12">
                    <div className="relative w-96 group">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-amber-500 transition-colors">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Find your next read..."
                            className="w-full bg-slate-800/50 border border-slate-700/50 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-sm font-bold text-slate-100 italic">Akshat</p>
                            <p className="text-xs text-slate-500 text-center">Senior Librarian</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-500 font-bold">
                            <Link href="/profile">
                                A
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Hero / Welcome */}
                <section className="mb-12">
                    <div className="bg-gradient-to-r from-amber-500/40 to-transparent rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold mb-2">Welcome back to the Nest! 🦉</h2>
                            <p className="text-slate-200 max-w-lg mb-6 text-md">You have 2 books due this week. Explore our newest arrivals in the fantasy section or continue your current read.</p>
                            <button className="bg-amber-500 text-slate-900 px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-amber-500/20 hover:scale-105 transition-transform">
                                View Due Books
                            </button>
                        </div>
                    </div>
                </section>

                {/* Book Grid */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold">Currently Reading</h3>
                        <Link href="#" className="text-amber-500 text-sm hover:underline">View All</Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {mockBooks.map((book) => (
                            <div key={book.id} className="bg-slate-800/30 border border-slate-700/40 rounded-2xl p-4 hover:border-amber-500/30 transition-all hover:-translate-y-1 group cursor-pointer">
                                <div className={`aspect-[3/4] ${book.cover} rounded-xl mb-4 shadow-xl overflow-hidden flex items-center justify-center group-hover:scale-[1.02] transition-transform`}>
                                    <span className="text-4xl opacity-20 group-hover:opacity-40 transition-opacity">📖</span>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[10px] uppercase tracking-widest text-amber-500/80 font-bold">{book.category}</span>
                                    <h4 className="font-bold text-slate-100 truncate">{book.title}</h4>
                                    <p className="text-xs text-slate-500">{book.author}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}