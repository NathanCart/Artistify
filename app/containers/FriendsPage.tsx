'use client';
import { IUserResponse } from '@/models/user';
import { Suspense } from 'react';
import ArtistList from '../components/ArtistList';
import Avatar from '../components/Avatar';
import Search from '../components/Search';
import FriendList from '../components/FriendList';

interface IFriendsPage {
	searchParams: any;
	currentUser: IUserResponse;
	userResults: IUserResponse[];
	friends: IUserResponse[];
}

export default async function FriendsPage({
	searchParams,
	currentUser,
	userResults,
	friends,
}: IFriendsPage) {
	return (
		<main className="container p-4 relative">
			<Avatar
				src={currentUser?.spotify_data?.images?.[1]?.url}
				alt={currentUser?.spotify_data?.display_name}
			/>
			<h1 className="text-2xl tmd:text-4xl font-bold  mt-2">Friends list</h1>
			<p className="text-sm mb-8 font-body text-neutral-300">
				View your friends and the artists they've seen live!
			</p>
			<FriendList user={currentUser} users={friends} />

			<>
				<h2 className="text-2xl tmd:text-4xl font-bold  mt-2">Find new friends!</h2>
				<p className="text-sm mb-4  font-body text-neutral-300">
					Search for friends by their Spotify username to view what bands and festivals
					they've been to.
				</p>
				<Search
					className="mb-8 max-w-xs"
					id="friends-q"
					disableNavigation
					placeholder="Search for friends..."
				/>

				<FriendList
					user={currentUser}
					users={userResults?.filter(
						(user) =>
							!currentUser.friends?.includes(user.id) && user.id !== currentUser.id
					)}
				/>
			</>
		</main>
	);
}
