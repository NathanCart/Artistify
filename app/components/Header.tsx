'use client';

import { IUserResponse } from '@/models/user';
import Avatar from './Avatar';

interface IHeader {
	currentUser: IUserResponse;
	title: string;
	description?: string;
}
export default function Header(props: IHeader) {
	return (
		<div className="mb-8 prose">
			<Avatar
				src={props.currentUser?.spotify_data?.images?.[1]?.url}
				alt={props.currentUser?.spotify_data?.display_name}
			/>
			<h1 className="mb-0">{props.title}</h1>
			{!!props.description?.length ? (
				<p className="font-body prose-sm mt-0">{props.description}</p>
			) : null}
		</div>
	);
}
