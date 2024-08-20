'use client';

import { cookies } from 'next/headers';
import { AddArtistToList, RemoveArtistFromList, RevalidateTags } from '../actions';
import Card from './Card';
//@ts-ignore
import commaNumber from 'comma-number';
import { IUserResponse } from '@/models/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faC, faCheck, faCube } from '@fortawesome/pro-solid-svg-icons';
import { faSquareCheck, faSquare, faSquareXmark } from '@fortawesome/pro-duotone-svg-icons';
import Tooltip from './Tooltip';
import { revalidateTag } from 'next/cache';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
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
					<div
						key={index}
						onMouseOver={() => setHoveredArtist(index)}
						onMouseLeave={() => setHoveredArtist(null)}
						className="grid col-span-6 sm:col-span-3 lg:col-span-2"
					>
						<Card
							icon={
								<Tooltip
									text={isActive ? 'Remove from your list' : 'Add to your list'}
									className="!absolute left-2 top-2 "
								>
									<FontAwesomeIcon
										className="text-neutral"
										size="2x"
										icon={
											isActive && isHovered
												? faSquareXmark
												: isHovered || isActive
												? faSquareCheck
												: faSquare
										}
									/>
								</Tooltip>
							}
							onClick={async () => {
								if (isActive) {
									const response = await RemoveArtistFromList({
										artistId: artist.id,
										spotifyId: props.user?.spotify_id ?? '',
									});
								} else {
									const response = await AddArtistToList({
										artistId: artist.id,
										spotifyId: props.user?.spotify_id ?? '',
									});
								}
								RevalidateTags({ tags: ['user', 'artists'] });
							}}
							image={
								artist.images[0]?.url ??
								'https://static.thenounproject.com/png/212110-200.png'
							}
							title={artist.name}
							description={`${commaNumber(artist.followers.total)} Followers`}
						/>
					</div>
				);
			})}
		</InfiniteScroll>
	);
}
