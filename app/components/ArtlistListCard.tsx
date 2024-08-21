'use client';

import { AddArtistToList, RemoveArtistFromList, RevalidateTags } from '../actions';
import Card from './Card';
import { faSquare, faSquareCheck, faSquareXmark } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tooltip from './Tooltip';
import { IUserResponse } from '@/models/user';
//@ts-ignore
import commaNumber from 'comma-number';
import { useMutation } from '@tanstack/react-query';
import useInvalidateQuery from '@/hooks/useInvalidateQuery';

interface IArtlistListCard {
	isHovered: boolean;
	isActive: boolean | undefined;
	onMouseOver: () => void;
	onMouseLeave: () => void;
	artist: IArtist;
	user: IUserResponse | undefined;
	onChange?: () => void;
}

export default function ArtlistListCard(props: IArtlistListCard) {
	const invalidateQuery = useInvalidateQuery();
	const { mutateAsync: removeArtist } = useMutation<IUserResponse>({
		mutationFn: async () =>
			await RemoveArtistFromList({
				artistId: props.artist?.id ?? '',
				spotifyId: props.user?.spotify_id ?? '',
			}),
		onSuccess: async () => {
			invalidateQuery(['list']);
			invalidateQuery(['current-user']);

			props.onChange?.();
		},
	});

	const { mutateAsync: addArtist } = useMutation<IUserResponse>({
		mutationFn: async () =>
			await AddArtistToList({
				artistId: props.artist?.id ?? '',
				spotifyId: props.user?.spotify_id ?? '',
			}),
		onSuccess: async () => {
			invalidateQuery(['list']);
			invalidateQuery(['current-user']);

			props.onChange?.();
		},
	});

	return (
		<div
			onMouseOver={() => props.onMouseOver()}
			onMouseLeave={() => props.onMouseLeave()}
			className="grid col-span-6 sm:col-span-3 lg:col-span-2"
		>
			<Card
				icon={
					<Tooltip
						text={props.isActive ? 'Remove from your list' : 'Add to your list'}
						className="!absolute left-2 top-2 "
					>
						<FontAwesomeIcon
							className="text-neutral"
							size="2x"
							icon={
								props.isActive && props.isHovered
									? faSquareXmark
									: props.isHovered || props.isActive
									? faSquareCheck
									: faSquare
							}
						/>
					</Tooltip>
				}
				onClick={async () => {
					if (props.isActive) {
						const response = await removeArtist();
					} else {
						const response = await addArtist();
					}
				}}
				image={
					props.artist?.images[0]?.url ??
					'https://static.thenounproject.com/png/212110-200.png'
				}
				title={props.artist?.name}
				description={`${commaNumber(props.artist?.followers?.total)} Followers`}
			/>
		</div>
	);
}
