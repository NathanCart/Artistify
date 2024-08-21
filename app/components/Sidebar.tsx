'use client';
import Link from 'next/link';
import { Suspense } from 'react';
import Search from './Search';

export default function Sidebar() {
	return (
		<div className="sidebar lg:left-0 max-w-0 min-w-0 md:min-w-[300px] duration-500 transition-all overflow-hidden">
			<div className="fixed h-screen top-1/2 translate -translate-y-1/2  left-0 min-w-0 md:min-w-[300px] max-w-0 duration-500 transition-all md:max-w-full overflow-y-auto text-center bg-base-200 p-2 px-0 md:px-2 whitespace-nowrap">
				<p className="text-lg mt-4 px-4 font-sans font-extrabold">
					<Link href="/">Artistszee</Link>
				</p>

				<Suspense fallback={<div>Loading...</div>}>
					<Search id="q" className="w-full  max-w-full mt-4" variant="light" />
				</Suspense>

				<ul className="join join-vertical w-full rounded-sm mt-4 ">
					<Link href="/" className="btn join-item justify-start">
						<li className="">Home</li>
					</Link>

					<Link href="/list" className="btn join-item justify-start">
						<li className="">My List</li>
					</Link>
					<Link href="/friends" className="btn join-item justify-start">
						<li className="">Friends</li>
					</Link>
				</ul>
			</div>
		</div>
	);
}
