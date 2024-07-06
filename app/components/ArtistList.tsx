'use client';

import { cookies } from 'next/headers';
import { AddArtistToList } from '../actions';
import Card from './Card';
//@ts-ignore
import commaNumber from 'comma-number';
import { IUserResponse } from '@/models/user';
interface IArtistList {
	artists: IArtist[];
	className?: string;
	user: IUserResponse;
}

export default function ArtistList(props: IArtistList) {
	return (
		<div className={`grid grid-cols-12 gap-6 ${!!props.className && props.className}`}>
			{props.artists?.map((artist) => (
				<div className="grid col-span-6 sm:col-span-3 lg:col-span-2" key={artist.id}>
					<Card
						onClick={async () => {
							const response = await AddArtistToList({
								artistId: artist.id,
								spotifyId: props.user?.spotify_id ?? '',
							});
							console.log(response, 'response data');
						}}
						image={
							artist.images[0]?.url ??
							'https://static.thenounproject.com/png/212110-200.png'
						}
						title={artist.name}
						description={`${commaNumber(artist.followers.total)} Followers`}
					/>
				</div>
			))}
		</div>
	);
}
