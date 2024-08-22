import { cookies } from 'next/headers';
import HomePage from './containers/HomePage';

export default async function Home({ params, searchParams }: { params: any; searchParams: any }) {
	const accessToken = cookies().get('spotify_access_token');

	return <HomePage accessToken={accessToken} searchParams={searchParams} />;
}
