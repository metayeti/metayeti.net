<script setup>
import IconFlame from './icons/IconFlame.vue';

import RockerSwitch from './RockerSwitch.vue';

import { RouterLink, useRoute } from 'vue-router';
import { onMounted, ref, useTemplateRef, watch } from 'vue';
import { configuration, switchTheme } from '@/shared';

// -- route handling --

const route = useRoute();
const navItemActive = ref(0);

const routeMap = {
	'/': 0,
	'/projects': 1,
	'/blog': 2,
	'/about': 3
};

watch(() => route.path, (nextPath) => {
	navItemActive.value = routeMap[nextPath] ?? -1;
});

// -- hide navigation --

const navMain = useTemplateRef('nav-main');

let lastScrollY = window.scrollY;

function handleScroll() {
	const currentScrollY = window.scrollY;

	if (currentScrollY < 250) {
		// show navbar at the very top regardless of scroll
		navMain.value.classList.remove('tucked');
	}
	else if (currentScrollY > lastScrollY) {
		// scrolling down
		navMain.value.classList.add('tucked');
	}
	else {
		// scrolling up
		navMain.value.classList.remove('tucked');
	}

	lastScrollY = currentScrollY;
}

window.addEventListener('scroll', () => handleScroll(), { passive: true });

// -- site theme handling --

const rockerSwitch = useTemplateRef('rocker-switch');
//const config = configuration.getConfig();
let isLightMode = configuration.isLightMode();
const lightModeIcon = ref(isLightMode);

const switchSiteTheme = (lightMode) => {
	//config.lightMode = lightModeIcon.value = lightMode;
	isLightMode = lightModeIcon.value = lightMode;
	switchTheme(lightMode);
	configuration.setLightMode(isLightMode);
}

onMounted(() => {
	if (isLightMode) {
		rockerSwitch.value?.manualSwitch();
		switchTheme(true);
	}
});
</script>

<template>
	<header>
		<div class="banner">
			<div class="back">
				<div class="bg1"></div>
				<div class="bg2"></div>
			</div>
			<div class="pixelated background"></div>
			<div class="wrap">
				<div class="pixelated yeti"></div>
				<h1 class="site-branding">
					<span class="highlight">.&sol;meta</span><span>yeti.net_</span>
				</h1>
			</div>
			<div class="crt-fx"></div>
		</div>
	</header>
	<nav class="navigation-top">
		<div class="wrap social-link-row">
	
			<a class="social-link tooltip" href="https://github.com/metayeti" target="_blank">
				<font-awesome-icon icon="fa-brands fa-github" />
				<span class="tooltip-text">GitHub</span>
				<div class="tooltip-arrow"></div>
			</a>

			<a class="social-link tooltip" href="#" target="_blank">
				<font-awesome-icon icon="fa-brands fa-linkedin" />
				<span class="tooltip-text">LinkedIn</span>
				<div class="tooltip-arrow"></div>
			</a>
		
			<a class="social-link tooltip" href="https://x.com/metayetidev" target="_blank">
				<font-awesome-icon icon="fa-brands fa-x-twitter" />
				<span class="tooltip-text">X</span>
				<div class="tooltip-arrow"></div>
			</a>
			
			<a class="social-link tooltip" href="https://www.youtube.com/@metayetidev" target="_blank">
				<font-awesome-icon icon="fa-brands fa-youtube" />
				<span class="tooltip-text">YouTube</span>
				<div class="tooltip-arrow"></div>
			</a>

			<a class="social-link tooltip" href="https://soundcloud.com/metayeti" target="_blank">
				<font-awesome-icon icon="fa-brands fa-soundcloud" />
				<span class="tooltip-text">SoundCloud</span>
				<div class="tooltip-arrow"></div>
			</a>
		
		</div>
	</nav>
	<nav ref="nav-main" class="navigation-main">
		<div class="wrap flex flex-row gap-1.5">
			<div class="nav-button-row">
				<RouterLink class="nav-button" to="/" :class="{ active: navItemActive === 0}">home</RouterLink>
				<RouterLink class="nav-button" to="/projects" :class="{ active: navItemActive === 1}">projects</RouterLink>
				<RouterLink class="nav-button" to="/blog" :class="{ active: navItemActive === 2}">blog</RouterLink>
				<RouterLink class="nav-button" to="/about" :class="{ active: navItemActive === 3}">about</RouterLink>
			</div>

			<div class="flex flex-row items-center gap-1.5">
				<div class="size-5">
					<IconFlame class="text-gray-600 transition-colors duration-300" :class="lightModeIcon ? 'text-orange-400' : 'text-gray-600'" />
				</div>

				<RockerSwitch ref="rocker-switch" @switch-toggle="switchSiteTheme" />
			</div>
		</div>
	</nav>
</template>

<style scoped lang="scss">
$wrapBreakpoint: 1019px;

header {
	position: relative;
	user-select: none;
	overflow: hidden;
}

