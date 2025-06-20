<script setup>
import { constants, loadJSON } from '@/shared';
import { updateTitle } from '@/shared';
import { onMounted, ref } from 'vue';

// -- data handling --
const projectsListing = ref([]);

onMounted(async () => {
	updateTitle();

	const projectsData = await loadJSON(`/content/projects/${constants.FILENAME_PROJECTS_LISTING}`);
	projectsListing.value = projectsData ?? [];
});
</script>

<template>
	<ul class="projects-tab-list">
		<div class="tabs flex flex-row gap-3">
			<li v-for="(item, i) in projectsListing.categories" >
				<button :class="i === 0 ? 'active' : ''">{{ item['display'] }}</button>
			</li>
		</div>
		<div class="decoration"></div>
	</ul>
	<div class="projects-tab-view">

	</div>
	<p class="caption"><br>Clonk! Crank! Whizzzz!<br>Uh oh - the gears seem to be stuck.<br>Gnomes are already working on it.<br></p>
</template>

<style scoped lang="scss">
.projects-tab-list {
	.tabs {
		button {
			position: relative;
			padding: 4px 15px;
			margin-left: 15px;
			margin-right: 15px;
			text-align: center;
			cursor: pointer;
			color: var(--my-content-accent-text);
			border-bottom: 2px solid transparent;
			scale: 0.95;

			&.active, &:hover {
				scale: 1;
				color: var(--my-content-link-text);
				background-color: var(--my-content-accent);

				&::before, &::after {
					background-color: var(--my-content-accent);
				}
			}
			&:hover {
				border-bottom: 2px solid var(--my-content-text-dimmed);
			}
			&.active {
				border-bottom: 2px solid var(--my-content-link);
			}

			&::before {
				content: '';
				position: absolute;
				width: 15px;
				height: 100%;
				top: 0;
				left: -14.5px;
				clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 100%);
			}

			&::after {
				content: '';
				position: absolute;
				width: 15px;
				height: 100%;
				top: 0;
				right: -14.5px;
				clip-path: polygon(0 0, 100% 100%, 0 100%, 0 100%);
			}
		}
	}
	.decoration {
		position: relative;
		width: 100%;
		height: 5px;
		top: -0.5px;
		background-color: var(--my-content-accent);
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
	}
}
</style>