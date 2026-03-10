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

                                {/* Active Arrow Indicator */}
                                {activeTab === tab.id && (
                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></div>
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
