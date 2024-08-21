'use client';
interface IInfiniteLoaderText {
	enabled: boolean;
	isFetchingNextPage: boolean;
	hasSearchedAllPages: boolean;
	isLoadingQuery: boolean;
	hasNoResults: boolean;
}

export default function InfiniteLoaderText(props: IInfiniteLoaderText) {
	if (!props.enabled) return null;
	return (
		<div className="my-4">
			{props.isFetchingNextPage || props.isLoadingQuery ? (
				<div className="flex gap-1 items-center justify-center">
					<p className="text-center font-bold ">Loading</p>
					<span className="loading loading-dots loading-xs"></span>
				</div>
			) : null}
			{props.hasSearchedAllPages && !props.isLoadingQuery && !props.hasNoResults ? (
				<p className="text-center font-bold ">Showing all results!</p>
			) : null}

			{props.hasNoResults && !props.isLoadingQuery ? (
				<p className="text-center font-bold ">No results found!</p>
			) : null}
		</div>
	);
}
