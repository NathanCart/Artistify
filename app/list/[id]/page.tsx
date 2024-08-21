import ListPage from '@/app/containers/ListPage';
import ListPageSlug from '@/app/containers/ListPageSlug';
import { cookies } from 'next/headers';

export default async function List({ params, searchParams }: { params: any; searchParams: any }) {
	const accessToken = cookies().get('spotify_access_token');

	return (
		<ListPageSlug searchParams={searchParams} accessToken={accessToken} spotifyId={params.id} />
	);
}
