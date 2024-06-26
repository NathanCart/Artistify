import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import querystring from 'querystring';
import { cookies } from 'next/headers';
import { json } from 'stream/consumers';

export async function GET(request: NextRequest) {
	const params = request.nextUrl.searchParams;

	const code = params.get('code');
	const state = params.get('state');

	const spotifyAccessToken = cookies().get('spotify_access_token');

	if (spotifyAccessToken) {
		return redirect('/');
	}

	if (state === null) {
		return redirect('/#');
	} else {
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

		console.log(data, 'data');
		const accessToken = data.access_token;

		const refreshTokenResponse = await fetch('https://accounts.spotify.com/api/refresh_token', {
			headers: {
				'content-type': 'application/x-www-form-urlencoded',
			},
			method: 'POST',
			body: querystring.stringify({
				code: code,
				grant_type: 'refresh_token',
			}),
		});

		cookies().set('spotify_access_token', accessToken, {
			maxAge: 3600,
		});

		return redirect('/');
	}
}
