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

	if (!!spotifyAccessToken?.value) {
		return redirect('/');
	}

	if (state === null) {
		return redirect('/#');
	} else {
		const authOptions = {
			url: 'https://accounts.spotify.com/api/token',
			form: {
				code: code,
				redirect_uri: 'http://localhost:3000/api/spotifyCallback',
				grant_type: 'authorization_code',
				state: state,
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

		cookies().set('spotify_access_token', accessToken, {
			maxAge: 3600,
		});

		if (!!accessToken) {
			const currentUserResponse = await fetch('https://api.spotify.com/v1/me', {
				headers: {
					method: 'GET',
					'content-type': 'application/json',
					Authorization: 'Bearer ' + data.access_token,
				},
			});

			const userData = await currentUserResponse.json();

			const createUserObjectResponse = await fetch(`${process.env.API_URL}/api/user/`, {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify({
					spotify_id: userData.id,
				}),
			});

			const createUserObjectData = await createUserObjectResponse.json();
		}

		return redirect('/');
	}
}
