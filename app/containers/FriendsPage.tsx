'use client';
import { IUser, IUserResponse } from '@/models/user';
import { useQuery } from '@tanstack/react-query';
import { getCurrentUser, getFriends, getUsers } from '../actions';
import Divider from '../components/Divider';
import FriendList from '../components/FriendList';
import Header from '../components/Header';
import Search from '../components/Search';

interface IFriendsPage {
	searchParams: any | undefined;
	accessToken: { value: string; name: string } | undefined;
}

export default function FriendsPage(props: IFriendsPage) {
	const {
		data: friendsSearchData,
		isLoading: isLoadingQuery,
		isError,
	} = useQuery<IUser[]>({
		queryFn: async () => await getUsers(props.searchParams['friends-q']),
		queryKey: ['friends', props?.searchParams?.['friends-q']] ?? '',
	});

	const { data: currentUser, isLoading: isLoadingCurrentUser } = useQuery<IUserResponse>({
		queryFn: async () => await getCurrentUser(props.accessToken?.value ?? ''),
		queryKey: ['current-user'] ?? '',
	});

	const { data: currentFriends, isLoading: isLoadingCurrentFriends } = useQuery<
		IUser[] | undefined
	>({
		queryFn: async () => await getFriends(currentUser!.spotify_id ?? ''),
		queryKey: ['current-user-friends'] ?? '',
	});

	return (
		<main className="container p-4 relative">
			<Header
				isLoading={isLoadingCurrentUser}
				currentUser={currentUser}
				title="Friends list"
				description="View your friends and the artists they've seen live!"
			/>

			<FriendList
				isLoading={isLoadingCurrentFriends}
				user={currentUser}
				users={currentFriends}
			/>

			<Divider className="-mx-4" />
			<>
				<h2 className="text-2xl tmd:text-4xl font-bold  mt-2">Find new friends!</h2>
				<p className="text-sm mb-4  font-body text-secondary-content">
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
					isLoading={isLoadingQuery}
					user={currentUser}
					users={friendsSearchData?.filter(
						(user) =>
							!currentUser?.friends?.includes(user.id) && user.id !== currentUser?.id
					)}
				/>
			</>
		</main>
	);
}
