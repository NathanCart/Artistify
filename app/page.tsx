import { cookies } from 'next/headers';
import { Suspense } from 'react';
import Search from './components/Search';
import ArtistList from './components/ArtistList';

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

	const artists: IArtistsResponse = await getArtists();

	console.log(artists.artists, 'artists');

	return (
		<main className="container">
			<Suspense fallback={<div>Loading...</div>}>
				<Search />
			</Suspense>
			<ArtistList artists={artists?.artists?.items} />
		</main>
	);
}
