'use client';
import { IUser, IUserResponse } from '@/models/user';
import { useQuery } from '@tanstack/react-query';
import { getCurrentUser, getFriends, getUsers } from '../actions';
import Divider from '../components/Divider';
import FriendList from '../components/FriendList';
import Header from '../components/Header';
import Search from '../components/Search';
import { Pagination } from '@/models/utils';

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

	const {
		data: currentUser,
		isLoading: isLoadingCurrentUser,
		refetch: refetchCurrentUser,
	} = useQuery<IUserResponse>({
		queryFn: async () => await getCurrentUser(props.accessToken?.value ?? ''),
		queryKey: ['current-user'] ?? '',
	});

	const {
		data: currentFriends,
		isLoading: isLoadingCurrentFriends,
		refetch: refetchCurrentFriends,
	} = useQuery<Pagination<IUser> | undefined>({
		queryFn: async () =>
			await getFriends(
				currentUser!.spotify_id ?? '',
				props.searchParams?.friendsPageNum ?? 1,
				props.searchParams?.friendsPerPage ?? 10
			),
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
				type="list"
				isLoading={isLoadingCurrentFriends}
				user={currentUser}
				users={currentFriends?.results}
				onInvalidate={() => {
					refetchCurrentFriends();
					refetchCurrentUser();
				}}
			/>

			<Divider className="-mx-4" />
			<>
				<h2 className="text-2xl tmd:text-4xl font-bold  mt-2">Find new friends!</h2>
				<p className="text-sm mb-4  font-body text-secondary-content">
					Search for friends by their Spotify username to view what bands and festivals
					they&apos;ve been to.
				</p>
				<Search
					className="mb-8 max-w-xs"
					id="friends-q"
					disableNavigation
					placeholder="Search for friends..."
				/>

				<FriendList
					type="grid"
					isLoading={isLoadingQuery}
					user={currentUser}
					users={friendsSearchData?.filter(
						(user) =>
							!currentUser?.friends?.includes(user.id) && user.id !== currentUser?.id
					)}
					onInvalidate={() => {
						refetchCurrentFriends();
						refetchCurrentUser();
					}}
				/>
			</>
		</main>
	);
}
