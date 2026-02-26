'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { authClient } from '@/lib/auth';

export default function ForgotPassword() {

    const router = useRouter();
    const [email, setEmail] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Password reset attempt");
        // If need a loading state, add it here.
        const result = await authClient.requestPasswordReset({
            email,
            // redirectTo: "/",
        });
        if (result.error) {
            console.error(result.error);
        } else {
            router.push("/");
        }
    }

    return (
        <div className="w-full">
            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-slate-100 mb-2">Recovery</h1>
                <p className="text-slate-400 text-sm">Enter your email to reset password.</p>
            </div>

            <form className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300" onSubmit={handleLogin}>
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Email Address</label>
                    <input
                        type="email"
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-colors"
                        placeholder="you@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <button className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-lg transition-colors shadow-lg shadow-amber-900/20">
                    Send Reset Link
                </button>

                <div className="text-center mt-4">
                    <Link href="/auth" className="text-sm text-slate-400 hover:text-amber-500 transition-colors flex items-center justify-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                        Back to Login
                    </Link>
                </div>
            </form>
        </div>
    );
}