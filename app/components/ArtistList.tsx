'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Card from './Card';

interface IArtistList {
	artists: IArtist[];
}

export default function ArtistList(props: IArtistList) {
	return (
		<div>
			{/* <h1>Lists</h1> */}
			<h2 className="mb-4">Artists</h2>
			<div className="grid grid-cols-12 gap-6">
				{!props.artists?.length ? (
					<>No artists found...</>
				) : (
					props.artists?.map((artist) => (
						<div
							className="grid col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-3 xl:col-span-2"
							key={artist.id}
						>
							<Card
								image={
									artist.images[0]?.url ??
									'https://static.thenounproject.com/png/212110-200.png'
								}
								title={artist.name}
								description={`Followers: ${artist.followers.total}`}
							/>
						</div>
					))
				)}
			</div>
		</div>
	);
}
