'use client';

import Card from './Card';
//@ts-ignore
import commaNumber from 'comma-number';
interface IArtistList {
	artists: IArtist[];
	className?: string;
}

export default function ArtistList(props: IArtistList) {
	return (
		<div className={`grid grid-cols-12 gap-6 ${!!props.className && props.className}`}>
			{props.artists?.map((artist) => (
				<div className="grid col-span-6 sm:col-span-3 lg:col-span-2" key={artist.id}>
					<Card
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
