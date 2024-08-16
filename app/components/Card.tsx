'use client';

import Image from 'next/image';
import Tooltip from './Tooltip';

interface ICard {
	isLoading?: boolean;
	image: string;
	title: string;
	description: string;
	icon?: React.ReactNode;
	onClick: () => Promise<void>;
}

export default function Card(props: ICard) {
	const { isLoading = false } = props;

	return (
		<div
			onClick={props.onClick}
			className={`card rounded-lg  transition-all relative ${
				!isLoading && 'hover:scale-105 cursor-pointer '
			}`}
		>
			<div className={`z-20 relative ${props.isLoading && 'skeleton'}`}>
				{props.icon && props.icon}
			</div>
			<div
				className={`absolute top-0 left-0 right-0 aspect-square w-full rounded-md opacity-25 z-10 bg-neutral-300`}
			></div>

			{isLoading ? (
				<div className="aspect-square w-full rounded-md skeleton" />
			) : props.image ? (
				<Image
					priority
					sizes="192px"
					height={192}
					width={192}
					className=" aspect-square w-full rounded-md bg-base-200 object-cover"
					src={props.image}
					alt={props.title}
				/>
			) : null}

			<div className="p-2">
				<h3 className={`line-clamp-1 ${props.isLoading && 'skeleton w-full h-4'}`}>
					{!props.isLoading ? props.title : null}
				</h3>
				<p className={`text-sm ${props.isLoading && 'skeleton w-3/4 h-4 mt-2'}`}>
					{!props.isLoading ? props.description : null}
				</p>
			</div>
		</div>
	);
}
