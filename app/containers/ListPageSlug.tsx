'use client';
import useAuth from '@/hooks/useAuth';
import { Pagination } from '@/models/utils';
import { QueryFunction, QueryKey, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import { RevalidateTags, getUser, getUserArtists } from '../actions';
import ArtistList from '../components/ArtistList';
import Header from '../components/Header';
import Search from '../components/Search';
import InfiniteLoaderText from '../components/InfiniteLoaderText';
import { useRouter } from 'next/router';
import { IUserResponse } from '@/models/user';

interface IListPageSlug {
	searchParams: any;
	accessToken: { value: string; name: string } | undefined;
	spotifyId: string;
}

export default function ListPageSlug({ searchParams, accessToken, spotifyId }: IListPageSlug) {
	const {
		data: foundUser,
		isLoading: isLoadingCurrentUser,
		refetch: refetchCurrentUser,
	} = useQuery<IUserResponse>({
		queryFn: async () => await getUser(spotifyId),
		queryKey: ['user'] ?? '',
		enabled: !!spotifyId,
	});

	const {
		data: artistsData,
		error,
		isLoading: isLoadingQuery,
		fetchNextPage,
		hasNextPage,
		refetch,
		isFetching,
		isFetchingNextPage,
		status,
	} = useInfiniteQuery<Pagination<IArtist>>({
		queryKey: [`list-${spotifyId}`] ?? '',
		// `pageParam` is destructured and used to fetch the correct page
		queryFn: async ({
			pageParam,
		}: {
			pageParam: unknown | QueryFunction<Pagination<IArtist>, QueryKey, unknown> | undefined;
		}) => {
			return await getUserArtists({
				accessToken: accessToken?.value ?? '',
				pageNum: pageParam as number,
				spotifyId: spotifyId,
			});
		},
		initialPageParam: 1,
		getNextPageParam: (lastPage, pages) => {
			if (pages.length < lastPage?.total_pages) {
				return pages.length + 1;
			}
			return undefined; // No more pages
		},
		enabled: !!spotifyId,
	});

	const artists = artistsData?.pages?.map((page) => page.results).flat();

	const hasSearchedAllPages = artistsData?.pages?.[artistsData?.pages?.length - 1]?.next === null;

	const hasNoResults = !artistsData?.pages?.[0]?.results?.length;

	return (
		<main className="container p-4 relative">
			<Header
				isLoading={isLoadingCurrentUser}
				currentUser={foundUser}
				title={`${foundUser?.display_name}'s list`}
				description={`${foundUser?.display_name}'s list of artists they have seen live.`}
			/>
			<Suspense fallback={<div>Loading...</div>}>
				<Search id="q" className="w-full  max-w-full md:hidden block" />
			</Suspense>
			<h2 className="mb-4 mt-8"></h2>
			{!hasNoResults ? (
				<ArtistList
					disableClick
					onChange={async () => {
						refetch();
					}}
					currentPage={artistsData?.pages.length ?? 1}
					hasNextPage={hasNextPage}
					onLoadMore={async () => {
						await fetchNextPage();
						refetch();
					}}
					user={foundUser}
					className=""
					artists={artists}
				/>
			) : null}

			<InfiniteLoaderText
				{...{
					enabled: !!foundUser,
					isFetchingNextPage,
					hasSearchedAllPages,
					isLoadingQuery,
					hasNoResults,
				}}
			/>
		</main>
	);
}
