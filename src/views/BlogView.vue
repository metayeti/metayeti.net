<script setup>
import { getHumanReadableDateWithoutYear, loadJSON } from '@/shared';
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
    const tagCounts = new Map();
    blogListing.value.forEach(post => {
        if (Array.isArray(post.tags)) {
            post.tags.forEach(tag => {
                tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
            });
        }
    });
    // Return sorted array of [tag, count] pairs
    return Array.from(tagCounts.entries()).sort((a, b) => a[0].localeCompare(b[0]));
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
	<div class="blog-posts flex flex-col md:items-start md:flex-row gap-20 md:gap-10">
		<div class="flex-1">

			<h2>All Posts</h2>

			<div
				class="pb-[60px]"
				v-for="[year, data] in postsByYear"
				:key="year"
			>
				<h3>{{ year }}</h3>

				<div class="flex flex-col gap-5">
					<RouterLink
						class="blog-entry"
						:to="`/blog/${post_data.slug}`"
						v-for="post_data in data"
						:key="post_data.title"
					>

						<!-- <div class="tag-list flex flex-row flex-wrap gap-2">
							<button
								v-for="tag in post_data.tags"
								:key="tag"
								class="tag"
							>
								<span>{{ tag }}</span>
							</button>
						</div> -->



						<!-- <div>{{ post_data }}</div> -->
						<div class="entry-date">{{ getHumanReadableDateWithoutYear(post_data['date-published']) }}</div>
						<div class="entry-title pt-2">{{ post_data.title }}</div>

						<div class="entry-description">
							{{ post_data.description }}
						</div>


						<div class="cta pt-5">Read More -></div>
					</RouterLink>
				</div>
			</div>
		</div>
		<div class="sidebar flex-none p-3 flex flex-col gap-9 md:max-w-76">

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
						v-for="[tag, count] in tagList"
						:key="tag"
						class="tag"
					>
						<span class="tag-name">{{ tag }}</span>
						<span class="tag-count">{{ count }}</span>
					</button>
				</div>		
			</div>

		</div>
	</div>
</template>

<style scoped lang="scss">
.blog-posts {
	.blog-entry {
		padding: 10px;
		border: 2px solid #333;
		//border-radius: 15px;

		// transform: skewX(20deg);

		&:hover, &:focus {
			border-color: var(--my-content-link);
			transform: translateX(-1px);
		}

		// * {
		// 	transform: skewX(-20deg);
		// }

		.entry-date {
			font-family: "Titillium Web", sans-serif;
			color: #555;
			font-weight: bold;
			font-size: 15px;
		}
		.entry-title {
			color: #ccc;
			font-size: 16px;
		}

		.entry-description {
			font-size: 13px;
			color: #888;
		}

/*
		.tag-list > .tag {
			background-color: var(--my-sidebar-tag-background);
			color: var(--my-sidebar-tag-text);
			padding: 3px 9px;
			font-size: 11px;
			font-weight: 400;
			border-radius: 5px;
			cursor: pointer;

			&:hover {
				background-color: var(--my-sidebar-tag-background-highlight);
				color: var(--my-sidebar-tag-text-highlight);
			}

			.tag-name {
			}

		}
			*/

		.cta {
			font-size: 13px;
			color: var(--my-content-link);
		}


	}
}
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
		//padding: 3px 9px;
		//font-family: "Titillium Web", sans-serif;
		font-size: 13px;
		font-weight: 400;
		// border-radius: 5px;
		cursor: pointer;
		transform: skewX(-10deg);

		&:hover {
			background-color: var(--my-sidebar-tag-background-highlight);
			color: var(--my-sidebar-tag-text-highlight);
		}

		.tag-name {
			display: inline-block;
			padding-left: 10px;
			transform: skewX(10deg);
		}
		.tag-count {
			display: inline-block;
			padding: 3px 7.5px;
			margin-left: 10px;
			background-color: #444444;
			color: #868686;
			font-weight: 700;
			// border-radius: 16px;
			// transform: skewX(10deg);
		}
	}
}
</style>