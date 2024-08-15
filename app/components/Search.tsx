'use client';

import { faClose, faSearch } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ISearch {
	className?: string;
	onSearch?: (search: string) => void;
	variant?: 'light' | 'dark';
	id: string;
	disableNavigation?: boolean;
	placeholder?: string;
}

export default function Search(props: ISearch) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const search = searchParams.get(props.id);
	const [searchValue, setSearchValue] = useState(search ?? '');

	//This is needed due to an edge case where the search value is not updated
	useEffect(() => {
		setSearchValue(search ?? '');
	}, [search]);

	const createQueryString = (name: string, value: string) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set(name, value);

		return params.toString();
	};

	return (
		<div className={`${!!props.className && props.className} relative group `}>
			<input
				className={`container font-body text-sm pl-10 p-4 w-full max-w-full rounded-full ${
					props.variant === 'light' ? 'bg-base' : 'bg-base-200'
				}  prose focus:outline-none focus:ring-2 border border-primary-content group-hover:border-primary ring-primary focus:ring-primary-500 focus:ring-opacity-50 `}
				value={searchValue}
				type="text"
				placeholder={props.placeholder ?? 'Search for an artist...'}
				onChange={(e) => {
					setSearchValue(e.target.value);
					router.push(pathname + '?' + createQueryString(props.id, e.target.value));

					if (!props.disableNavigation) {
						if (pathname !== '/') {
							router.push(`/?${props.id}=${e.target.value}`, {
								scroll: false,
							});
						}
					}
					props?.onSearch?.(e.target.value);
				}}
			/>
			<FontAwesomeIcon
				icon={faSearch}
				className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-content group-hover:text-secondary-content"
			/>
			<div
				onClick={() => {
					setSearchValue('');
					router.push(pathname + '?' + createQueryString(props.id, ''));
				}}
				className={`p-4 cursor-pointer absolute right-1 top-1/2 transform -translate-y-1/2 ${
					!!search ? 'block' : 'hidden'
				}`}
			>
				<FontAwesomeIcon icon={faClose} className={`  cursor-pointer `} />
			</div>
		</div>
	);
}
