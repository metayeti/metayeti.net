<script setup>
import { constants, getHumanReadableDateWithoutYear, loadJSON } from '@/shared';
import { ref, onMounted, useTemplateRef, computed } from 'vue';
import { RouterLink } from 'vue-router';

// -- data handling --

const blogListing = ref([]);

onMounted(async () => {
	const blogData = await loadJSON(`/content/blog/${constants.FILENAME_BLOG_LISTING}`);
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
	<div class="flex flex-col md:items-start md:flex-row-reverse gap-20 md:gap-20">
		<div class="blog-posts flex-1">

			<h2>All Posts</h2>

			<div
				class="pb-[60px]"
				v-for="[year, data] in postsByYear"
				:key="year"
			>
				<h3>{{ year }}</h3>

				<div class="flex flex-col gap-5">
					<div
						class="blog-entry"
						v-for="post_data in data"
						:key="post_data.title"
					>

						<div class="tag-list flex flex-row flex-wrap gap-1 justify-end">
							<button
								v-for="tag in post_data.tags"
								:key="tag"
								class="tag"
							>
								<span class="tag-name">{{ tag }}</span>
							</button>
						</div>
						<RouterLink
							class="blog-link"
							:to="`/blog/${post_data.slug}`"
						>
							<!-- <div>{{ post_data }}</div> -->
							<div class="entry-date pt-1">{{ getHumanReadableDateWithoutYear(post_data['date-published']) }}</div>
							<div class="entry-title pt-1.5">{{ post_data.title }}</div>

							<div class="entry-description">
								{{ post_data.description }}
							</div>


							<div class="cta pt-5">Read More -></div>
						</RouterLink>
					</div>
				</div>
			</div>
		</div>
		<div class="sidebar flex-none p-3 flex flex-col gap-9 md:max-w-75">

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

		.tag-list {
			position: relative;
			width: 70%;
			margin-left: 30%;
			background-color: var(--my-content-accent);

			&::before {
				position: absolute;
				content: '';
				width: 20.5px;
				height: 101%;
				left: -20px;
				background-color: var(--my-content-accent);
				clip-path: polygon(100% 0, 100% 100%, 20% 100%);
			}

			.tag {
				//background-color: var(--my-content-accent);
				color: var(--my-content-accent-text);
				padding: 3px 9px;
				font-size: 12px;
				font-weight: 400;
				cursor: pointer;
				//transform: skewX(-10deg);

				&:hover {
					background-color: var(--my-sidebar-tag-background-highlight);
					color: var(--my-sidebar-tag-text-highlight);
				}

				.tag-name {
					//transform: skewX(10deg);
				}
			}
		}

		.blog-link {
			border: 2px solid var(--my-content-accent);
			display: block;
			padding: 10px;

			&:hover, &:focus {
				border-color: var(--my-content-link);
				transform: translateX(-1px);
			}
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
		}


		.cta {
			display: inline-block;
			font-size: 13px;
			color: var(--my-content-link);
		}
		&:hover {
			.cta {
				border-bottom: 2px solid var(--my-content-link);
			}
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
		font-size: 13px;
		font-weight: 400;
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
		}
	}
}
</style>