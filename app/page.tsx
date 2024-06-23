import { cookies } from 'next/headers';

export default async function Home({ params, searchParams }: { params: any; searchParams: any }) {
	const accessToken = cookies().get('spotify_access_token');

	const getArtists = async () => {
		const response = await fetch(
			`https://api.spotify.com/v1/search/?q=${searchParams?.q ?? ''}&type=${
				searchParams?.type ?? 'artist'
			}`,
			{
				headers: {
					Authorization: `Bearer ${accessToken?.value}`,
				},
			}
		);
		const data = await response.json();
		return data;
	};

	const artists = await getArtists();

	console.log(artists, 'artists');

	return (
		<main className="container">
			<h1>hello</h1>
			<a
				href={`https://accounts.spotify.com/authorize?client_id=${process.env.NEXT_PUBLIC_SPOTIFY_API_CLIENT_ID}&response_type=code&redirect_uri=${process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI}&scope=user-read-private%20user-read-email&state=34fFs29kd09`}
			>
				Login
			</a>
		</main>
	);
}