/* -- yeti banner -- */
header > .banner {
	position: relative;
	height: 78px;
	overflow: hidden;

	@media (max-width: $wrapBreakpoint) {
		.wrap {
			margin-left: 20px;
		}
	}

	.back {
		/* Backgrounds that make sure that the correct
		 * banner colors continue past the banner. */
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;

		.bg1 {
			position: absolute;
			width: 50%;
			height: 100%;
			left: 0;
			background-color: #292130;
		}
		.bg2 {
			position: absolute;
			width: 50%;
			height: 100%;
			right: 0;
			background-color: #b9e6fb;
		}
	}

	.background {
		position: absolute;
		width: 2000px;
		height: 78px;
		background-image: url('@/assets/images/header.png');
		background-size: cover;
		left: 50%;
		margin-left: -1000px;
	}

	.yeti {
		position: absolute;
		width: 220px;
		height: 78px;
		top: 0;
		left: 184px;
		background-image: url('@/assets/images/yeti.png');
		background-size: cover;
		transition: top 250ms linear, left 250ms linear;

		@media (max-width: 1000px) { top: 10px; left: 174px; }
		@media (max-width: 950px) { left: 154px; }
		@media (max-width: 900px) { display: none; }
	}

	h1.site-branding {
		position: absolute;
		top: 0;
		left: 0;
		line-height: 82px;
		margin-left: -5px;
		color: #fff;
		font-family: "M PLUS 1 Code", monospace;
		font-style: normal;
		font-size: 22px;

		.highlight {
			color: rgb(132, 111, 146);
		}

		@media (max-width: 499px) {
			left: -5px;
			font-size: clamp(13px, 4vw, 22px);
		}

	}

	.crt-fx {
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		background: repeating-linear-gradient(
			to bottom,
			rgba(0, 0, 0, 0.1) 0px,
			rgba(0, 0, 0, 0.1) 1px,
			transparent 1px,
			transparent 2px
		);

	}

}

/* -- top navigation -- */
nav.navigation-top {
	position: sticky;
	top: 0;
	height: 32px;
	background-color: var(--my-navigation-background1);
	z-index: 2;

	@media (max-width: $wrapBreakpoint) {
		.wrap {
			padding-right: 10px;
		}
	}

	.social-link-row {
		display: flex;
		height: 100%;
		justify-content: end;
		align-items: center;
		flex-direction: row;
		gap: 1px;

		.social-link {
			width: 32px;
			height: 32px;
			font-size: 19px;
			line-height: 34px;
			text-align: center;
			color: var(--my-navigation-social-icon);

			&:hover, &:focus {
				font-size: 21px;
				line-height: 33px;
				color: var(--my-navigation-social-icon-highlight);
			}
		}
	}
	.tooltip {
		position: relative;
		user-select: none;

		.tooltip-text {
			position: absolute;
			visibility: hidden;
			padding: 0px 20px;
			height: 28px;
			line-height: 26px;
			left: 40px;
			top: 0;
			transform: translate(-100%, -41px);
			background-color: rgba(0,0,0,0.8);
			border-bottom: 2px solid #000;
			color: #fff;
			font-family: "Inter", sans-serif;
			font-size: 11px;
			clip-path: polygon(7% 0, 100% 0, 93% 100%, 0 100%);
			white-space: nowrap;
			z-index: 99;
		}

		.tooltip-arrow {
			position: absolute;
			visibility: hidden;
			top: -14px;
			left: 9px;
			border-width: 7px;
			border-style: solid;
			border-color: black transparent transparent transparent;
		}

		&:hover, &:focus {
			.tooltip-text, .tooltip-arrow {
				visibility: visible;
			}
		}

	}
}

/* -- main navigation -- */
nav.navigation-main {
	position: sticky;
	top: 0;
	height: 55px;
	background-color: var(--my-navigation-background2);
	border-bottom: 2px solid var(--my-navigation-border);
	z-index: 99;
	transition: transform 0.3s ease;

	// :root.let-there-be-light & {
	// 	// make the border less pronounced in light mode
	// 	border-bottom: 1px solid var(--my-navigation-border);
	// }

	&.tucked {
		transform: translateY(-100%);
	}

	@media (max-width: $wrapBreakpoint) {
		.wrap {
			padding-right: 10px;
		}
	}

	.nav-button-row {
		display: flex;
		flex-direction: row;
		flex-grow: 1;
		margin-left: -20px;

		.nav-button {
			position: relative;
			height: 55px;
			line-height: 40px;
			padding: 0 7px;
			color: var(--my-navigation-label);
			font-family: "Titillium Web", sans-serif;
			font-weight: 400;
			font-size: 12px;
			text-align: center;
			text-transform: uppercase;
			user-select: none;
			flex-grow: 1;

			:root.let-there-be-light & {
				// make text a tiny bit heavier in light mode
				font-weight: 600;
			}

			&.active, &:hover, &:focus {
				background-color: var(--my-navigation-background1);
				color: var(--my-navigation-label-highlight);
			}

			&::before {
				display: block;
				position: absolute;
				content: '';
				width: 10px;
				height: 15px;
				left: 0;
				top: 38px;
				border-left: 1px solid var(--my-navigation-cut-in);
			}
			&:first-child::before {
				border-color: transparent;
			}
			&::after {
				display: block;
				content: '';
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				top: 36px;
				width: 5px;
				height: 5px;
				background-color: var(--my-navigation-light-dimmed);
				border-radius: 50%;
			}
			&.active::after {
				background-color: var(--my-navigation-light-on);
				box-shadow: 0 0 10px 2px var(--my-navigation-light-on);
			}

			@media (min-width: 520px) {
				height: 55px;
				padding: 0 25px 0 0;
				line-height: 55px;
				font-size: 13px;
				//font-weight: 400;
				text-align: left;
				flex-grow: 0;

				&::before {
					display: block;
					position: relative;
					float: left;
					width: 30px;
					height: 14px;
					top: 38px;
				}
				&:first-child::before {
					border-color: transparent;
				}
				&::after {
					left: 16px;
					top: 0;
					bottom: 0;
					margin: auto 0;
					width: 5px;
					height: 5px;
				}
			}
		}
	}
}
</style>
