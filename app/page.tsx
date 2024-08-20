import { cookies } from 'next/headers';
import { getArtists, getCurrentUser } from './actions';
import HomePage from './containers/HomePage';
import { IUserResponse } from '@/models/user';

export default async function Home({ params, searchParams }: { params: any; searchParams: any }) {
	const accessToken = cookies().get('spotify_access_token');

	return <HomePage accessToken={accessToken} searchParams={searchParams} />;
}
