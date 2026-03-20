"use client"
import { useState } from 'react';
import GeneralSettings from '@/components/profile/GeneralSettings';
import RentalHistory from '@/components/profile/RentalHistory';
import SecuritySettings from '@/components/profile/SecuritySettings';

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState('general');

    const tabs = [
        { id: 'general', label: 'Library Card', icon: '👤', desc: 'Personal records' },
        { id: 'history', label: 'Rentals', icon: '📖', desc: 'Active adventures' },
        { id: 'security', label: 'Security', icon: '🛡️', desc: 'Access & safety' },
    ];

    return (
        <div className="flex gap-10 max-w-7xl mx-auto py-12 px-6 items-start">
            <style>{`
                @keyframes pageFlip {
                    0% { transform: rotateY(0deg); }
                    100% { transform: rotateY(-180deg); }
                }
                @keyframes crossSectionFlip {
                    0% { transform: rotate(-180deg) scaleX(1); opacity: 0; }
                    50% { transform: rotate(-90deg) scaleX(0.75); opacity: 1; }
                    100% { transform: rotate(0deg) scaleX(1); opacity: 0; }
                }
            `}</style>

            {/* 25% Modern Sticky Index */}
            <div className="w-1/4 sticky top-12 space-y-8">
                <div>
                    <h2 className="text-3xl font-bold text-slate-100 tracking-tight">Profile</h2>
                    <p className="text-slate-500 text-xs uppercase font-bold tracking-widest mt-1">Manage your identity</p>
                </div>

                <nav className="space-y-3">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full group text-left p-4 rounded-2xl transition-all duration-300 border ${activeTab === tab.id
                                ? 'bg-amber-500/10 border-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.05)]'
                                : 'border-transparent hover:bg-slate-800/40 text-slate-400'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                {/* Icon with glow for active tab */}
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all ${activeTab === tab.id ? 'bg-amber-500 text-slate-900 shadow-lg shadow-amber-500/20' : 'bg-slate-800 group-hover:bg-slate-700'
                                    }`}>
                                    {tab.icon}
                                </div>

                                <div className="flex-1">
                                    <p className={`font-bold transition-colors ${activeTab === tab.id ? 'text-amber-500' : 'text-slate-300 group-hover:text-slate-100'}`}>
                                        {tab.label}
                                    </p>
                                    <p className="text-[10px] text-slate-500 font-medium truncate uppercase tracking-tighter">
                                        {tab.desc}
                                    </p>
                                </div>

                                {/* Active Book Indicator (Mountain Cross Section) */}
                                {activeTab === tab.id && (
                                    <div className="relative w-6 h-6 flex flex-col justify-end items-center shrink-0">
                                        {/* Left thick stack (curved down to the left) */}
                                        <div className="absolute right-1/2 bottom-[4px] w-[12px] h-[5px] bg-amber-600 rounded-tl-[100%] rounded-bl-[2px] border-t-[0.5px] border-amber-500/50"></div>
                                        {/* Right thick stack (curved down to the right) */}
                                        <div className="absolute left-1/2 bottom-[4px] w-[12px] h-[5px] bg-amber-500 rounded-tr-[100%] rounded-br-[2px] border-t-[0.5px] border-amber-400/50"></div>

                                        {/* Center Spine */}
                                        <div className="absolute bottom-[2px] w-[2px] h-[7px] bg-amber-800 rounded-t-[1px] z-10 shadow-lg"></div>

                                        {/* Flipping Page */}
                                        <div
                                            className="absolute left-1/2 bottom-[8px] w-[12px] h-[1.5px] bg-amber-300 origin-left rounded-r-full z-20"
                                            style={{ animation: 'crossSectionFlip 2.5s cubic-bezier(0.3, 0, 0.2, 1) infinite' }}
                                        ></div>
                                    </div>
                                )}
                            </div>
                        </button>
                    ))}
                </nav>
            </div>

            {/* 75% The Main Content Area */}
            <div className="flex-1 min-h-[85vh] bg-slate-800/30 border border-slate-700/40 rounded-[2.5rem] p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                {activeTab === 'general' && <GeneralSettings />}
                {activeTab === 'history' && <RentalHistory />}
                {activeTab === 'safety' && <SecuritySettings />}
            </div>
        </div>
    );
}
