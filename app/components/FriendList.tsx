'use client';

import { AddFriendToList, RemoveFriendFromList, RevalidateTags } from '../actions';
import Card from './Card';
//@ts-ignore
import { IUser, IUserResponse } from '@/models/user';
import { faSquare, faSquareCheck, faSquareXmark } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import Tooltip from './Tooltip';
import useInvalidateQuery from '@/hooks/useInvalidateQuery';
import Avatar from './Avatar';
import Image from 'next/image';
import { faCheck, faHyphen, faSlash, faXmark } from '@fortawesome/pro-solid-svg-icons';
import Divider from './Divider';
interface IFriendList {
	isLoading?: boolean;
	users: IUser[] | undefined;
	className?: string;
	user: IUserResponse | undefined;
	onInvalidate?: () => void;
	type: 'list' | 'grid';
}

const GridView = (props: IFriendList) => {
	const activeFriends = props.user?.friends?.filter((user) =>
		props.users?.map((user) => user.id).includes(user)
	);

	const invalidateQuery = useInvalidateQuery();

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
										text={isActive ? 'Remove friend' : 'Add friend'}
										className="!absolute left-2 top-2 "
									>
										<FontAwesomeIcon
											className="text-neutral"
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
								if (props.isLoading) return;

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
								await invalidateQuery([
									'current-user-friends',
									'friends',
									'current-user',
								]);
								props.onInvalidate?.();

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
};

const ListView = (props: IFriendList) => {
	const activeFriends = props.user?.friends?.filter((user) =>
		props.users?.map((user) => user.id).includes(user)
	);

	const invalidateQuery = useInvalidateQuery();

	const [hoveredFriend, setHoveredFriend] = useState<number | null>(null);

	return (
		<div
			className={`grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 ${
				!!props.className && props.className
			}`}
		>
			{(props.isLoading ? Array.from({ length: 6 }) : props.users)?.map((user, index) => {
				const userData = user as IUserResponse;
				const isActive = activeFriends?.map((a) => a).includes(userData?.id);
				const isHovered = hoveredFriend === index;
				return (
					<div key={index} className="prose flex flex-row gap-2 items-center">
						{props.isLoading ? (
							<div className="rounded-full h-[32px] w-[32px] max-h-full skeleton" />
						) : (
							<Image
								className="rounded-full m-0 max-h-full"
								src={userData?.avatar_url}
								alt={userData?.display_name}
								width={32}
								height={32}
							/>
						)}

						<p className={`m-0 flex-1 ${props.isLoading && 'skeleton h-4 w-10'}`}>
							{userData?.display_name}
						</p>
						{props.isLoading ? (
							<div className="h-4 w-4 skeleton" />
						) : (
							<Tooltip text={isActive ? 'Remove friend' : 'Add friend'} className="">
								<FontAwesomeIcon
									onClick={async () => {
										if (props.isLoading) return;

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
										await invalidateQuery([
											'current-user-friends',
											'friends',
											'current-user',
										]);
										props.onInvalidate?.();

										RevalidateTags({ tags: ['user', 'users'] });
									}}
									onMouseOver={() => setHoveredFriend(index)}
									onMouseLeave={() => setHoveredFriend(null)}
									className="text-neutral cursor-pointer"
									size="lg"
									icon={
										isActive && isHovered
											? faXmark
											: isHovered || isActive
											? faCheck
											: faHyphen
									}
								/>
							</Tooltip>
						)}

						{/* {index === props.users!.length - 1 ? null : <Divider />} */}
						{/* <Card
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
											className="text-neutral"
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
								if (props.isLoading) return;

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
								await invalidateQuery([
									'current-user-friends',
									'friends',
									'current-user',
								]);
								props.onInvalidate?.();

								RevalidateTags({ tags: ['user', 'users'] });
							}}
							image={
								userData?.avatar_url ??
								'https://static.thenounproject.com/png/212110-200.png'
							}
							title={userData?.display_name}
							description={`${userData?.followers ?? 0} followers`}
						/> */}
					</div>
				);
			})}
		</div>
	);
};

export default function FriendList(props: IFriendList) {
	if (props.type === 'grid') {
		return <GridView {...props} />;
	} else {
		return <ListView {...props} />;
	}
}
