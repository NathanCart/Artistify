import { cookies } from 'next/headers';
import { getCurrentUser, getFriends, getUsers } from '../actions';
import ListPage from '../containers/ListPage';
import FriendsPage from '../containers/FriendsPage';
import { IUser, IUserResponse } from '@/models/user';

export default async function Home({ params, searchParams }: { params: any; searchParams: any }) {
	const accessToken = cookies().get('spotify_access_token');

	const [userResults, currentUser]: [IUser[], IUserResponse] = await Promise.all([
		getUsers(searchParams['friends-q']),
		getCurrentUser(accessToken?.value ?? ''),
	]);

	const friends = await getFriends(currentUser.spotify_id);

	return (
		<FriendsPage
			friends={friends}
			userResults={userResults}
			currentUser={currentUser}
			searchParams={searchParams}
		/>
	);
}
