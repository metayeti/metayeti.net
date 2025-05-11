<script setup>
import { getHumanReadableDate, loadJSON } from '@/shared';
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';

const blogListing = ref([]);

onMounted(async () => {
	const blogData = await loadJSON('/content/blog/index.json');
	blogListing.value = blogData.posts;
});
</script>

<template>
	<div class="flex flex-col gap-6">
		<ul v-if="blogListing.length" class="latest-posts flex flex-col gap-7.5">
			<li
				v-for="item in blogListing.slice(0, 3)"
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
		<!-- <p v-else>...</p> -->
		<div>
			<RouterLink to="/blog" class="link">More ...</RouterLink>
		</div>
	</div>
</template>

<style scoped lang="scss">
ul.latest-posts {
	a {
		position: relative;
		display: inline-block;
		color: var(--my-content-text);
		border-bottom: 2px solid transparent;

		.post-date {
			position: relative;
			padding: 0 13px;
			outline: 2px solid transparent;
			border-left: 2px solid var(--my-content-link);
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
			color: var(--my-content-text-dimmed);
			padding: 5px 0;
		}

		&:hover {

			border-bottom: 2px solid var(--my-content-link);
			left: -1px;

			.post-date {
				color: var(--my-content-link-hover);
				outline-color: var(--my-content-link);
				border-color: transparent;
			}
			.post-title {
				color: var(--my-content-link-hover);
			}
		}
	}
}
</style>