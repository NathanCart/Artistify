'use client';

import Image from 'next/image';
import Chip from './Chip';
//@ts-ignore
import commaNumber from 'comma-number';
import { IUserResponse } from '@/models/user';
import { AddArtistToList, RemoveArtistFromList, RevalidateTags } from '../actions';
import Tooltip from './Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faSquareCheck, faSquareXmark } from '@fortawesome/pro-duotone-svg-icons';
import { useState } from 'react';

interface IFeaturedArtist {
	artist: IArtist;
	className?: string;
	user: IUserResponse;
}

export default function FeaturedArtist(props: IFeaturedArtist) {
	const isActive = props.user.artists?.map((a) => a.id).includes(props.artist.id);
	const [hoveredArtist, setHoveredArtist] = useState<boolean | null>(null);

	return (
		<div
			onClick={async () => {
				if (isActive) {
					const response = await RemoveArtistFromList({
						artistId: props.artist.id,
						spotifyId: props.user?.spotify_id ?? '',
					});
				} else {
					const response = await AddArtistToList({
						artistId: props.artist.id,
						spotifyId: props.user?.spotify_id ?? '',
					});
				}
				RevalidateTags({ tags: ['user', 'artists'] });
			}}
			className={`grid grid-cols-12 gap-6 ${!!props.className && props.className} `}
		>
			<div className="col-span-12 md:col-span-6 lg:col-span-4">
				<div
					className="bg-base-200 p-4 rounded-md cursor-pointer hover:scale-105 transition-all relative"
					onMouseOver={() => setHoveredArtist(true)}
					onMouseLeave={() => setHoveredArtist(null)}
				>
					<Tooltip
						text={isActive ? 'Remove from your list' : 'Add to your list'}
						className="!absolute left-6 top-6 "
					>
						<FontAwesomeIcon
							className="text-secondary"
							size="2x"
							icon={
								isActive && hoveredArtist
									? faSquareXmark
									: hoveredArtist || isActive
									? faSquareCheck
									: faSquare
							}
						/>
					</Tooltip>
					<Image
						className="rounded-sm"
						src={props?.artist?.images?.[0]?.url ?? ''}
						width={150}
						height={150}
						alt={`Image of ${props?.artist?.name}`}
					/>
					<div className="flex gap-2 mt-4 flex-wrap">
						{props?.artist?.genres?.length ? (
							<>
								{props?.artist?.genres?.map((genre, index) => {
									return <Chip key={index} text={genre} />;
								})}
							</>
						) : (
							<></>
						)}
					</div>
					<p className="text-lg md:text-xl font-extralight font-sans mt-2">
						{props?.artist?.name}
					</p>
					<p className="text-sm ">
						{commaNumber(props?.artist?.followers?.total)} Followers
					</p>
				</div>
			</div>
		</div>
	);
}
