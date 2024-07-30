'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface IAvatar {
	className?: string;
	src: string;
	alt: string;
}

export default function Avatar(props: IAvatar) {
	const [open, setOpen] = useState(false);

	return (
		<div className={`${!!props.className ? props.className : ''} relative`}>
			<div
				onClick={() => setOpen((prev) => !prev)}
				className="flex gap-2 fixed top-6 right-6  items-center group cursor-pointer "
			>
				<div
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						console.log('click');
						setOpen(false);
					}}
					className={`${
						open ? 'fixed' : 'hidden'
					} h-screen w-screen top-0 left-0 cursor-default`}
				></div>

				<div
					className={`bg-neutral-600 w-fit right-1/3  top-10 p-2 ${
						open ? 'absolute' : 'hidden'
					}`}
					tabIndex={0}
				>
					<Link href="/profile">
						<p className="text-neutral-100 p-2">Profile</p>
					</Link>
					<Link href="/logout">
						<p className="text-neutral-100 p-2">Logout</p>
					</Link>
				</div>
				<Image
					className="rounded-full "
					src={props.src}
					alt={props.alt}
					width={40}
					height={40}
				/>
			</div>
		</div>
	);
}
