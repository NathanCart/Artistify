'use client';
import { useQueryClient } from '@tanstack/react-query';

export default function useInvalidateQuery() {
	const queryClient = useQueryClient();

	const invalidateQuery = async (queries: string[]) => {
		return await queryClient.invalidateQueries({ queryKey: queries });
	};
	return invalidateQuery;
}
