"use client"

import React, { useState } from 'react';
import Sidebar from '@/components/layout/sidebar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="flex bg-slate-900 min-h-screen">
            <Sidebar
                isCollapsed={isCollapsed}
                onToggle={() => setIsCollapsed(!isCollapsed)}
            />

            <main className={`flex-1 transition-all duration-300 ${isCollapsed ? 'pl-20' : 'pl-64'}`}>
                {children}
            </main>
        </div>
    );
}
