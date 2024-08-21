import ListPage from '@/app/containers/ListPage';
import { cookies } from 'next/headers';

export default async function List({ params, searchParams }: { params: any; searchParams: any }) {
	const accessToken = cookies().get('spotify_access_token');

	return <ListPage searchParams={searchParams} accessToken={accessToken} />;
}
