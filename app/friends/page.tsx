import { cookies } from 'next/headers';
import { getCurrentUser, getUsers } from '../actions';
import ListPage from '../containers/ListPage';
import FriendsPage from '../containers/FriendsPage';
import { IUser } from '@/models/user';

export default async function Home({ params, searchParams }: { params: any; searchParams: any }) {
	const accessToken = cookies().get('spotify_access_token');
	const currentUser = await getCurrentUser(accessToken?.value ?? '');
	const userResults: IUser[] = await getUsers(searchParams['friends-q']);

	return (
		<FriendsPage
			userResults={userResults}
			currentUser={currentUser}
			searchParams={searchParams}
		/>
	);
}
