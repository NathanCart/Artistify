import { cookies } from 'next/headers';
import FriendsPage from '../containers/FriendsPage';

export default async function Friends({
	params,
	searchParams,
}: {
	params: any;
	searchParams: any;
}) {
	const accessToken = cookies().get('spotify_access_token');

	return <FriendsPage accessToken={accessToken} searchParams={searchParams} />;
}
