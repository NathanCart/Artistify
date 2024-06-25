type IExternalUrls = {
	spotify: string;
};

type IFollowers = {
	href: string | null;
	total: number;
};

type IImage = {
	height: number;
	url: string;
	width: number;
};

type IArtist = {
	external_urls: IExternalUrls;
	followers: IFollowers;
	genres: string[];
	href: string;
	id: string;
	images: IImage[];
	name: string;
	popularity: number;
	type: string;
	uri: string;
};

type IArtistsResponse = {
	artists: {
		href: string;
		items: IArtist[];
		limit: number;
		next: string;
		offset: number;
		previous: string | null;
		total: number;
	};
};
