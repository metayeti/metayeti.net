<script setup>
import { constants, loadJSON } from '@/shared';
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';

// -- data handling --

const projectsListing = ref([]);

onMounted(async () => {
	const projectsData = await loadJSON(`/content/projects/${constants.FILENAME_PROJECTS_LISTING}`);
	projectsListing.value = projectsData?.active ?? [];
});

</script>

<template>
	<div class="flex flex-col gap-9">
		<div class="project-reel">
			<ul class="latest-projects flex flex-row">
				<li
					v-for="item in projectsListing.slice(0, 6)"
				>
					<img :src="`/content/projects/${item.path}/${item.screenshots[0]}`" alt="">
				</li>
			</ul>
		</div>
		<div v-if="projectsListing.length > 3">
			<RouterLink to="/projects" class="link">More ...</RouterLink>
		</div>
	</div>
</template>

<style scoped lang="scss">
.project-reel {
	min-height: 10px;

	ul {
		li {
			position: relative;
			border: 5px solid var(--my-content-accent);
			background-color: var(--my-content-accent);
			cursor: pointer;
			box-shadow: 0 0 10px 0 #111;
			transition: scale 80ms ease-in-out;

			img {
				max-height: 200px;
			}

			&:first-child {
				scale: 1.1;
			}
			&:nth-child(n+2) {
				margin-left: -20px;
			}

			// limit number of items on mobile
			@media (width < 768px) {
				&:nth-child(n+5) {
					display: none;
				}
			}
			@media (width < 640px) {
				&:nth-child(n+4) {
					display: none;
				}
			}
			

			@for $i from 1 through 10 {
				&:nth-child(#{$i}) {
					z-index: 90 - $i + 1;
				}
			}

			&:hover {
				scale: 1.2;
				z-index: 99;
			}
		}
	}
}
</style>