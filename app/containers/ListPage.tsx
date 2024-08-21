'use client';
import useAuth from '@/hooks/useAuth';
import { Pagination } from '@/models/utils';
import { QueryFunction, QueryKey, useInfiniteQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import { RevalidateTags, getUserArtists } from '../actions';
import ArtistList from '../components/ArtistList';
import Header from '../components/Header';
import Search from '../components/Search';
import InfiniteLoaderText from '../components/InfiniteLoaderText';

interface IListPage {
	searchParams: any;
	accessToken: { value: string; name: string } | undefined;
}

export default function ListPage({ searchParams, accessToken }: IListPage) {
	const { currentUser, isLoadingCurrentUser } = useAuth({ accessToken });

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
		queryKey: ['list'] ?? '',
		// `pageParam` is destructured and used to fetch the correct page
		queryFn: async ({
			pageParam,
		}: {
			pageParam: unknown | QueryFunction<Pagination<IArtist>, QueryKey, unknown> | undefined;
		}) => {
			return await getUserArtists({
				accessToken: accessToken?.value ?? '',
				pageNum: pageParam as number,
				spotifyId: currentUser!.spotify_id,
			});
		},
		initialPageParam: 1,
		getNextPageParam: (lastPage, pages) => {
			if (pages.length < lastPage?.total_pages) {
				return pages.length + 1;
			}
			return undefined; // No more pages
		},
		enabled: !!currentUser,
	});

	const artists = artistsData?.pages?.map((page) => page.results).flat();

	const hasSearchedAllPages = artistsData?.pages?.[artistsData?.pages?.length - 1]?.next === null;

	const hasNoResults = !artistsData?.pages?.[0]?.results?.length;

	return (
		<main className="container p-4 relative">
			<Header
				isLoading={isLoadingCurrentUser}
				currentUser={currentUser}
				title="Artists you've seen!"
				description="Your list of artists you've seen live!"
			/>
			<Suspense fallback={<div>Loading...</div>}>
				<Search id="q" className="w-full  max-w-full md:hidden block" />
			</Suspense>
			<h2 className="mb-4 mt-8"></h2>
			{!hasNoResults ? (
				<ArtistList
					onChange={async () => {
						refetch();
					}}
					currentPage={artistsData?.pages.length ?? 1}
					hasNextPage={hasNextPage}
					onLoadMore={async () => {
						await fetchNextPage();
						refetch();
					}}
					user={currentUser}
					className=""
					artists={artists}
				/>
			) : null}

			<InfiniteLoaderText
				{...{
					enabled: !!currentUser,
					isFetchingNextPage,
					hasSearchedAllPages,
					isLoadingQuery,
					hasNoResults,
				}}
			/>
		</main>
	);
}
