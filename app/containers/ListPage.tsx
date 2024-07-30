import { cookies } from 'next/headers';
import { Suspense } from 'react';
import { getCurrentUser } from '../actions';
import ArtistList from '../components/ArtistList';
import Avatar from '../components/Avatar';
import FeaturedArtist from '../components/FeaturedArtist';
import Search from '../components/Search';
import { IUserResponse } from '@/models/user';

interface IListPage {
	searchParams: any;
	currentUser: IUserResponse;
}

export default async function ListPage({ searchParams, currentUser }: IListPage) {
	return (
		<main className="container p-4 relative">
			<Avatar
				src={currentUser?.spotify_data?.images?.[1]?.url}
				alt={currentUser?.spotify_data?.display_name}
			/>

			<h1 className="text-2xl tmd:text-4xl font-bold  mt-2">Artists you've seen!</h1>
			<p className="text-sm mb-8 font-body text-neutral-300">
				Your list of artists you've seen live!
			</p>
			<Suspense fallback={<div>Loading...</div>}>
				<Search id="q" className="w-full  max-w-full md:hidden block" />
			</Suspense>
			<>
				<h2 className="mb-4 mt-8"></h2>
				<ArtistList user={currentUser} artists={currentUser?.artists} />
			</>
		</main>
	);
}
