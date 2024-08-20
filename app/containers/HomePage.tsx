'use client';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import { getArtists, getCurrentUser } from '../actions';
import ArtistList from '../components/ArtistList';
import Avatar from '../components/Avatar';
import FeaturedArtist from '../components/FeaturedArtist';
import Search from '../components/Search';
import { IUser, IUserResponse } from '@/models/user';
import Header from '../components/Header';
import { QueryFunction, QueryKey, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { Pagination } from '@/models/utils';
import useAuth from '@/hooks/useAuth';
import InfiniteLoaderText from '../components/InfiniteLoaderText';

interface IHomePage {
	searchParams: any;
	// currentUser: IUserResponse;
	// artists: IArtistsResponse;
	accessToken: { value: string; name: string } | undefined;
}

export default function HomePage({ searchParams, accessToken }: IHomePage) {
	const hasSearch = !!searchParams?.q;

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
	} = useInfiniteQuery<IArtistsResponse>({
		queryKey: ['artists', searchParams?.q] ?? '',
		// `pageParam` is destructured and used to fetch the correct page
		queryFn: async ({
			pageParam,
		}: {
			pageParam:
				| unknown
				| QueryFunction<Pagination<IArtistsResponse>, QueryKey, unknown>
				| undefined;
		}) => {
			return await getArtists({
				q: searchParams?.q,
				type: searchParams?.type,
				accessToken: accessToken?.value ?? '',
				pageNum: pageParam as number,
			});
		},
		initialPageParam: 1,
		getNextPageParam: (lastPage, pages) => {
			if (pages.length < lastPage.artists?.total) {
				return pages.length + 1;
			}
			return undefined; // No more pages
		},
		enabled: !!searchParams?.q,
	});

	const artists = artistsData?.pages?.map((page) => page.artists?.items).flat();

	const hasSearchedAllPages =
		artistsData?.pages?.[artistsData?.pages?.length - 1].artists?.next === null;

	const hasNoResults = !artists?.length;

	return (
		<main className="container p-4 relative">
			<Header
				currentUser={currentUser}
				title={`Welcome, ${currentUser?.spotify_data?.display_name}`}
				description="Save artists and bands you've seen live to never forget!"
			/>
			{!hasSearch && (
				<>
					<h2 className="mb-4 mt-8 md:hidden block">Search for an artist</h2>
				</>
			)}
			<Avatar
				isLoading={isLoadingCurrentUser}
				src={currentUser?.spotify_data?.images?.[1]?.url ?? ''}
				alt={currentUser?.spotify_data?.display_name ?? ''}
			/>
			<Suspense fallback={<div>Loading...</div>}>
				<Search id="q" className="w-full  max-w-full md:hidden block" />
			</Suspense>
			{!hasNoResults ? <h2 className="mb-4 mt-8">Top result</h2> : null}
			<FeaturedArtist artist={artists?.[0]} user={currentUser} />{' '}
			{!hasNoResults ? <h2 className="mb-4 mt-8">Artists</h2> : null}
			<ArtistList
				currentPage={artistsData?.pages.length ?? 1}
				hasNextPage={hasNextPage}
				onLoadMore={async () => {
					console.log('load more');
					await fetchNextPage();
					refetch();
				}}
				user={currentUser}
				className=""
				artists={artists?.slice(1, artists?.length)}
			/>
			<InfiniteLoaderText
				{...{
					enabled: !!searchParams?.q,
					isFetchingNextPage,
					hasSearchedAllPages,
					isLoadingQuery,
					hasNoResults,
				}}
			/>
		</main>
	);
}
