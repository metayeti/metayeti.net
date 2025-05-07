<script setup>
import SiteHeader from './components/SiteHeader.vue';
import SiteFooter from './components/SiteFooter.vue';

import { RouterView } from 'vue-router'
</script>

<template>
	<SiteHeader />
	<main class="main-content">
		<div class="wrap site-content">
			<RouterView />
		</div>
	</main>
	<SiteFooter />
</template>