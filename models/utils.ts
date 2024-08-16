export type Pagination<T> = {
	results: T[];
	count: number;
	total_pages: number;
	next: string;
	previous: string;
};
