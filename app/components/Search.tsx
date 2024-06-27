'use client';

import { faClose, faSearch } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

interface ISearch {
	className?: string;
	onSearch?: (search: string) => void;
	variant?: 'light' | 'dark';
}

export default function Search(props: ISearch) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [searchValue, setSearchValue] = useState(searchParams.get('q') ?? '');
	const search = searchParams.get('q');

	// This will not be logged on the server when using static rendering

	const createQueryString = (name: string, value: string) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set(name, value);

		return params.toString();
	};

	return (
		<div className={`${!!props.className && props.className} relative group `}>
			<input
				className={`container font-body text-sm pl-10 p-4 w-full max-w-full rounded-full ${
					props.variant === 'light' ? 'bg-neutral-600' : 'bg-neutral-800'
				}  text-neutral-100 focus:outline-none focus:ring-2 border border-neutral-900 group-hover:border-red-700 ring-red-500 focus:ring-primary-500 focus:ring-opacity-50 `}
				value={searchValue}
				type="text"
				placeholder="Search for an artist..."
				onChange={(e) => {
					setSearchValue(e.target.value);
					router.push(pathname + '?' + createQueryString('q', e.target.value));

					props?.onSearch?.(e.target.value);
				}}
			/>
			<FontAwesomeIcon
				icon={faSearch}
				className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-500 group-hover:text-neutral-300"
			/>
			<div
				onClick={() => {
					setSearchValue('');
					router.push(pathname + '?' + createQueryString('q', ''));
				}}
				className={`p-4 cursor-pointer absolute right-1 top-1/2 transform -translate-y-1/2 ${
					!!search ? 'block' : 'hidden'
				}`}
			>
				<FontAwesomeIcon icon={faClose} className={` text-neutral-300 cursor-pointer `} />
			</div>
		</div>
	);
}
