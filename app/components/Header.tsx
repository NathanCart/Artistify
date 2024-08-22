'use client';

import { IUserResponse } from '@/models/user';
import Avatar from './Avatar';

interface IHeader {
	currentUser: IUserResponse | undefined;
	title: string;
	isLoading?: boolean;
	description?: string;
}
export default function Header(props: IHeader) {
	const { isLoading = false } = props;
	return (
		<div className="mb-8 prose">
			<h1 className={`mb-0 ${isLoading && 'skeleton w-96 h-10'}`}>
				{!isLoading ? props.title : ''}
			</h1>
			{!!props.description?.length ? (
				<p className={`font-body prose-sm mt-0 ${isLoading && 'skeleton w-96 h-4 mt-2'}`}>
					{isLoading ? null : props.description}
				</p>
			) : null}
		</div>
	);
}
