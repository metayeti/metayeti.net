<script setup>
import { loadJSON } from '@/shared';
import { ref, onMounted, useTemplateRef, computed } from 'vue';
import { RouterLink } from 'vue-router';

// -- data handling --

const blogListing = ref([]);

onMounted(async () => {
	const blogData = await loadJSON('/content/blog/index.json');
	blogListing.value = blogData.posts;
});

const postsByYear = computed(() => {
	const groupedPosts = new Map();

	blogListing.value.forEach(post => {
		// extract year from date published
		const year = new Date(post['date-published']).getFullYear();
		if (!groupedPosts.has(year)) {
			groupedPosts.set(year, []);
		}
		groupedPosts.get(year).push(post);
	});

	return groupedPosts;
});

const tagList = computed(() => {
	const s = new Set();
	blogListing.value.forEach(post => {
		if (post.tags) {
			s.add(...post.tags);
		}
	});
	return [...s].sort();
});

// -- search --
const searchInput = useTemplateRef('search-input');

const handleSearch = () => {
	const searchTerm = searchInput.value.value;
	console.log(searchInput.value.value);
};
</script>

<template>
	<!-- <br v-for="i in 100" :key="i"> -->
	<div class="flex flex-col-reverse items-start md:flex-row gap-20 md:gap-5">
		<div class="flex-1">

			<h2>All Posts</h2>

			<div
				v-for="(item, index) in postsByYear"
				:key="item[0]"
			>
				<h3>{{ item[0] }}</h3>

				<div
					v-for="data in item[1]"
				>
					<div>{{ data }}</div>
				</div>
			</div>
		</div>
		<div class="sidebar flex-none p-3 flex flex-col gap-9 md:max-w-70">

			<form @submit.prevent="handleSearch" class="search-box flex flex-row">
				<input ref="search-input" type="text" placeholder="Search posts ...">
				<button type="submit" title="Search">
					<font-awesome-icon icon="fa-solid fa-search" class="size-5" />
				</button>
			</form>

			<div class="flex flex-col gap-3">
				<h5>Topics</h5>
				<div class="tag-list flex flex-row flex-wrap gap-2">

					<button
						v-for="item in tagList"
						:key="item"
						class="tag"
					>
						{{ item }}
					</button>
				</div>		
			</div>

			<!--
			<div class="flex flex-col gap-3">
				<h5>By Year</h5>
				<div class="tag-list flex flex-row flex-wrap gap-2">
					<span class="tag">2026</span>
					<span class="tag">2025</span>
					<span class="tag">2018</span>
				</div>
			</div>
			-->

		</div>
	</div>
</template>

<style scoped lang="scss">
.sidebar {
	background-color: var(--my-sidebar-background);

	h5 {
		padding: 0;
		margin: 0;
		color: var(--my-sidebar-heading);
		font-size: 15px;
		font-weight: 600;
	}

	form.search-box {
		&:has(input:focus),
		&:has(button:focus) {
			outline: 2px solid var(--my-sidebar-searchbox-focus);
		}
		input {
			width: 100%;
			color: var(--my-sidebar-searchbox-text);
			background-color: var(--my-sidebar-searchbox);
			padding: 5px 8px;
			font-size: 16px;
			&:focus {
				outline: none;
			}
			+button {
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: var(--my-sidebar-searchbox);
				color: var(--my-sidebar-search-button-icon);
				padding: 0 10px;
				cursor: pointer;

				&:hover {
					color: var(--my-siderbar-search-button-icon-highlight);
				}
			}
		}
	}

	.tag-list > .tag {
		background-color: var(--my-sidebar-tag-background);
		color: var(--my-sidebar-tag-text);
		padding: 3px 9px;
		//font-family: "Titillium Web", sans-serif;
		font-size: 16px;
		font-weight: 400;
		border-radius: 5px;
		cursor: pointer;

		&:hover {
			background-color: var(--my-sidebar-tag-background-highlight);
			color: var(--my-sidebar-tag-text-highlight);
		}
	}
}
</style>