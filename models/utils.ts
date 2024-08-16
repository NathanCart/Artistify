export type Pagination<T> = {
	results: T[];
	count: number;
	next: string;
	previous: string;
};
