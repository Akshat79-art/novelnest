"use client"

import Link from "next/link";
import { useState } from "react";

export default function Signup() {

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const nextStep = () => setStep(step => step + 1);
    const prevStep = () => setStep(step => step - 1);

    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Sign Up attempt");
    }

    return (
        // <div className="w-full max-w-md bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
        <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 font-sans selection:bg-amber-500/30">

            <Link href="/" className="absolute top-8 left-8 text-slate-400 hover:text-amber-500 transition-colors flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
                Back to Library
            </Link>

            <div className="w-full max-w-md bg-slate-800/50 border border-slate-700 rounded-2xl shadow-xl backdrop-blur-sm overflow-hidden p-8">
                <>
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

                    <form className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300" onSubmit={handleSignUp}>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">Email Address</label>
                            <input
                                type="email"
                                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-colors"
                                placeholder="you@example.com"
                                // value={email}
                                // onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
                            <input
                                type="password"
                                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-colors"
                                placeholder="••••••••"
                                // value={password}
                                // onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">Confirm Password</label>
                            <input
                                type="password"
                                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-colors"
                                placeholder="••••••••"
                                // value={password}
                                // onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-lg transition-colors shadow-lg shadow-amber-900/20">
                            Move ahead
                        </button>
                    </form>
                </>
            </div>

        </div>
    )
}
