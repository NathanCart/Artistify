import Link from 'next/link';
import { Suspense } from 'react';
import Search from './Search';

export default function Sidebar() {
	return (
		<div className="sidebar lg:left-0 max-w-0 min-w-0 md:min-w-[300px] duration-500 transition-all overflow-hidden">
			<div className="fixed h-screen top-1/2 translate -translate-y-1/2  left-0 min-w-0 md:min-w-[300px] max-w-0 duration-500 transition-all md:max-w-full overflow-y-auto text-center bg-neutral-800 p-2 px-0 md:px-2 whitespace-nowrap">
				<p className="text-lg mt-4 px-4 font-sans font-extrabold">Artistify</p>
				<Suspense fallback={<div>Loading...</div>}>
					<Search className="w-full  max-w-full mt-4" variant="light" />
				</Suspense>
				<ul className="text-start p-4 flex flex-col gap-2">
					<li className="">
						<Link href="/list" className="text-neutral-50 hover:text-red-300">
							My list
						</Link>
					</li>
					<li className="">
						<a href="/about" className="text-neutral-50 hover:text-red-300">
							About
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
}
