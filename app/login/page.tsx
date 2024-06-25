export default async function Home({ params, searchParams }: { params: any; searchParams: any }) {
	return (
		<main className="container">
			<a
				href={`https://accounts.spotify.com/authorize?client_id=${process.env.NEXT_PUBLIC_SPOTIFY_API_CLIENT_ID}&response_type=code&redirect_uri=${process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI}&scope=user-read-private%20user-read-email&state=34fFs29kd09`}
			>
				Login
			</a>
		</main>
	);
}
