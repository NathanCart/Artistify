'use client';

import { getCurrentUser } from '@/app/actions';
import { IUserResponse } from '@/models/user';
import { useQuery } from '@tanstack/react-query';

export default function useAuth({
	accessToken,
}: {
	accessToken: { value: string; name: string } | undefined;
}) {
	const {
		data: currentUser,
		isLoading: isLoadingCurrentUser,
		refetch: refetchCurrentUser,
	} = useQuery<IUserResponse>({
		queryFn: async () => await getCurrentUser(accessToken?.value ?? ''),
		queryKey: ['current-user'] ?? '',
	});

	return { currentUser, isLoadingCurrentUser, refetchCurrentUser };
}
