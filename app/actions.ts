'use server';

export async function updateUser(spotifyId: string) {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ spotifyId }),
	});

	return response.json();
}

export async function getCurrentUser(accessToken: string) {
	const response = await fetch(`${process.env.API_URL}/api/user/me?accessToken=${accessToken}`, {
		headers: {
			method: 'GET',
		},
	});

	return response.json();
}

export async function AddArtistToList({
	spotifyId,
	artistId,
}: {
	spotifyId: string;
	artistId: string;
}) {
	const response = await fetch(`${process.env.API_URL}/api/user/add-artist/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ spotifyId, artistId }),
	});

	return response.json();
}