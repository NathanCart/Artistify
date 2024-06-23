import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import querystring from 'querystring';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
	const params = request.nextUrl.searchParams;

	const code = params.get('code');
	const state = params.get('state');

	const spotifyAccessToken = cookies().get('spotify_access_token');

	if (spotifyAccessToken) {
		console.log('cookie exists, redirecting to /');
		return redirect('/');
	}

	if (state === null) {
		return redirect('/#');
	} else {
		console.log('state exists, fetching access token');
		const authOptions = {
			url: 'https://accounts.spotify.com/api/token',
			form: {
				code: code,
				redirect_uri: 'http://localhost:3000',
				grant_type: 'client_credentials',
			},
			headers: {
				'content-type': 'application/x-www-form-urlencoded',
				Authorization:
					'Basic ' +
					Buffer.from(
						process.env.NEXT_PUBLIC_SPOTIFY_API_CLIENT_ID +
							':' +
							process.env.NEXT_PUBLIC_SPOTIFY_API_SECRET
					).toString('base64'),
			},
			json: true,
		};

		const response = await fetch(authOptions.url, {
			method: 'POST',
			headers: authOptions.headers,
			body: querystring.stringify(authOptions.form),
		});

		const data = await response.json();
		const accessToken = data.access_token;

		cookies().set('spotify_access_token', accessToken);

		return redirect('/');
	}
}
