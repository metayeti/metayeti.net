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
				<div class="flex flex-row gap-4">
					<div class="post-date flex flex-none justify-middle items-center">
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
		border-bottom: 2px solid transparent;

		.post-date {
			position: relative;
			padding: 0 13px;
			//line-height: 28px;
			//margin-bottom: -1px;
			//max-height: 32px;
			//clip-path: polygon(7% 0, 100% 0, 93% 100%, 0 100%);
			outline: 2px solid #444;
			background-color: var(--my-content-accent);
			color: var(--my-content-accent-text);
			font-family: "Titillium Web", sans-serif;
			font-size: 14px;
			font-weight: 700;
			transform: skewX(-10deg);

			span {
				display: inline-block;
				transform: skewX(10deg);
			}
		}
		.post-title {
			color: #aaa;
			padding: 4px 0;
		}

		&:hover {

			border-bottom: 2px solid var(--my-content-link);
			//left: -1px;

			//outline: 1px dashed var(--my-content-link);
			//outline-offset: 8px;

			.post-date {
				color: var(--my-content-link-hover);
				outline-color: var(--my-content-link);
			}
			.post-title {
				color: var(--my-content-link-hover);
			}
		}
	}
}
</style>