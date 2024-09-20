import { NextResponse } from 'next/server';
import { getCookie } from 'cookies-next';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const accessToken = getCookie('accessToken');

    if (!accessToken) {
        return NextResponse.redirect(new URL('/home', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/domestic/**', '/hotel/**', '/mypage/**'],
};