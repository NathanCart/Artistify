import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Provider } from '@/Provider';
import { config } from '@fortawesome/fontawesome-svg-core';
import IconProvider from './components/IconProvider';
import Sidebar from './components/Sidebar';
import ReactQueryProvider from './components/QueryClientProvider';
import useAuth from '@/hooks/useAuth';
import { cookies } from 'next/headers';
import { getCurrentUser } from './actions';
import Avatar from './components/Avatar';
config.autoAddCss = false; /* eslint-disable import/first */

export const metadata: Metadata = {
	title: 'Artistszee',
	description: "Artistszee is a music library containing all the artists you've seen live.",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const accessToken = cookies().get('spotify_access_token');
	const currentUser = await getCurrentUser(accessToken?.value ?? '');

	return (
		<html lang="en" className="" data-theme="cupcake">
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
				<link
					href="https://fonts.googleapis.com/css2?family=Raleway:wght@600;700&display=swap"
					rel="stylesheet"
				/>

				<link
					href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400&display=swap"
					rel="stylesheet"
				/>
			</head>
			<body className="bg-base">
				<ReactQueryProvider>
					<IconProvider>
						<Provider>
							<div className="flex  h-full min-h-screen duration-1000 transition-all">
								<Sidebar />
								<Avatar
									isLoading={false}
									src={
										currentUser?.spotify_data?.images?.[1]?.url ??
										'https://static.thenounproject.com/png/212110-200.png'
									}
									alt={currentUser?.spotify_data?.display_name ?? ''}
								/>
								<div className=" w-full overflow-x-hidden">{children}</div>
							</div>
						</Provider>
					</IconProvider>
				</ReactQueryProvider>
			</body>
		</html>
	);
}
