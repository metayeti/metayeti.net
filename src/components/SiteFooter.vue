<template>
	<footer>
		<div class="wrap h-full py-5 flex flex-col justify-center items-center min-[1020px]:items-end gap-1">
			<span class="text-neutral-500">Coded and designed by Danijel Durakovic</span>
			<span class="text-neutral-600">&copy; 2025 metayeti.net</span>
			<span class="text-neutral-600">Built with <a href="https://vuejs.org" target="_blank"><img class="vue-icon" src="@/assets/images/vue.png" alt=""> Vue.js</a></span>
		</div>
	</footer>
</template>

<style scoped>
footer {
	position: relative;
	height: 250px;
	background-color: var(--my-global-background);
	font-family: "Inter", sans-serif;
	font-size: 12px;
	z-index: 5;

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