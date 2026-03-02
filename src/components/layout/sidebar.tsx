"use client"

import React, { useState } from 'react';
import Link from 'next/link';

const navItems = [
    { id: 'library', label: 'My Library', path: '/dashboard', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18" /> },
    { id: 'explore', label: 'Explore', path: '/explore', icon: <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /> },
    { id: 'rentals', label: 'Rentals', path: '/rentals', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /> },
];

export default function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <aside className={`${isCollapsed ? 'w-20' : 'w-64'} border-r border-slate-800 bg-slate-900 shadow-xl transition-all duration-300 flex flex-col p-4 fixed h-full z-50`}>

            {/* Toggle Button & Logo */}
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} mb-10 px-2`}>
                {!isCollapsed && (
                    <h1 className="text-xl font-bold text-amber-500 tracking-tight transition-opacity duration-300">NovelNest</h1>
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-amber-500 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2">
                {navItems.map((item) => (
                    <Link href={item.path} key={item.id} className="flex items-center gap-4 px-4 py-3 rounded-xl text-slate-400 hover:bg-amber-500/10 hover:text-amber-500 transition-all group overflow-hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 shrink-0">
                            {item.icon}
                        </svg>
                        {!isCollapsed && <span className="font-medium whitespace-nowrap">{item.label}</span>}
                    </Link>
                ))}
            </nav>

            <div className="border-t border-slate-800 pt-6">
                <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : 'p-3 bg-slate-800/40 rounded-2xl border border-slate-700/50 hover:cursor-pointer'}`}>
                    <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-900 font-bold flex items-center justify-center shrink-0">A</div>
                    {!isCollapsed && (
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold truncate">Akshat</p>
                            <button className="text-[10px] text-red-500 hover:text-red-400 font-bold uppercase tracking-widest mt-1 block">Log out</button>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}
