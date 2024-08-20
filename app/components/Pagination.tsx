'use client';
import useParam from '@/hooks/useParam';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

interface IPagination {
	className?: string;
	totalPages: number;
	currentPage: number;
	id: string;
	onPageChange?: (page: number) => void;
}

export default function Pagination(props: IPagination) {
	const { setParam } = useParam();

	if (props.totalPages === 1) return null;
	return (
		<div className={`join grid grid-cols-2 max-w-80 ${props.className}`}>
			<button
				disabled={Number(props.currentPage) === 1}
				onClick={() => {
					if (Number(props.currentPage) === 1) return;

					setParam(
						`${!!props.id ? `${props.id}PageNum` : 'pageNum'}`,
						Number(props.currentPage) - 1 + ''
					);

					props.onPageChange?.(Number(props.currentPage) - 1);
				}}
				className="join-item btn btn-outline"
			>
				Previous page
			</button>
			<button
				disabled={Number(props.currentPage) === props.totalPages}
				onClick={() => {
					if (Number(props.currentPage) === props.totalPages) return;

					setParam(
						`${!!props.id ? `${props.id}PageNum` : 'pageNum'}`,
						Number(props.currentPage) + 1 + ''
					);

					props.onPageChange?.(Number(props.currentPage) - 1);
				}}
				className="join-item btn btn-outline"
			>
				Next
			</button>
		</div>
	);
}
