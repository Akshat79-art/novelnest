import Link from 'next/link';

export default function Home() {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-200 font-sans selection:bg-amber-500/30">
            {/* Navigation */}
            <nav className="flex items-center justify-between px-6 py-4 bg-slate-800/50 backdrop-blur-md border-b border-white/5 sticky top-0 z-50">
                <div className="text-2xl font-bold text-amber-500 tracking-tight">NovelNest</div>
                <div className="space-x-4">
                    <Link href="/auth?view=login" className="px-4 py-2 text-sm font-medium text-slate-300 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-amber-500/50 hover:text-amber-400 hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                        Login
                    </Link>
                    <Link href="/not-found" className="px-4 py-2 text-sm font-medium text-slate-900 bg-amber-500 rounded-lg hover:bg-amber-400 transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                        Sign Up
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="max-w-7xl mx-auto px-6 py-20 sm:py-32 lg:py-12 relative overflow-hidden">
                {/* Abstract background glow */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[100px] -z-10"></div>

                <div className="text-center max-w-4xl mx-auto">
                    <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-slate-100 mb-8 leading-tight">
                        Your Personal Library, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                            Reimagined.
                        </span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-400 mb-12 leading-relaxed">
                        Discover a curated collection of timeless classics and modern masterpieces.
                        Rent books without boundaries and immerse yourself in stories that matter.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-5">
                        <Link href="/books" className="px-8 py-4 text-base font-bold text-slate-900 bg-amber-500 rounded-lg shadow-lg shadow-amber-900/20 hover:bg-amber-400 hover:scale-105 transition-all duration-300 min-w-[200px]">
                            Browse Collection
                        </Link>
                        <Link href="/about" className="px-8 py-4 text-base font-bold text-slate-300 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-amber-500/50 hover:text-amber-400 hover:scale-105 transition-all duration-300 backdrop-blur-sm min-w-[200px]">
                            How it Works
                        </Link>
                    </div>
                </div>

                {/* Features Section */}
                <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-4">
                    {[
                        {
                            title: "Curated Selection",
                            desc: "From philosophy to sci-fi, access thousands of titles hand-picked for the modern reader.",
                            icon: (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                            )
                        },
                        {
                            title: "Timeless Access",
                            desc: "Keep books as long as you need. No late fees, just the freedom to read at your own pace.",
                            icon: (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            )
                        },
                        {
                            title: "Premium Delivery",
                            desc: "Carefully packaged and delivered to your doorstep with the care your books deserve.",
                            icon: (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                            )
                        }
                    ].map((feature, idx) => (
                        <div key={idx} className="group p-8 bg-slate-800 border border-slate-700/50 rounded-2xl hover:border-amber-900/50 hover:bg-slate-700/80 transition-all duration-300">
                            <div className="w-14 h-14 mx-auto bg-slate-900 border border-slate-700 text-amber-500 rounded-full flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                    {feature.icon}
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-slate-100 mb-3">{feature.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-slate-900 py-10 border-t border-slate-800 mt-auto">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-slate-600 text-sm">
                        &copy; {new Date().getFullYear()} NovelNest. <span className="text-slate-800 mx-2">|</span> Crafted for readers.
                    </p>
                </div>
            </footer>
        </div>
    );
}
