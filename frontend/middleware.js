import { NextResponse } from 'next/server'

export default async function middleware(req, res) {
    const token = req.cookies.get('token');

    if (!token && req.nextUrl.pathname == '/posts') {
        return NextResponse.redirect(new URL('/auth/login',req.url));
    }

    if (token && req.nextUrl.pathname.startsWith('/auth')) {
        return NextResponse.redirect(new URL('/',req.url));
    }

    return NextResponse.next();
}