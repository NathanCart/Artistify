import Image from 'next/image';

export default async function Home() {
	const getArtists = async () => {
		const response = await fetch('https://api.spotify.com/v1/artists', {
			headers: {
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_SPOTIFY_API_SECRET}`,
			},
		});
		const data = await response.json();
		return data;
	};

	const artists = await getArtists();

	//   var state = generateRandomString(16);
	// var scope = 'user-read-private user-read-email';

	// response_type: 'code',
	//     client_id: client_id,
	//     scope: scope,
	//     redirect_uri: redirect_uri,
	//     state: state

	return (
		<main className="container">
			<h1>hello</h1>
			<a
				href={`https://accounts.spotify.com/authorize?client_id=${process.env.NEXT_PUBLIC_SPOTIFY_API_CLIENT_ID}&response_type=code&redirect_uri=${process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI}&scope=user-read-private%20user-read-email&state=34fFs29kd09`}
			>
				Login
			</a>
		</main>
	);
}
