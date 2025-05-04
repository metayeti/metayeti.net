<script setup>
import IconFlame from './icons/IconFlame.vue';

import RockerSwitch from './RockerSwitch.vue';

import { RouterLink, useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import { switchTheme } from '@/shared';

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

// -- site theme handling --

const lightModeIcon = ref(false);

const switchSiteTheme = (lightMode) => {
	lightModeIcon.value = lightMode;
	switchTheme(lightMode);
}


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
			
			<a class="social-link tooltip" href="https://www.facebook.com/profile.php?id=100095050669741" target="_blank">
				<font-awesome-icon icon="fa-brands fa-facebook" />
				<span class="tooltip-text">Facebook</span>
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
		
			<a class="social-link tooltip" href="https://x.com/metayetidev" target="_blank">
				<font-awesome-icon icon="fa-brands fa-x-twitter" />
				<span class="tooltip-text">X</span>
				<div class="tooltip-arrow"></div>
			</a>
			
			<!-- <a class="social-link tooltip" href="https://bsky.app/profile/metayeti.bsky.social" target="_blank">
				<font-awesome-icon icon="fa-brands fa-bluesky" />
				<span class="tooltip-text">Bluesky</span>
				<div class="tooltip-arrow"></div>
			</a> -->

			<a class="social-link tooltip" href="https://www.reddit.com/user/metayeti2/" target="_blank">
				<font-awesome-icon icon="fa-brands fa-reddit-alien" />
				<span class="tooltip-text">Reddit</span>
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
		/* header backgrounds make sure that the correct
		   banner colors continue past the banner picture */
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
	background-color: var(--my-navigation-color1);
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
			color: #4a5565;

			&:hover, &:focus {
				font-size: 21px;
				line-height: 33px;
				color: #e5ebf7;
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
	background-color: var(--my-navigation-color2);
	border-bottom: 3px solid var(--my-navigation-border);
	//overflow: hidden;
	z-index: 99;

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
			color: #9faac4;
			font-family: "Titillium Web", sans-serif;
			font-size: 12px;
			text-align: center;
			text-transform: uppercase;
			user-select: none;
			flex-grow: 1;

			&.active, &:hover, &:focus {
				background-color: var(--my-navigation-color1);
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
				background-color: #505050;
				border-radius: 50%;
			}
			/*
			&:hover::after, &:focus::after {
				background-color: #e79d14;
				box-shadow: 0 0 10px 2px #e79d14;
			}
			*/
			&.active::after {
				background-color: #1ad61a;
				box-shadow: 0 0 10px 2px #1ad61a;
			}

			@media (min-width: 520px) {
				height: 55px;
				padding: 0 25px 0 0;
				line-height: 55px;
				font-size: 13px;
				font-weight: 400;
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
					background-color: #555;
				}
			}
		}
	}
}
</style>
