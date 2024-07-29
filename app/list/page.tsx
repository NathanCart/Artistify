import { cookies } from 'next/headers';
import { getCurrentUser } from '../actions';
import ListPage from '../containers/ListPage';
import FriendsPage from '../containers/FriendsPage';

export default async function Home({ params, searchParams }: { params: any; searchParams: any }) {
	const accessToken = cookies().get('spotify_access_token');
	const currentUser = await getCurrentUser(accessToken?.value ?? '');

	return <ListPage currentUser={currentUser} searchParams={searchParams} />;
}
