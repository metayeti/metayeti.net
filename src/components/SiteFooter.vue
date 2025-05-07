<script setup>
import IconVue from './icons/IconVue.vue';
</script>

<template>
	<footer>
		<div class="wrap h-full py-5 flex flex-col justify-center items-center min-[1020px]:items-end gap-1">
			<span class="highlight">Created by Danijel Durakovic</span>
			<span>Powered by <a href="https://vuejs.org" target="_blank"><IconVue class="inline" /> Vue.js</a></span>
			<span>&copy; {{ new Date().getFullYear() }} metayeti.net | All rights reserved.</span>
		</div>
	</footer>
</template>

<style scoped lang="scss">
footer {
	position: relative;
	height: 250px;
	background-color: var(--my-footer-background);
	font-family: "Inter", sans-serif;
	font-size: 12px;
	color: var(--my-footer-text);
	border-top: 2px solid var(--my-footer-divider);
	z-index: 5;

	.highlight {
		color: var(--my-footer-text-highlight);
	}
	a {
		color: #41b883;
	}
	a:hover {
		text-decoration: underline;
		text-decoration-color: rgba(65, 184, 131, 0.8);
		text-underline-offset: 4px;
	}
	img.vue-icon {
		display: inline-block;
		width: 16px;
		height: 16px;
	}
}
</style>