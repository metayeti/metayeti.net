<script setup>
import { getHumanReadableDate, loadJSON } from '@/utils';
import { ref, onMounted } from 'vue';

const blogListing = ref([]);

onMounted(async () => {

	const blogData = await loadJSON('/content/blog/index.json');
	blogListing.value = blogData.posts;

});
</script>

<template>
	<ul v-if="blogListing.length" class="latest-posts flex flex-col gap-7">
		<li
			v-for="item in blogListing.slice(0, 5)"
			:key="item.id"
		>
			<a href="#">
				<div class="flex flex-row gap-3">
					<div class="post-date flex-none">
						<span>
							{{
								getHumanReadableDate(item['date-published'])
							}}
						</span>
					</div>
					<div class="post-title">
						<span>
							{{
								item['title']
							}}
						</span>
					</div>
				</div>
			</a>
		</li>
	</ul>
	<!-- <p v-else>Loading...</p> -->
</template>

<style scoped lang="scss">
ul.latest-posts {
	a {
		position: relative;
		display: inline-block;
		color: var(--my-content-text);
		//border-bottom: 3px solid #333;
		//padding-right: 10px;

		.post-date {
			position: relative;
			padding: 0 15px;
			line-height: 28px;
			//margin-bottom: -1px;
			max-height: 32px;
			clip-path: polygon(7% 0, 100% 0, 93% 100%, 0 100%);
			//transform: skew(-7deg);
			background-color: var(--my-content-accent);
			color: var(--my-content-accent-text);
			font-family: "Titillium Web", sans-serif;
			font-size: 14px;
			font-weight: 700;
		}

		&:hover {

			left: -1px;

			outline: 1px dashed var(--my-content-link);
			outline-offset: 8px;

			.post-date {
				color: var(--my-content-link);
			}
			.post-title {
				color: var(--my-content-link-hover);
			}
		}
	}
}
</style>