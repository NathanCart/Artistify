import { cookies } from 'next/headers';
import { Suspense } from 'react';
import { getCurrentUser } from '../actions';
import ArtistList from '../components/ArtistList';
import Avatar from '../components/Avatar';
import FeaturedArtist from '../components/FeaturedArtist';
import Search from '../components/Search';
import { IUserResponse } from '@/models/user';
import Header from '../components/Header';

interface IListPage {
	searchParams: any;
	currentUser: IUserResponse;
}

export default async function ListPage({ searchParams, currentUser }: IListPage) {
	return (
		<main className="container p-4 relative">
			<Header
				currentUser={currentUser}
				title="Artists you've seen!"
				description="Your list of artists you've seen live!"
			/>

			<Suspense fallback={<div>Loading...</div>}>
				<Search id="q" className="w-full  max-w-full md:hidden block" />
			</Suspense>
			<>
				<h2 className="mb-4 mt-8"></h2>
				{/* <ArtistList user={currentUser} artists={currentUser?.artists}  /> */}
			</>
		</main>
	);
}
