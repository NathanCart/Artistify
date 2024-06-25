'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

interface ISearch {
	className?: string;
	onSearch?: (search: string) => void;
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
		<input
			className="container rounded-md p-2 w-full bg-neutral-800 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
			value={searchValue}
			type="text"
			placeholder="Search..."
			onChange={(e) => {
				setSearchValue(e.target.value);
				router.push(pathname + '?' + createQueryString('q', e.target.value));

				props?.onSearch?.(e.target.value);
			}}
		/>
	);
}
