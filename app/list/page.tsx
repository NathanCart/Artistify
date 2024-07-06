import { cookies } from 'next/headers';
import { Suspense } from 'react';
import { getCurrentUser } from '../actions';
import ArtistList from '../components/ArtistList';
import Avatar from '../components/Avatar';
import FeaturedArtist from '../components/FeaturedArtist';
import Search from '../components/Search';

export default async function Home({ params, searchParams }: { params: any; searchParams: any }) {
	const accessToken = cookies().get('spotify_access_token');
	const currentUser = await getCurrentUser(accessToken?.value ?? '');

	console.log('currentUser', currentUser);

	return (
		<main className="container p-4 relative">
			<h1 className="text-2xl tmd:text-4xl font-bold mb-8 mt-2">
				Welcome, {currentUser?.spotify_data?.display_name}
			</h1>
			<Avatar
				src={currentUser?.spotify_data?.images?.[1]?.url}
				alt={currentUser?.spotify_data?.display_name}
			/>
			<Suspense fallback={<div>Loading...</div>}>
				<Search className="w-full  max-w-full md:hidden block" />
			</Suspense>
			<>
				<h2 className="mb-4 mt-8">Most recent</h2>
				<FeaturedArtist artist={currentUser?.artists?.[0]} />{' '}
				<h2 className="mb-4 mt-8">Artists</h2>
				<ArtistList
					user={currentUser}
					artists={currentUser?.artists?.slice(1, currentUser?.artists?.items?.length)}
				/>
			</>
		</main>
	);
}
