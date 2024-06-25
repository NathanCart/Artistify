'use client';

import { useState } from 'react';

interface ITooltip {
	className?: string;
	text: string;
	children: React.ReactNode;
}

export default function Tooltip(props: ITooltip) {
	const [show, setShow] = useState(false);
	return (
		<div
			onMouseOver={() => setShow(true)}
			onMouseLeave={() => setShow(false)}
			className={`${!!props.className ? props.className : ''} relative`}
		>
			<div
				className={`text-nowrap opacity-0 pointer-events-none absolute z-50 top-6 left-1 transition-all bg-neutral-900 text-neutral-50 p-2 rounded-md text-xs ${
					show && 'opacity-90 pointer-events-auto'
				}`}
			>
				{props.text}
			</div>
			{props.children}
		</div>
	);
}
