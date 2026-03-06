"use client"

import React, { useState } from 'react';

export default function GeneralSettings() {
    const [genres] = useState(['Fantasy', 'Classic', 'Mystery', 'History', 'Philosophy']);

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* 1. Digital Library Card Section */}
            <section>
                <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Official Record</h3>
                <div className="bg-gradient-to-br from-amber-600/20 via-slate-800 to-slate-900 p-6 rounded-3xl border border-amber-500/10 shadow-2xl relative overflow-hidden group">
                    <div className="relative z-10 flex justify-between items-start">
                        <div className="flex gap-5">
                            <div className="w-20 h-20 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-3xl shadow-inner group-hover:scale-105 transition-transform duration-500">
                                🦉
                            </div>
                            <div>
                                <h4 className="text-2xl font-bold text-slate-100">Akshat</h4>
                                <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mt-1">Golden Bibliophile</p>
                                <div className="mt-4 flex gap-6 text-center">
                                    <div className="text-center">
                                        <p className="text-lg font-bold">48</p>
                                        <p className="text-[10px] text-slate-500 uppercase font-bold">Books Read</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-lg font-bold">12</p>
                                        <p className="text-[10px] text-slate-500 uppercase font-bold">Rentals</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Member ID</p>
                            <p className="text-xs font-mono text-slate-400">NN-7742-2024</p>
                        </div>
                    </div>
                    {/* Decorative Background Element */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-3xl rounded-full"></div>
                </div>
            </section>

            {/* 2. Public Profile Form */}
            <section className="space-y-6">
                <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest border-b border-slate-800 pb-2">Public Identity</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Display Name</label>
                        <input
                            type="text"
                            placeholder="Akshat"
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:border-amber-500/50 outline-none transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Email Address</label>
                        <input
                            type="email"
                            placeholder="akshat@novelnest.com"
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:border-amber-500/50 outline-none transition-all"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Reader's Motto</label>
                    <textarea
                        rows={3}
                        placeholder="Lost in the pages of an old book..."
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:border-amber-500/50 outline-none transition-all resize-none"
                    />
                </div>
            </section>

            {/* 3. Literary Interests */}
            <section>
                <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest border-b border-slate-800 pb-2 mb-4">Preferred Genres</h3>
                <div className="flex flex-wrap gap-3">
                    {genres.map(genre => (
                        <button
                            key={genre}
                            className="px-4 py-2 rounded-full border border-slate-700 text-xs font-bold text-slate-400 hover:border-amber-500/40 hover:text-amber-500 hover:bg-amber-500/5 transition-all"
                        >
                            {genre}
                        </button>
                    ))}
                    <button className="px-4 py-2 rounded-full border border-dashed border-slate-700 text-xs font-bold text-slate-600 hover:text-slate-400 transition-all">
                        + Add Genre
                    </button>
                </div>
            </section>

            {/* Save Action */}
            <div className="pt-6 flex justify-end">
                <button className="bg-amber-500 text-slate-900 px-8 py-3 rounded-xl font-bold text-sm shadow-xl shadow-amber-500/10 hover:scale-105 active:scale-95 transition-all">
                    Update Records
                </button>
            </div>
        </div>
    );
}
