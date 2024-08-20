'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function useParam() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	const createQueryString = (name: string, value: string) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set(name, value);

		return params.toString();
	};

	const setParam = (id: string, value: string) => {
		router.push(pathname + '?' + createQueryString(id, value));
	};

	return { setParam };
}
