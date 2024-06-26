import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	const spotifyAccessToken = cookies().get('spotify_access_token');

	const pathname = request.nextUrl.pathname;

	if (!!spotifyAccessToken?.value?.length || pathname === '/login') {
		return NextResponse.next();
	} else {
		return NextResponse.redirect(
			`https://accounts.spotify.com/authorize?client_id=${process.env.NEXT_PUBLIC_SPOTIFY_API_CLIENT_ID}&response_type=code&redirect_uri=${process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI}&scope=user-read-private%20user-read-email&state=34fFs29kd09`
		);
	}
}

export const config = {
	matcher: ['/((?!api|_next|.*\\..*).*)'],
};
