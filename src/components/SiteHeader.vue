<script setup>
import IconLighterBody from './icons/IconLighterBody.vue';
import IconLighterFlame from './icons/IconLighterFlame.vue';

import { RouterLink } from 'vue-router';

import RockerSwitch from './RockerSwitch.vue';

import { ref } from 'vue';

const lightModeIcon = ref(false);

const switchSiteTheme = (lightMode) => {
	lightModeIcon.value = lightMode;
	if (lightMode) {
		document.documentElement.classList.add('let-there-be-light');
	}
	else {
		document.documentElement.classList.remove('let-there-be-light');
	}
}
</script>

<template>
	<header>
		<div class="pixelated background"></div>
		<div class="pixelated yeti"></div>
	</header>
	<nav>
		<div class="wrap flex flex-row">
			<div class="flex flex-row flex-none">
				<RouterLink class="nav-button active" to="/">home</RouterLink>
				<RouterLink class="nav-button" to="/projects">projects</RouterLink>
				<RouterLink class="nav-button" to="/blog">blog</RouterLink>
				<RouterLink class="nav-button" to="/about">about</RouterLink>
			</div>
			<div class="flex flex-grow justify-end items-center">
				<div class="flex flex-row items-center gap-1.5">
					<div class="relative size-5">
						<IconLighterBody class="absolute transition-colors duration-200" :class="lightModeIcon ? 'text-gray-700' : 'text-gray-600'" />
						<IconLighterFlame class="absolute transition-colors duration-200" :class="lightModeIcon ? 'text-yellow-500' : 'text-gray-600'" />
					</div>
					<RockerSwitch @switch-toggle="switchSiteTheme" />
				</div>
			</div>
		</div>

	</nav>
</template>

<style scoped>
/* -- yeti header -- */
header {
	height: 150px;
	overflow: hidden;

	.background {
		position: fixed;
		width: 2000px;
		height: 150px;
		left: 50%;
		margin-left: -1000px;
		background-image: url('@/assets/images/header.png');
		background-size: contain;
	}
}

/* -- main site navigation -- */
nav {
	position: sticky;
	top: 0;
	height: 55px;
	background-color: var(--my-navbar-background);
	border-bottom: 3px solid #111;
	z-index: 99;

	.nav-button {
		position: relative;
		height: 55px;
		padding-right: 25px;
		line-height: 55px;
		font-family: "Titillium Web", sans-serif;
		font-size: 12px;
		text-transform: uppercase;
		color: #ccc;

		&.active {
			background-color: #0a0a0a;
			color: #fff;
		}
		&:hover {
			background-color: #0a0a0a;
			color: #fff;
		}

		&::before {
			display: block;
			position: relative;
			float: left;
			content: '';
			width: 29px;
			height: 14px;
			top: 38px;
			border-left: 1px solid #2a2a2a;
		}
		&:first-child::before {
			border-color: transparent;
		}
		&::after {
			display: block;
			content: '';
			position: absolute;
			left: 13px;
			top: 0;
			bottom: 0;
			margin: auto 0;
			width: 5px;
			height: 5px;
			background-color: #555;
			border-radius: 50%;
		}
		&.active::after {
			background-color: rgb(26, 214, 26);
			box-shadow: 0 0 10px 1px rgb(26, 214, 26);
		}
	}
}
</style>
