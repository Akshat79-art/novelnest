'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth';
import Link from 'next/link';

export default function AuthPage() {

    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Login attempt");
        // If need a loading state, add it here.
        const result = await authClient.signIn.email({
            email,
            password,
            callbackURL: "/",
        });
        if (result.error) {
            console.error(result.error);
        } else {
            router.push("/");
        }
    }

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 font-sans selection:bg-amber-500/30">

            {/* Back to Home */}
            <Link href="/" className="absolute top-8 left-8 text-slate-400 hover:text-amber-500 transition-colors flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
                Back to Library
            </Link>

            {/* <div className="w-full max-w-md bg-slate-800/50 border border-slate-700 rounded-2xl shadow-xl backdrop-blur-sm overflow-hidden p-8"> */}
            <div className="w-full max-w-md bg-slate-800/50 border border-slate-700 rounded-2xl shadow-xl backdrop-blur-sm overflow-hidden p-8">

                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-slate-100 mb-2">NovelNest</h1>
                    <p className="text-slate-400 text-sm">Your gateway to infinite stories.</p>
                </div>

                {/* Login Header */}
                <div className="mb-8 flex items-center justify-center gap-3">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-900/50 to-transparent"></div>
                    <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.15)] backdrop-blur-md group">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform duration-300">
                            <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
                        </svg>
                        <span className="text-amber-500 text-xs font-bold uppercase tracking-widest">Access Your Library</span>
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-900/50 to-transparent"></div>
                </div>

                <form className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300" onSubmit={handleLogin}>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Email Address</label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-colors"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-colors"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-end">
                        <Link href="#" className="text-sm text-amber-500 hover:text-amber-400 transition-colors">
                            Forgot Password?
                        </Link>
                    </div>
                    <button className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-lg transition-colors shadow-lg shadow-amber-900/20">
                        Welcome Back
                    </button>
                </form>
            </div>
        </div>
    );
}
