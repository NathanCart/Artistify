'use client';

import { AddFriendToList, RemoveFriendFromList, RevalidateTags } from '../actions';
import Card from './Card';
//@ts-ignore
import { IUser, IUserResponse } from '@/models/user';
import { faSquare, faSquareCheck, faSquareXmark } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import Tooltip from './Tooltip';
interface IFriendList {
	isLoading?: boolean;
	users: IUser[] | undefined;
	className?: string;
	user: IUserResponse | undefined;
}

export default function FriendList(props: IFriendList) {
	const activeFriends = props.user?.friends?.filter((user) =>
		props.users?.map((user) => user.id).includes(user)
	);

	const [hoveredFriend, setHoveredFriend] = useState<number | null>(null);
	return (
		<div className={`grid grid-cols-12 gap-6 ${!!props.className && props.className}`}>
			{(props.isLoading ? Array.from({ length: 6 }) : props.users)?.map((user, index) => {
				const userData = user as IUserResponse;
				const isActive = activeFriends?.map((a) => a).includes(userData?.id);
				const isHovered = hoveredFriend === index;
				return (
					<div
						key={index}
						onMouseOver={() => setHoveredFriend(index)}
						onMouseLeave={() => setHoveredFriend(null)}
						className="grid col-span-6 sm:col-span-3 lg:col-span-2"
					>
						<Card
							isLoading={props.isLoading}
							icon={
								props.isLoading ? null : (
									<Tooltip
										text={
											isActive ? 'Remove from your list' : 'Add to your list'
										}
										className="!absolute left-2 top-2 "
									>
										<FontAwesomeIcon
											className="text-secondary"
											size="2x"
											icon={
												isActive && isHovered
													? faSquareXmark
													: isHovered || isActive
													? faSquareCheck
													: faSquare
											}
										/>
									</Tooltip>
								)
							}
							onClick={async () => {
								if (isActive) {
									const response = await RemoveFriendFromList({
										friendId: userData?.id,
										spotifyId: props.user?.spotify_id ?? '',
									});
								} else {
									const response = await AddFriendToList({
										friendId: userData?.id,
										spotifyId: props.user?.spotify_id ?? '',
									});
								}
								RevalidateTags({ tags: ['user', 'users'] });
							}}
							image={
								userData?.avatar_url ??
								'https://static.thenounproject.com/png/212110-200.png'
							}
							title={userData?.display_name}
							description={`${userData?.followers ?? 0} followers`}
						/>
					</div>
				);
			})}
		</div>
	);
}
