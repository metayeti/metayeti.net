<script setup>
import { loadText, md, routeLinkHandler, shuffle } from '@/shared';
import { ref, onMounted, nextTick, useTemplateRef } from 'vue';
import { useRouter } from 'vue-router';
import { goodMusic, goodGameMusic } from '@/extras';

// -- load markdown and handle rendering --

const renderedAboutMarkdown = ref('');

onMounted(async () => {

	const aboutMarkdown = await loadText('/content/static/about.md');
	renderedAboutMarkdown.value = md.render(aboutMarkdown);

	// wait for DOM update, then make dynamic updates to content
	nextTick(() => handleDynamicContent());
});

// -- make router be able to use <a> from generated-html --

const router = useRouter();
const handleRouteLink = routeLinkHandler(router);

// -- handle dynamic content updates --

/**
 * Get age (in years) from a specific birth date.
 *
 * @returns {number}
 */
function getAge(birthDate) {
	return Math.floor((Date.now() - new Date(birthDate).getTime()) / 31557600000);
}

class MusicLinks {
	#data = null;
	#positions = [0, 0];
	constructor() {
		this.#data = [goodMusic, goodGameMusic];
		// shuffle music lists
		this.#data.forEach(arr => shuffle(arr));
	}
	#setRandomURLOn(element, list, index) {
		element.setAttribute('href', list[index]);
	}
	updateLinks(musicElement, gameMusicElement) {
		[musicElement, gameMusicElement].forEach((element, index) => element.addEventListener('mouseup', (e) => {
			if (e.button && e.button !== 1) return;
			if (++this.#positions[index] >= this.#data[index].length) { // cycle lists
				this.#positions[index] = 0;
			}
			this.#setRandomURLOn(element, this.#data[index], this.#positions[index]);
		}));
	}
}

const musicLinks = new MusicLinks();

function implColorHandles(elements) {
	function moveElement(e, element) {
		const rect = element.getBoundingClientRect();
		const x = e.clientX - rect.width  / 2 - 1;
		const y = e.clientY - rect.height / 2 + 2;
		element.style.left = `${x}px`;
		element.style.top = `${y}px`;
	}
	elements.forEach(element => {
		let moving = false;
		function _handlePress(e) {
			if ('buttons' in e && e.buttons !== 1) {
				return;
			}
			moving = true;
			element.classList.add('moving');
			moveElement(e, element);
		}
		function _handleMove(e) {
			if (!moving) {
				return;
			}
			moveElement(e, element);
		}
		function _handleRelease() {
			if (!moving) {
				return;
			}
			element.classList.remove('moving');
			element.removeAttribute('style');
		}
		element.addEventListener('mousedown', (e) => _handlePress(e));
		window.addEventListener('mousemove', (e) => _handleMove(e));
		window.addEventListener('mouseup', (e) => _handleRelease(e));
	});
}

/**
 * Handle dynamic data in generated markdown.
 */
const aboutPage = useTemplateRef('about-page');

function handleDynamicContent() {
	// update age data
	const ageElement = aboutPage.value.querySelector('.current-age');
	ageElement.textContent = getAge('1988-01-05');
	// update music links
	const musicElements = aboutPage.value.querySelectorAll('.factoids > ul > li > span.value > .music');
	musicLinks.updateLinks(...musicElements);
	// handle about colors
	const colorBoxElements = aboutPage.value.querySelectorAll('.color-box');
	implColorHandles(colorBoxElements);
}
</script>

<template>
	<article ref="about-page" v-html="renderedAboutMarkdown" @click="handleRouteLink"></article>
</template>

<style scoped lang="scss">
/*
NOTE: Since the contents of this page are generated dynamically via markdown, we need a
"deep selector" to keep styles for this component scoped.
*/
article :deep(img.me) {
	$mobile-breakpoint: 640px;

	display: none;
    border: 8px solid var(--my-image-border);
    box-shadow: 0 0 10px 0 var(--my-image-shadow);
	background-color: var(--my-image-border);

	@media (width > $mobile-breakpoint) {
		&.desktop {
			display: block;
			float: right;
			min-width: 289px;
			height: 350px;
			margin: 0 0 50px 35px;
		}
	}
	@media (width <= $mobile-breakpoint) {
		&.mobile {
			display: block;
			min-width: 260px;
			max-height: 450px;
			margin-bottom: 20px;
		}
	}
}

article :deep(.factoids) {
	.factoid {
		color: var(--my-content-text);
		font-family: "Titillium Web", sans-serif;
		font-weight: 600;
		font-size: 1.1rem;

		&::after {
			content: ':';
		}
	}
	.value {
		color: var(--my-content-text-dimmed);
		font-size: 1rem;		
	}

	img.blooguard {
		position: absolute;
		margin-top: -66px;
		margin-left: 260px;
		user-select: none;

		@media (width < 400px) {
			margin-left: auto;
			right: 35px;
		}
	}

	.color-box {
		display: inline-block;
		width: 38px;
		height: 24px;
		margin-bottom: -6px;
		margin-left: 5px;
		margin-right: 5px;
		border-top-left-radius: 15px;
		border-bottom-right-radius: 15px;
		overflow: hidden;
		user-select: none;
		box-shadow: 0 0 0 2px rgba(0,0,0,0.2);

		:root.let-there-be-light & {
			box-shadow: 0 0 0 2px rgba(0,0,0,0.6);
		}

		&::after {
			content: '';
			position: absolute;
			width: 19px;
			height: 24px;
			margin-left: 19px;
			border-bottom-right-radius: 15px;
			background-color: rgba(0,0,0,0.15);
		}
		&:hover {
			cursor: grab;
			scale: 1.1;
		}
		&:active {
			cursor: grabbing;
			scale: 1.2;
		}
		&.moving {
			position: fixed;
			z-index: 999;
		}
	}
}
</style>