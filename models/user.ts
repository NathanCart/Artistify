export interface IUserResponse {
	display_name: string;
	external_urls: IExternalUrls;
	href: string;
	id: string;
	images: IImage[];
	type: string;
	uri: string;
	followers: IFollowers;
	country: string;
	product: string;
	explicit_content: {
		filter_enabled: boolean;
		filter_locked: boolean;
	};
	email: string;
}
