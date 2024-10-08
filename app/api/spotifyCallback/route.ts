import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import querystring from 'querystring';
import { cookies } from 'next/headers';
import { json } from 'stream/consumers';
import { ISpotifyData, IUser, IUserResponse } from '@/models/user';

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
				redirect_uri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI,
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

		console.log(data, 'data');

		const accessToken = data.access_token;

		cookies().set('spotify_access_token', accessToken, {
			maxAge: 3600,
		});

		console.log(accessToken, 'token');
		if (!!accessToken) {
			const currentUserResponse = await fetch('https://api.spotify.com/v1/me', {
				headers: {
					method: 'GET',
					'content-type': 'application/json',
					Authorization: 'Bearer ' + data.access_token,
				},
			});

			const userData: ISpotifyData = await currentUserResponse.json();

			console.log(userData, 'user data');
			const createUserObjectResponse = await fetch(`${process.env.API_URL}/api/user/`, {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify({
					spotify_id: userData.id,
					display_name: userData.display_name,
					avatar_url: userData.images[1]?.url,
					followers: userData.followers.total,
				}),
			});

			const createUserObjectData = await createUserObjectResponse.json();

			return redirect('/');
		}
	}
}
