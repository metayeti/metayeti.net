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
	<div class="flex flex-col gap-6">
		<div class="project-reel">
			<ul class="latest-projects flex flex-row">
				<li
					v-for="item in projectsListing.slice(0, 3)"
				>
					{{item.title}}
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
			width: 100px;
			height: 100px;
			border: 2px solid #333;
			background-color: #181818;
			cursor: pointer;

			&:nth-child(n+2) {
				margin-left: -20px;
			}

			@for $i from 1 through 3 {
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