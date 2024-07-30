import { IUserResponse } from '@/models/user';
import Avatar from './Avatar';

interface IHeader {
	currentUser: IUserResponse;
	title: string;
	description?: string;
}
export default function Header(props: IHeader) {
	return (
		<div className="mb-8 ">
			<Avatar
				src={props.currentUser?.spotify_data?.images?.[1]?.url}
				alt={props.currentUser?.spotify_data?.display_name}
			/>
			<h1 className="text-2xl tmd:text-4xl font-bold  mt-2">{props.title}</h1>
			{!!props.description?.length ? (
				<p className="text-sm font-body text-neutral-300">{props.description}</p>
			) : null}
		</div>
	);
}
