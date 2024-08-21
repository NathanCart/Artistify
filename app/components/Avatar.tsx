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
		<div className={`${!!props.className ? props.className : ''} relative z-50`}>
			<div
				onClick={() => setOpen((prev) => !prev)}
				className="flex gap-2 fixed top-6 right-6  items-center group cursor-pointer "
			>
				<div
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						setOpen(false);
					}}
					className={`${
						open ? 'fixed' : 'hidden'
					} h-screen w-screen top-0 left-0 cursor-default`}
				></div>

				<div
					className={`bg-base-200 w-fit right-1/3 top-10 p-2 prose  ${
						open ? 'absolute' : 'hidden'
					}`}
					tabIndex={0}
				>
					<Link href="/" className="no-underline">
						<p className="m-0 ">Home</p>
					</Link>
					<Link href="/list" className="no-underline">
						<p className="m-0 ">List</p>
					</Link>
					<Link href="/friends" className="no-underline">
						<p className="m-0 ">Friends</p>
					</Link>
				</div>
				<div className={`${props.isLoading && 'skeleton'} w-[40px] h-[40px] rounded-full`}>
					{!isLoading ? (
						<Image
							className="rounded-full m-0"
							src={
								props.src ?? 'https://static.thenounproject.com/png/212110-200.png'
							}
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
