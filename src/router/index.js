import HomeView from '../views/HomeView.vue';
import ProjectsView from '../views/ProjectsView.vue';
import BlogView from '../views/BlogView.vue';
import BlogPostView from '../views/BlogPostView.vue';
import AboutView from '../views/AboutView.vue';

import { createRouter, createWebHistory } from 'vue-router';

const routes = [
	{ path: '/', name: 'Home', component: HomeView },
	{ path: '/projects', name: 'projects', component: ProjectsView },
	{ path: '/blog', name: 'blog', component: BlogView },
	{ path: '/blog/:slug', name: 'blog-post', component: BlogPostView },
	{ path: '/about', name: 'about', component: AboutView },
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
	scrollBehavior(to, from, savedPosition) {
		// handle saved position (browser back/forward)
		if (savedPosition) {
			return savedPosition;
		}

		// handle anchor links (e.g /about#skills)
		if (to.hash) {
			return {
				el: to.hash, // scroll to element with matching id
				top: 30,
				behavior: 'smooth'
			}
		}

		// default scroll behavior for routes
		const isInitialLoad = !from.name;
		let toPosition;
		if (to.path === '/') toPosition = 0;
		else if (to.path === '/about') toPosition = 79;
		else toPosition = 110;

		return {
			top: toPosition,
			behavior: isInitialLoad ? undefined : 'smooth'
		};
	}
});

export default router;
