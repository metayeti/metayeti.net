import HomeView from '../views/HomeView.vue';
import ProjectsView from '../views/ProjectsView.vue';
import BlogView from '../views/BlogView.vue';
import AboutView from '../views/AboutView.vue';

import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';

const routes = [
	{ path: '/', name: 'Home', component: HomeView },
	{ path: '/projects', name: 'projects', component: ProjectsView },
	{ path: '/blog', name: 'blog', component: BlogView },
	{ path: '/about', name: 'about', component: AboutView },
];

const router = createRouter({
	//history: createWebHistory(import.meta.env.BASE_URL),
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes,
	scrollBehavior(to, from, savedPosition) {

		if (savedPosition) {
			return savedPosition;
		}

		const isInitialLoad = !from.name;
		const toPosition = (to.path === '/') ? 0 : 110;

		return {
			top: toPosition,
			behavior: isInitialLoad ? undefined : 'smooth'
		};
	}
});

export default router;
