"use client"

import Link from "next/link";
import { authClient } from '@/lib/auth';
import { useState } from "react";

export default function Signup() {

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        location: "",
    });

    const getPasswordStrength = (password: string) => {
        let score = 0;
        let missingLabel = "";

        if (!password) return 0;

        if (password.length > 6) score += 1;
        else missingLabel += "Length should be greater than 6";

        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
        else missingLabel += "Both uppercase and lowercase letters should be present.";

        if (/\d/.test(password)) score += 1;
        else missingLabel += "At least one number should be present.";

        if (/[^a-zA-Z\d]/.test(password)) score += 1;
        else missingLabel += "At least one special character should be present.";

        return score; // Returns 0-4
    };

    const strength = getPasswordStrength(formData.password);
    const strengthLabels = ["Weak", "Fair", "Good", "Strong"];
    const strengthColors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-emerald-500"];


    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Sign Up attempt", formData);

        if (formData.password != formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const result = await authClient.signUp.email({
                name: formData.name,
                email: formData.email,
                password: formData.password,
            })
            if (result.error) {
                console.error(result.error);
            } else {
                nextStep();
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 font-sans selection:bg-amber-500/30 py-12">

            {/* Back to Home */}
            <Link href="/" className="absolute top-8 left-8 text-slate-400 hover:text-amber-500 transition-colors flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
                Back to Library
            </Link>

            <div className={`w-full ${step === 1 ? 'max-w-2xl' : 'max-w-md'} bg-slate-800/50 border border-slate-700 rounded-2xl shadow-xl backdrop-blur-sm overflow-hidden p-8 transition-all duration-500 ease-in-out`}>

                {/* Brand Header */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-slate-100 mb-2">NovelNest</h1>
                    <p className="text-slate-400 text-sm">Your gateway to infinite stories.</p>
                </div>

                {/* Progress Header */}
                <div className="mb-8 flex items-center justify-center gap-3">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-900/50 to-transparent"></div>
                    <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.15)] backdrop-blur-md">
                        <span className="text-amber-500 text-xs font-bold uppercase tracking-widest">
                            {step === 1 ? 'Step 1: Account Details' : 'Step 2: Contact Info'}
                        </span>
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-900/50 to-transparent"></div>
                </div>

                {step === 1 ? (
                    /* Step 1: Account Information (2 Columns on Desktop) */
                    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1.5">Full Name</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-colors"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1.5">Email Address</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-colors"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-colors"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1.5">Confirm Password</label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-colors"
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <button
                            onClick={nextStep}
                            className="w-full mt-8 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-lg transition-colors shadow-lg shadow-amber-900/20">
                            Continue to next step
                        </button>
                    </div>
                ) : (
                    /* Step 2: Extra Details */
                    <form onSubmit={handleSignUp} className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">Mobile Number</label>
                            <input
                                type="tel"
                                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-colors"
                                placeholder="+1 234 567 890"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">Enter your address</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-colors"
                                placeholder="9, Wakanda Street, Lagos"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                required
                            />
                        </div>
                        <div className="flex gap-4 pt-4">
                            <button
                                type="button"
                                onClick={prevStep}
                                className="flex-1 py-3 border border-slate-700 text-slate-300 font-bold rounded-lg hover:bg-slate-800 transition-colors">
                                Back
                            </button>
                            <button
                                type="submit"
                                className="flex-[2] py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-lg transition-colors shadow-lg shadow-amber-900/20">
                                Create Account
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}
