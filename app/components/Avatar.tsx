'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface IAvatar {
	className?: string;
	src: string;
	alt: string;
	isLoading?: boolean;
}

export default function Avatar(props: IAvatar) {
	const [open, setOpen] = useState(false);

	const { isLoading = false } = props;

	return (
		<div className={`${!!props.className ? props.className : ''} relative `}>
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
					className={`bg-base-200 w-fit right-1/3 top-10 p-2 prose ${
						open ? 'absolute' : 'hidden'
					}`}
					tabIndex={0}
				>
					<Link href="/profile">
						<p className="m-0">Profile</p>
					</Link>
					<Link href="/logout">
						<p className="m-0">Logout</p>
					</Link>
				</div>
				<div className={`${props.isLoading && 'skeleton'} w-[40px] h-[40px] rounded-full`}>
					{!isLoading ? (
						<Image
							className="rounded-full m-0"
							src={props.src}
							alt={props.alt}
							width={40}
							height={40}
						/>
					) : null}
				</div>
			</div>
		</div>
	);
}
