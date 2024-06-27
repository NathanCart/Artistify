import { cookies } from 'next/headers';
import { Suspense } from 'react';
import Search from './components/Search';
import ArtistList from './components/ArtistList';
import FeaturedArtist from './components/FeaturedArtist';
import { IUserResponse } from '@/models/user';
import Image from 'next/image';
import Link from 'next/link';
import Avatar from './components/Avatar';

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

	const currentUserResponse = await fetch('https://api.spotify.com/v1/me', {
		headers: {
			method: 'GET',
			'content-type': 'application/json',
			Authorization: 'Bearer ' + accessToken?.value,
		},
	});

	const userData: IUserResponse = await currentUserResponse.json();

	const hasSearch = searchParams?.q;

	return (
		<main className="container p-4 relative">
			<h1 className="text-2xl tmd:text-4xl font-bold mb-8 mt-2">
				Welcome, {userData?.display_name}
			</h1>
			{!hasSearch && (
				<>
					<h2 className="mb-4 mt-8 md:hidden block">Search for an artist</h2>
				</>
			)}
			<Avatar src={userData?.images?.[1]?.url} alt={userData?.display_name} />
			<Suspense fallback={<div>Loading...</div>}>
				<Search className="w-full  max-w-full md:hidden block" />
			</Suspense>
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
					<>{hasSearch && <h2 className="mb-4 mt-8">No artists found...</h2>}</>
				)}
			</>
			)
		</main>
	);
}
