'use client';
import { IUser, IUserResponse } from '@/models/user';
import { QueryFunction, QueryKey, useInfiniteQuery, useQuery } from '@tanstack/react-query';
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
		error,
		isLoading: isLoadingQuery,
		fetchNextPage,
		hasNextPage,
		refetch,
		isFetching,

		isFetchingNextPage,
		status,
	} = useInfiniteQuery<Pagination<IUser>>({
		queryKey: ['friends', props?.searchParams?.['friends-q']] ?? '',
		// `pageParam` is destructured and used to fetch the correct page
		queryFn: async ({
			pageParam,
		}: {
			pageParam: unknown | QueryFunction<Pagination<IUser>, QueryKey, unknown> | undefined;
		}) => {
			return await getUsers(
				props.searchParams['friends-q'], // Search query parameter
				pageParam as number, // Dynamic page number from `pageParam`
				props.searchParams?.friendsQPerPage ?? 18 // Items per page
			);
		},
		initialPageParam: 1,
		getNextPageParam: (lastPage, pages) => {
			if (pages.length < lastPage.total_pages) {
				return pages.length + 1;
			}
			return undefined; // No more pages
		},
	});

	const hasSearchedAllPages =
		friendsSearchData?.pages?.length === friendsSearchData?.pages?.[0].total_pages;

	const hasNoResults = friendsSearchData?.pages?.[0].results.length === 0;

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
		queryKey: [`current-user-friends-${props.searchParams?.friendsPageNum}`] ?? '',
	});

	const formattedFriendsPages = friendsSearchData?.pages?.map((page) => page.results).flat();

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
				currentPage={props.searchParams?.friendsPageNum ?? 1}
				totalPages={currentFriends?.total_pages ?? 1}
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
					currentPage={friendsSearchData?.pages.length ?? 1}
					totalPages={friendsSearchData?.pages?.[0].total_pages ?? 1}
					hasNextPage={hasNextPage}
					onLoadMore={async () => {
						console.log('load more');
						await fetchNextPage();
						refetch();
					}}
					type="grid"
					isLoading={isLoadingQuery}
					user={currentUser}
					users={formattedFriendsPages?.filter?.(
						(user) =>
							!currentUser?.friends?.includes(user.id) && user.id !== currentUser?.id
					)}
					onInvalidate={() => {
						refetchCurrentFriends();
						refetchCurrentUser();
					}}
				/>
				<div className="my-4">
					{isFetchingNextPage ? (
						<div className="flex gap-1 items-center justify-center">
							<p className="text-center font-bold ">Loading more</p>
							<span className="loading loading-dots loading-xs"></span>
						</div>
					) : null}
					{hasSearchedAllPages && !isLoadingQuery && !hasNoResults ? (
						<p className="text-center font-bold ">Showing all results!</p>
					) : null}

					{hasNoResults && !isLoadingQuery ? (
						<p className="text-center font-bold ">No results found!</p>
					) : null}
				</div>
			</>
		</main>
	);
}
