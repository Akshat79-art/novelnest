import { NextResponse, type NextRequest } from "next/server";

export default function middleware(req: NextRequest) {

    console.log("Middleware hit");

    const sessionCookie = req.cookies.get("better-auth.session_token");
    const isProtectedRoute = req.nextUrl.pathname.startsWith("/auth");

    if (!sessionCookie && isProtectedRoute) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/main/:path*"],
};