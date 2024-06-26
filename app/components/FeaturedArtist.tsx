'use client';

import Image from 'next/image';
import Chip from './Chip';
//@ts-ignore
import commaNumber from 'comma-number';

interface IFeaturedArtist {
	artist: IArtist;
	className?: string;
}

export default function FeaturedArtist(props: IFeaturedArtist) {
	return (
		<div className={`grid grid-cols-12 gap-6 ${!!props.className && props.className}`}>
			<div className="col-span-12 md:col-span-6 lg:col-span-4">
				<div className="bg-neutral-800 p-4 rounded-md">
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
					<p className="text-sm  text-neutral-400">
						{commaNumber(props?.artist?.followers?.total)} Followers
					</p>
				</div>
			</div>
		</div>
	);
}
