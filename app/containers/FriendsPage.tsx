'use client';
import { IUserResponse } from '@/models/user';
import { Suspense } from 'react';
import ArtistList from '../components/ArtistList';
import Avatar from '../components/Avatar';
import Search from '../components/Search';

interface IFriendsPage {
	searchParams: any;
	currentUser: IUserResponse;
	userResults: IUserResponse[];
}

export default async function FriendsPage({
	searchParams,
	currentUser,
	userResults,
}: IFriendsPage) {
	console.log(userResults, 'results');
	return (
		<main className="container p-4 relative">
			<Search id="friends-q" disableNavigation placeholder="Search for friends..." />
			<h1 className="text-2xl tmd:text-4xl font-bold mb-8 mt-2">Friends list</h1>
			<Avatar
				src={currentUser?.spotify_data?.images?.[1]?.url}
				alt={currentUser?.spotify_data?.display_name}
			/>
		</main>
	);
}
