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
	<div class="flex flex-col gap-1">
		<ul class="projects-tab-list">
			<div class="tabs flex flex-row flex-wrap-reverse gap-1 justify-end">
				<li v-for="(item, i) in projectsListing.categories" >
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
			</div>
		</ul>
		<section class="projects-tab-view">
			<p class="caption"><br>Clonk! Crank! Whizzzz!<br>Uh oh - the gears seem to be stuck.<br>The hamsters are already working on it.<br></p>
		</section>
	</div>
</template>

<style scoped lang="scss">
.projects-tab-list {
	.tabs {
		transform: translateX(8px);
		button {
			position: relative;
			padding: 4px 20px;
			text-align: center;
			cursor: pointer;
			color: var(--my-content-accent-text);
			border-top: 2px solid transparent;
			font-family: "Titillium Web", sans-serif;
			font-size: 1rem;

			transform: skewX(-25deg);
			scale: 0.96;

			span {
				transform: skewX(25deg);
				&.icon, &.display {
					color: var(--my-content-text-dimmed);
				}
			}
			&.active, &:hover {
				scale: 1;
				background-color: var(--my-content-accent);

				.icon, .display {
					color: var(--my-content-link-hover);
				}
			}
			&.active {
				border-top: 2px solid var(--my-content-link);
				.icon {
					color: var(--my-content-link);
				}
			}
		}
	}
}
.projects-tab-view {
	border: 2px solid var(--my-content-accent);
	padding: 10px;
}
</style>