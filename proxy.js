import { NextResponse } from "next/server";


export function proxy(request) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
    return NextResponse.next({
        request: { headers: requestHeaders}
    });
}

export const config = {
    matcher: [
        '/auth',
    ]
};

