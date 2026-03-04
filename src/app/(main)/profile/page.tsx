"use client"
import { useState } from 'react';

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState('general');

    const tabs = [
        { id: 'general', label: 'Library Card', icon: '👤' },
        { id: 'history', label: 'Rentals', icon: '📖' },
        { id: 'safety', label: 'Security', icon: '🛡️' },
    ];

    return (
        <div className="flex gap-8 max-w-6xl mx-auto py-10">
            {/* 25% - The Index Sidebar */}
            <div className="w-1/4 space-y-2">
                <h1 className="text-2xl font-bold mb-6 text-slate-100">Profile</h1>
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === tab.id
                            ? 'bg-amber-500 text-slate-900 font-bold'
                            : 'text-slate-400 hover:bg-slate-800'
                            }`}
                    >
                        <span>{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* 75% - The Content Area */}
            <div className="w-3/4 bg-slate-800/40 border border-slate-700/50 rounded-3xl p-8 backdrop-blur-sm shadow-xl">
                {/* {activeTab === 'general' && <GeneralSettings />}
                {activeTab === 'history' && <RentalHistory />}
                {activeTab === 'safety' && <SecuritySettings />} */}
            </div>
        </div>
    );
}
