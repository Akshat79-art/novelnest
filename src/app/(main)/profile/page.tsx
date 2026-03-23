"use client"
import { useState } from 'react';

import RentalHistory from '@/components/profile/RentalHistory';
import SecuritySettings from '@/components/profile/SecuritySettings';
import ProfileCard from '@/components/profile/ProfileCard';

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState('general');

    const tabs = [
        { id: 'general', label: 'Library Card', icon: '👤', desc: 'Personal records' },
        { id: 'history', label: 'Rentals', icon: '📖', desc: 'Active adventures' },
        { id: 'security', label: 'Security', icon: '🛡️', desc: 'Access & safety' },
    ];

    return (
        <div className="flex flex-col w-full max-w-7xl mx-auto py-8 px-6 gap-8 items-center">
            <style>{`
                @keyframes pageFlip {
                    0% { transform: rotateY(0deg); }
                    100% { transform: rotateY(-180deg); }
                }
                @keyframes crossSectionFlip {
                    0% { transform: rotate(0deg) scaleX(1); opacity: 0; }
                    50% { transform: rotate(-90deg) scaleX(0.75); opacity: 1; }
                    100% { transform: rotate(-180deg) scaleX(1); opacity: 0; }
                }
            `}</style>

            <div className="w-full pb-3 flex flex-col items-center text-center">
                <h2 className="text-4xl font-bold text-slate-100 tracking-tight">Profile</h2>
                <p className="text-amber-500 text-xs uppercase font-bold tracking-widest mt-2">Manage your identity</p>
            </div>

            <nav className="flex flex-wrap md:flex-nowrap justify-center gap-8">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`md:flex-1 shrink-0 min-w-[280px] group text-left p-3 rounded-3xl transition-all duration-300 border ${activeTab === tab.id
                            ? 'bg-amber-500/10 border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.05)]'
                            : 'border-slate-800/50 hover:border-slate-700 bg-slate-900/50 hover:bg-slate-800/40 text-slate-400'
                            }`}
                    >
                        <div className="flex items-center gap-5">
                            {/* Icon with glow for active tab */}
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all 
                                ${activeTab === tab.id ? 'bg-amber-500 text-slate-900 shadow-xl shadow-amber-500/20 scale-105' : 'bg-slate-800 group-hover:bg-slate-700 group-hover:scale-105'}`}>
                                {tab.icon}
                            </div>

                            <div className="flex-1">
                                <p className={`font-bold text-lg transition-colors ${activeTab === tab.id ? 'text-amber-500' : 'text-slate-300 group-hover:text-slate-100'}`}>
                                    {tab.label}
                                </p>
                                <p className="text-[10px] text-slate-500 font-bold truncate uppercase tracking-widest mt-1">
                                    {tab.desc}
                                </p>
                            </div>

                            {/* Active Book Indicator (Mountain Cross Section) */}
                            {activeTab === tab.id && (
                                <div className="relative w-7 h-7 flex flex-col justify-end items-center shrink-0 mr-2">
                                    {/* Left thick stack */}
                                    <div className="absolute right-1/2 bottom-[4px] w-[14px] h-[5px] bg-amber-600 rounded-tl-[100%] rounded-bl-[2px] border-t-[0.5px] border-amber-500/50"></div>
                                    {/* Right thick stack */}
                                    <div className="absolute left-1/2 bottom-[4px] w-[14px] h-[5px] bg-amber-500 rounded-tr-[100%] rounded-br-[2px] border-t-[0.5px] border-amber-400/50"></div>

                                    {/* Center Spine */}
                                    <div className="absolute bottom-[2px] w-[2px] h-[8px] bg-amber-800 rounded-t-[1px] z-10 shadow-lg"></div>

                                    {/* Flipping Page */}
                                    <div
                                        className="absolute left-1/2 bottom-[9px] w-[14px] h-[1.5px] bg-amber-300 origin-left rounded-r-full z-20"
                                        style={{ animation: 'crossSectionFlip 2.5s cubic-bezier(0.3, 0, 0.2, 1) infinite' }}
                                    ></div>
                                </div>
                            )}
                        </div>
                    </button>
                ))}
            </nav>

            {/* Row 3: The Main Content Area */}
            <div className="w-full min-h-[70vh] bg-slate-800/20 border border-slate-700/30 rounded-[3rem] p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden mt-4">
                {activeTab === 'general' && <ProfileCard />}
                {activeTab === 'history' && <RentalHistory />}
                {activeTab === 'security' && <SecuritySettings />}
            </div>
        </div>
    );
}
