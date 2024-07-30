'use client';
import { IUserResponse } from '@/models/user';
import FriendList from '../components/FriendList';
import Header from '../components/Header';
import Search from '../components/Search';
import Divider from '../components/Divider';

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
			<Header
				currentUser={currentUser}
				title="Friends list"
				description="View your friends and the artists they've seen live!"
			/>

			<FriendList user={currentUser} users={friends} />

			<Divider className="-mx-4" />
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
