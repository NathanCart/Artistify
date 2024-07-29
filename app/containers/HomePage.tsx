import { cookies } from 'next/headers';
import { Suspense } from 'react';
import { getCurrentUser } from '../actions';
import ArtistList from '../components/ArtistList';
import Avatar from '../components/Avatar';
import FeaturedArtist from '../components/FeaturedArtist';
import Search from '../components/Search';
import { IUserResponse } from '@/models/user';

interface IHomePage {
	searchParams: any;
	currentUser: IUserResponse;
	artists: IArtistsResponse;
}

export default async function HomePage({ searchParams, currentUser, artists }: IHomePage) {
	const hasSearch = searchParams?.q;

	return (
		<main className="container p-4 relative">
			<h1 className="text-2xl tmd:text-4xl font-bold mb-8 mt-2">
				Welcome, {currentUser?.spotify_data?.display_name}
			</h1>
			{!hasSearch && (
				<>
					<h2 className="mb-4 mt-8 md:hidden block">Search for an artist</h2>
				</>
			)}
			<Avatar
				src={currentUser?.spotify_data?.images?.[1]?.url}
				alt={currentUser?.spotify_data?.display_name}
			/>
			<Suspense fallback={<div>Loading...</div>}>
				<Search id="q" className="w-full  max-w-full md:hidden block" />
			</Suspense>
			<>
				{!!artists?.artists?.items?.length ? (
					<>
						<h2 className="mb-4 mt-8">Top result</h2>
						<FeaturedArtist
							artist={artists?.artists?.items?.[0]}
							user={currentUser}
						/>{' '}
						<h2 className="mb-4 mt-8">Artists</h2>
						<ArtistList
							user={currentUser}
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
