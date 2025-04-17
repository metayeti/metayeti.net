<script setup>
import IconFlame from './icons/IconFlame.vue';

import RockerSwitch from './RockerSwitch.vue';

import { RouterLink } from 'vue-router';
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
		<div class="banner">
			<div class="pixelated background"></div>
			<div class="pixelated yeti"></div>
		</div>
		<nav class="navigation-top">
			<div class="wrap social-link-row">
				<a class="social-link tooltip" href="#" target="_blank">
					<font-awesome-icon icon="fa-brands fa-facebook" />
					<span class="tooltip-text">FriendFace</span>
					<div class="tooltip-arrow"></div>
				</a>
				<a class="social-link tooltip" href="#" target="_blank">
					<font-awesome-icon icon="fa-brands fa-x-twitter" />
					<span class="tooltip-text">Twitter</span>
					<div class="tooltip-arrow"></div>
				</a>
				<a class="social-link tooltip" href="#" target="_blank">
					<font-awesome-icon icon="fa-brands fa-github" />
					<span class="tooltip-text">Code</span>
					<div class="tooltip-arrow"></div>
				</a>
				<a class="social-link tooltip" href="#" target="_blank">
					<font-awesome-icon icon="fa-brands fa-linkedin" />
					<span class="tooltip-text">Ego</span>
					<div class="tooltip-arrow"></div>
				</a>
				<a class="social-link tooltip" href="#" target="_blank">
					<font-awesome-icon icon="fa-brands fa-reddit-alien" />
					<span class="tooltip-text">Read it</span>
					<div class="tooltip-arrow"></div>
				</a>
				<a class="social-link tooltip" href="#" target="_blank">
					<font-awesome-icon icon="fa-brands fa-youtube" />
					<span class="tooltip-text">Ye Olde Tube</span>
					<div class="tooltip-arrow"></div>
				</a>
			</div>
		</nav>
		<nav class="navigation-main">
			<!-- <div class="wrap flex flex-row"> -->
			<div class="wrap flex flex-row gap-1.5">
				<div class="nav-button-row">
					<RouterLink class="nav-button active" to="/">home</RouterLink>
					<RouterLink class="nav-button" to="/projects">projects</RouterLink>
					<RouterLink class="nav-button" to="/blog">blog</RouterLink>
					<RouterLink class="nav-button" to="/about">about</RouterLink>
				</div>

				<div class="flex flex-row items-center gap-1.5 pr-[8px]">

					<div class="size-5">
						<IconFlame class="text-gray-600 transition-colors duration-300" :class="lightModeIcon ? 'text-yellow-500' : 'text-gray-600'" />
					</div>

					<RockerSwitch @switch-toggle="switchSiteTheme" />
				</div>
			</div>
		</nav>
	</header>
</template>

<style scoped>
header {
	user-select: none;
}

/* -- yeti banner -- */
header > .banner {
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

/* -- top navigation -- */
header > nav.navigation-top {
	position: sticky;
	top: 0;
	height: 32px;
	background-color: #000;

	.social-link-row {
		display: flex;
		height: 100%;
		justify-content: end;
		align-items: center;
		flex-direction: row;
		gap: 1px;
		padding-right: 8px;

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
header > nav.navigation-main {
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
	header > nav.navigation-main {
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
	}
}
</style>
