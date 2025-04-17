<script setup>
import { RouterView } from 'vue-router'

import SiteHeader from './components/SiteHeader.vue';
import SiteFooter from './components/SiteFooter.vue';
</script>

<template>
	<SiteHeader />
	<main class="site-content">
		<RouterView />
	</main>
	<SiteFooter />
</template>

<style scoped>
main.site-content {
	position: relative;
	padding: 10px 0;
	background-color: var(--my-content-background);
	z-index: 5;
}
</style>
