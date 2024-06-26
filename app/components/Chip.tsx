'use client';

interface IChip {
	className?: string;
	text: string | React.ReactNode;
	startIcon?: React.ReactNode;
	disableAnimation?: boolean;
}

export default function Chip(props: IChip) {
	return (
		<div
			className={`flex gap-1 max-w-full rounded-full p-4 flex-wrap bg-red-500 px-4 py-1${
				!!props.className ? props.className : ''
			} relative`}
		>
			{props.startIcon}
			<p className="line-clamp-1 text-neutral-900 font-extrabold font-sans text-sm md:text-md ">
				{' '}
				{props.text}
			</p>
		</div>
	);
}
