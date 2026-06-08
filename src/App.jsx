//
//  metayeti.net
//
//  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
//  Copyright (c) 2026-present metayeti.net
//  All rights reserved.
//
//  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
//  File:         src/App.jsx
//  Description:  App component.
//
//  Author:       Danijel Durakovic <metayetidev@gmail.com>
//  Created:      2026-02-09
//  Updated:      2026-06-08
//
//  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
//  NOTE:         -
//  TODO:         -
//

import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

import { createBrowserRouter, RouterProvider, Outlet, useLocation } from 'react-router-dom';
import Home from '@/pages/Home';
import Projects from '@/pages/Projects';
import ProjectPage from '@/pages/ProjectPage';
import Blog from '@/pages/Blog';
import BlogPost from '@/pages/BlogPost';
import About from '@/pages/About';
import NotFound from './pages/NotFound';
import { useEffect } from 'react';

function ScrollToTop() {
	const { pathname } = useLocation();
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [pathname]);
	return null;
}

function RootLayout() {
	return (
		<>
			<ScrollToTop />
			<SiteHeader />
			<main>
				<Outlet />
			</main>
			<SiteFooter />
		</>
	);
}

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: '/projects',
				element: <Projects />,
			},
			{
				path: '/projects/:slug',
				element: <ProjectPage />,
			},
			{
				path: '/blog',
				element: <Blog />,
			},
			{
				path: '/blog/:slug',
				element: <BlogPost />,
			},
			{
				path: '/blog/:slug/:page',
				element: <BlogPost />,
			},
			{
				path: '/about',
				element: <About />,
			},
			{
				path: '*',
				element: <NotFound />,
			},
		],
	},
]);

function App() {
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
