'use client';

//@ts-ignore
import { IUserResponse } from '@/models/user';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ArtlistListCard from './ArtlistListCard';
interface IArtistList {
	artists: IArtist[] | undefined;
	className?: string;
	user: IUserResponse | undefined;
	hasNextPage?: boolean;
	onLoadMore?: () => void;
	currentPage: number;
}

export default function ArtistList(props: IArtistList) {
	const activeArtists = props.user?.artists?.filter((artist) =>
		props.artists?.map((a) => a.id).includes(artist.id)
	);

	const [hoveredArtist, setHoveredArtist] = useState<number | null>(null);

	if (!props.artists) return null;
	return (
		<InfiniteScroll
			loader={<></>}
			scrollableTarget="scrollableDiv"
			className={`grid grid-cols-12 gap-2 md:gap-6 ${!!props.className && props.className}`}
			dataLength={props.artists?.length ?? 0} //This is important field to render the next data
			next={() => props.onLoadMore?.()}
			hasMore={props.hasNextPage ?? false}
		>
			{props.artists?.map((artist, index) => {
				const isActive = activeArtists?.map((a) => a.id).includes(artist.id);
				const isHovered = hoveredArtist === index;
				return (
					<ArtlistListCard
						key={index}
						isActive={isActive}
						isHovered={isHovered}
						onMouseLeave={() => {
							setHoveredArtist(null);
						}}
						onMouseOver={() => {
							setHoveredArtist(index);
						}}
						artist={artist}
						user={props.user}
					/>
				);
			})}
		</InfiniteScroll>
	);
}
