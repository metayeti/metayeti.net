<script setup>
import SiteHeader from './components/SiteHeader.vue';
import SiteFooter from './components/SiteFooter.vue';


import { RouterView, useRoute } from 'vue-router'

// todo remove when site is polished and finished
import UnderConstructionPopup from './components/UnderConstructionPopup.vue';
const route = useRoute();
</script>

<template>
	<SiteHeader />
	<main class="main-content">
		<div class="wrap site-content">
			<RouterView />
		</div>
	</main>
	<SiteFooter />
	<UnderConstructionPopup v-if="route.path === '/'" />
</template>