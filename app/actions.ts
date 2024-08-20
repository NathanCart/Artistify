'use server';

import { IUserResponse } from '@/models/user';
import { revalidateTag } from 'next/cache';

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
		next: {
			tags: ['user'],
		},
	});

	const data: IUserResponse = await response.json();

	return data;
}

export async function getUsers(search: string, pageNum: number, perPage: number) {
	const formattedPageNum = pageNum ?? 1;
	const formattedPerPage = perPage ?? 10;

	console.log(
		`${process.env.API_URL}/api/user/?search=${search}&page_num=${formattedPageNum}&per_page=${formattedPerPage}`
	);
	const response = await fetch(
		`${process.env.API_URL}/api/user/?search=${search}&page_num=${formattedPageNum}&per_page=${formattedPerPage}`,
		{
			headers: {
				method: 'GET',
			},
			next: {
				tags: ['user'],
				revalidate: 0,
			},
		}
	);

	const result = await response.json();
	return result;
}

export async function getFriends(userId: string, pageNum: number, perPage: number) {
	const formattedPageNum = pageNum ?? 1;
	const formattedPerPage = perPage ?? 10;

	const response = await fetch(
		`${process.env.API_URL}/api/user/friends/?spotifyId=${userId}&page_num=${formattedPageNum}&per_page=${formattedPerPage}`,
		{
			headers: {
				method: 'GET',
			},
			next: {
				tags: ['user'],
			},
		}
	);

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

export async function RemoveArtistFromList({
	spotifyId,
	artistId,
}: {
	spotifyId: string;
	artistId: string;
}) {
	const response = await fetch(`${process.env.API_URL}/api/user/remove-artist/`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ spotifyId, artistId }),
	});

	return response.json();
}

export async function RevalidateTags({ tags }: { tags: string[] }) {
	await Promise.all(tags.map(async (tag) => await revalidateTag(tag)));
}

export async function getArtists({
	q,
	type,
	accessToken,
	pageNum,
}: {
	q: string;
	type: string;
	accessToken: string;
	pageNum: number;
}) {
	const response = await fetch(
		`https://api.spotify.com/v1/search/?q=${q ?? ''}&type=${type ?? 'artist'}&limit=20&offset=${
			(pageNum - 1) * 20
		}`,
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
			next: {
				tags: ['artists'],
			},
		}
	);
	const data = await response.json();
	return data;
}

export async function AddFriendToList({
	spotifyId,
	friendId,
}: {
	spotifyId: string;
	friendId: number;
}) {
	const response = await fetch(`${process.env.API_URL}/api/user/add-friend/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ spotifyId, friendId }),
	});

	return response.json();
}

export async function RemoveFriendFromList({
	spotifyId,
	friendId,
}: {
	spotifyId: string;
	friendId: number;
}) {
	const response = await fetch(`${process.env.API_URL}/api/user/remove-friend/`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ spotifyId, friendId }),
	});

	return response.json();
}
