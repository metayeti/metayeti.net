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
	<div class="flex flex-col">
		<!-- <div class="overflow-x-scroll overflow-y-hidden"> -->
			<ul class="projects-tab-list flex flex-row flex-wrap-reverse gap-1 justify-end">
				<li v-for="(item, i) in projectsListing.categories">
					<button
						:class="i === 0 ? 'active' : ''"
						class="flex flex-row gap-3 items-center"
					>
						<span class="icon">
							<font-awesome-icon :icon="'fa-solid fa-' + item.icon" class="size-5" />
						</span>
						<span class="display">
							{{ item.display }}
						</span>
					</button>
				</li>
			</ul>
		<!-- </div> -->
		<section class="projects-tab-view">
			<p class="caption"><br>Clonk! Crank! Whizzzz!<br>Uh oh - the gears seem to be stuck.<br>The hamsters are already working on it.<br></p>
		</section>
	</div>
</template>

<style scoped lang="scss">
.projects-tab-list {
	min-width: min-content;
	//transform: translateX(-10px);
	button {
		position: relative;
		padding: 10px 22px;
		cursor: pointer;
		color: var(--my-content-accent-text);
		font-family: "Titillium Web", sans-serif;
		font-size: 0.95rem;
		font-weight: 600;

		scale: 0.96;

		span {
			//transform: skewX(-20deg);
			&.icon {
				color: var(--my-tab-icon);
			}
			&.display {
				color: var(--my-tab-label);
			}
		}
		&.active, &:hover {
			scale: 1;
			//background-color: var(--my-content-accent);
			//background-color: var(--my-content-accent);
			//border-color: var(--my-content-accent);

			.icon, .display {
				color: var(--my-content-link-hover);
			}
		}
		&.active {
			//border-top: 2px solid var(--my-content-link);
			.icon {
				color: var(--my-content-link);
			}
			&::before {
				content: '';
				position: absolute;
				width: 0;
				height: 0;
				right: 0;
				bottom: 0;
				//background-color: orange;
				/*
				border-top: transparent;
				border-right: transparent;
				border-left: 10px solid orange;
				border-bottom: 10px solid orange;
				*/
				border-style: solid;
				border-width: 0 0 10px 12px;
				border-color: transparent transparent var(--my-content-link) transparent;
			}
			&::after {
				content: '';
				position: absolute;
				width: 100%;
				height: 2px;
				bottom: -2px;
				left: 0;
				background-color: var(--my-content-link);
				//clip-path: polygon(0 0, 100% 0, 93% 100%, 7% 100%);
			}
		}
	}
}
.projects-tab-view {
	border: 2px solid var(--my-content-accent);
	//background-color: var(--my-content-accent);
	padding: 10px;
}
</style>