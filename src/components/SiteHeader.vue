<script setup>
import IconFlame from './icons/IconFlame.vue';

import RockerSwitch from './RockerSwitch.vue';

import { RouterLink, useRoute } from 'vue-router';
import { ref, watch } from 'vue';

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


const lightModeIcon = ref(false);

const switchSiteTheme = (lightMode) => {
	lightModeIcon.value = lightMode;
	const lightModeClass = 'let-there-be-light';
	if (lightMode) { document.documentElement.classList.add(lightModeClass); }
	else { document.documentElement.classList.remove(lightModeClass); }
}
</script>

<template>
	<header>
		<div class="banner">
			<div class="pixelated background"></div>
			<div class="wrap">
				<h1 class="site-branding">
					<span class="highlight">meta</span><span>yeti.net</span>
				</h1>
			</div>
		</div>
	</header>
	<nav class="navigation-top">
		<div class="wrap social-link-row">
			<a class="social-link tooltip" href="https://www.facebook.com/profile.php?id=100095050669741" target="_blank">
				<font-awesome-icon icon="fa-brands fa-facebook" />
				<span class="tooltip-text">Facebook</span>
				<div class="tooltip-arrow"></div>
			</a>
			<a class="social-link tooltip" href="https://x.com/metayetidev" target="_blank">
				<font-awesome-icon icon="fa-brands fa-x-twitter" />
				<span class="tooltip-text">X</span>
				<div class="tooltip-arrow"></div>
			</a>
			<a class="social-link tooltip" href="https://bsky.app/profile/metayeti.bsky.social" target="_blank">
				<font-awesome-icon icon="fa-brands fa-bluesky" />
				<span class="tooltip-text">Bluesky</span>
				<div class="tooltip-arrow"></div>
			</a>
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
			<a class="social-link tooltip" href="https://www.reddit.com/user/metayeti2/" target="_blank">
				<font-awesome-icon icon="fa-brands fa-reddit-alien" />
				<span class="tooltip-text">Reddit</span>
				<div class="tooltip-arrow"></div>
			</a>
			<a class="social-link tooltip" href="https://soundcloud.com/metayeti" target="_blank">
				<font-awesome-icon icon="fa-brands fa-soundcloud" />
				<span class="tooltip-text">Soundcloud</span>
				<div class="tooltip-arrow"></div>
			</a>
			<a class="social-link tooltip" href="https://www.youtube.com/@metayetidev" target="_blank">
				<font-awesome-icon icon="fa-brands fa-youtube" />
				<span class="tooltip-text">YouTube</span>
				<div class="tooltip-arrow"></div>
			</a>
		</div>
	</nav>
	<nav class="navigation-main">
		<div class="wrap flex flex-row gap-1.5">
			<div class="nav-button-row">
				<RouterLink class="nav-button" to="/" :class="{ active: navItemActive === 0}">home</RouterLink>
				<RouterLink class="nav-button" to="/projects" :class="{ active: navItemActive === 1}">projects</RouterLink>
				<RouterLink class="nav-button" to="/blog" :class="{ active: navItemActive === 2}">blog</RouterLink>
				<RouterLink class="nav-button" to="/about" :class="{ active: navItemActive === 3}">about</RouterLink>
			</div>

			<div class="flex flex-row items-center gap-1.5">

				<div class="size-5">
					<IconFlame class="text-gray-600 transition-colors duration-300" :class="lightModeIcon ? 'text-yellow-500' : 'text-gray-600'" />
				</div>

				<RockerSwitch @switch-toggle="switchSiteTheme" />
			</div>
		</div>
	</nav>
</template>

<style scoped>
header {
	position: relative;
	user-select: none;
}

/* -- yeti banner -- */
header > .banner {
	position: relative;
	height: 78px;
	overflow: hidden;
	z-index: 1;

	.background {
		position: absolute;
		width: 2000px;
		height: 150px;
		left: 50%;
		top: -24px;
		margin-left: -1000px;
		background-image: url('@/assets/images/header.png');
		background-size: cover;
	}

	h1.site-branding {
		position: absolute;
		top: 25px;
		color: #fff;
		font-family: "Sintony", sans-serif;
		font-weight: 700;
		font-size: 18px;


		.highlight {
			color: rgb(135, 121, 145);
		}

	}
}

/* -- top navigation -- */
nav.navigation-top {
	position: sticky;
	top: 0;
	height: 32px;
	background-color: #000;
	z-index: 2;

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
			color: #4a5565;
		}
		.social-link:hover {
			font-size: 21px;
			line-height: 33px;
			color: #e5ebf7;
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

		&:hover {
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
	background-color: var(--my-navbar-background);
	border-bottom: 3px solid #111;
	box-shadow: 0 2px 15px 0 #111;
	z-index: 99;

	.nav-button-row {
		display: flex;
		flex-direction: row;
		flex-grow: 1;
		margin-left: -10px;

		.nav-button {
			position: relative;
			height: 55px;
			line-height: 40px;
			padding: 0 7px;
			color: #ccc;
			font-family: "Titillium Web", sans-serif;
			font-size: 12px;
			text-align: center;
			text-transform: uppercase;
			user-select: none;
			flex-grow: 1;

			&.active, &:hover {
				background-color: #000;
				color: #fff;
			}

			&::before {
				display: block;
				position: absolute;
				content: '';
				width: 10px;
				height: 15px;
				left: 0;
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
				left: 50%;
				transform: translateX(-50%);
				top: 36px;
				width: 5px;
				height: 5px;
				background-color: #505050;
				border-radius: 50%;
			}
			&.active::after {
				background-color: rgb(26, 214, 26);
				box-shadow: 0 0 10px 2px rgb(26, 214, 26);
			}
		}
	}
}

/* -- responsive breakpoints -- */

@media (min-width: 500px) {
	nav.navigation-main {
		.nav-button-row {
			.nav-button {
				height: 55px;
				padding: 0 25px 0 0;
				line-height: 55px;
				font-size: 13px;
				text-align: left;
				flex-grow: 0;

				&::before {
					display: block;
					position: relative;
					float: left;
					width: 30px;
					height: 14px;
					top: 38px;
					border-left: 1px solid #2a2a2a;
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
					background-color: #555;
				}
			}
		}
	}
}
</style>
