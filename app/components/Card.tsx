'use client';

import Image from 'next/image';
import Tooltip from './Tooltip';

interface ICard {
	image: string;
	title: string;
	description: string;
}

export default function Card(props: ICard) {
	const charsInTitle = props.title.length;

	return (
		<div className="card rounded-lg">
			{props.image && (
				<Image
					priority
					sizes="192px"
					height={192}
					width={192}
					className=" aspect-square w-full rounded-md bg-neutral-800"
					src={props.image}
					alt={props.title}
				/>
			)}

			<div className="p-2">
				<h3 className="line-clamp-1">{props.title}</h3>
				<p className="text-neutral-400">{props.description}</p>
			</div>
		</div>
	);
}
