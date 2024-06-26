import { cookies } from 'next/headers';
import { Suspense } from 'react';
import Search from './components/Search';
import ArtistList from './components/ArtistList';
import FeaturedArtist from './components/FeaturedArtist';

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

	const hasSearch = searchParams?.q;

	return (
		<main className="container p-4">
			<Suspense fallback={<div>Loading...</div>}>
				<Search className="w-full md:w-1/2 lg:w-1/4  max-w-full" />
			</Suspense>
			{hasSearch ? (
				<>
					{!!artists?.artists?.items?.length ? (
						<>
							<h2 className="mb-4 mt-8">Top result</h2>
							<FeaturedArtist artist={artists?.artists?.items?.[0]} />{' '}
							<h2 className="mb-4 mt-8">Artists</h2>
							<ArtistList
								className=""
								artists={artists?.artists?.items?.slice(
									1,
									artists?.artists?.items?.length
								)}
							/>
						</>
					) : (
						<h2 className="mb-4 mt-8">No artists found...</h2>
					)}
				</>
			) : (
				<h2 className="mb-4 mt-8">Search for an artist</h2>
			)}
		</main>
	);
}
