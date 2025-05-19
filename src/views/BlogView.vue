<script setup>
import { constants, getHumanReadableDateWithoutYear, loadJSON } from '@/shared';
import { ref, onMounted, useTemplateRef, computed } from 'vue';
import { RouterLink } from 'vue-router';

// -- data handling --

const blogListing = ref([]);

onMounted(async () => {
	const blogData = await loadJSON(`/content/blog/${constants.FILENAME_BLOG_LISTING}`);
	blogListing.value = blogData?.posts ?? [];
});

const postsByYear = computed(() => {
	const computedPosts = new Map();
	blogListing.value.forEach(post => {
		// extract year from date published
		const year = new Date(post['date-published']).getFullYear();
		if (!computedPosts.has(year)) {
			computedPosts.set(year, []);
		}
		computedPosts.get(year).push(post);
	});

	return computedPosts;
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
const isSearchInputWiggling = ref(false);
let wiggleTimeout = null;
const wiggleDuration = 350;

const handleSearch = () => {
	const searchTerm = String(searchInput.value.value).trim();
	if (searchTerm === '') {
		// empty box, wiggle search to indicate
		isSearchInputWiggling.value = true;
		wiggleTimeout = setTimeout(() => {
			isSearchInputWiggling.value = false;
		}, wiggleDuration);
		// all done here
		return;
	}
};
</script>

<template>
	<div class="flex flex-col md:items-start md:flex-row gap-10 md:gap-12">
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
						class="blog-entry md:pb-[10px]"
						v-for="postData in data"
						:key="postData.title"
					>
						<div class="tag-list flex flex-row flex-wrap justify-end gap-1.5">
							<button
								v-for="tag in postData.tags"
								:key="tag"
								class="tag"
							>
								<span class="tag-name">{{ tag }}</span>
							</button>
						</div>
						<RouterLink
							class="blog-link"
							:to="`/blog/${postData.slug}`"
						>
							<div class="entry-date">{{ getHumanReadableDateWithoutYear(postData['date-published']) }}</div>
							<div class="entry-title pt-2.5">{{ postData.title }}</div>

							<div class="entry-description">
								{{ postData.description }}
							</div>
							<div class="cta pt-5">Read More -></div>
						</RouterLink>
					</div>
				</div>
			</div>
		</div>
		<div class="sidebar flex-none flex flex-col gap-9 md:max-w-67">
			<form
				@submit.prevent="handleSearch"
				class="search-box flex flex-row"
				:class="{ 'animate-wiggle': isSearchInputWiggling }"
			>
				<input ref="search-input" type="text" placeholder="Search posts ...">
				<button type="submit" title="Search">
					<font-awesome-icon icon="fa-solid fa-search" class="size-5" />
				</button>
			</form>

			<div class="flex flex-col gap-3">
				<h5>Tags</h5>
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
		.tag-list {
			width: calc(100% + 4px);
			.tag {
				cursor: pointer;
				color: var(--my-content-text-dimmed);
				padding: 3px 9px;
				font-size: 12px;
				font-weight: 400;
				cursor: pointer;
				transform: skewX(-20deg);

				&:hover {
					color: var(--my-content-link-hover);
					outline: 2px solid var(--my-content-link);
					transform: skewX(-20deg) translateX(-1px);
				}
				.tag-name {
					display: inline-block;
					transform: skewX(20deg);
				}
			}
		}
		.blog-link {
			display: block;
			border-top: 2px solid var(--my-content-accent);
			padding: 10px 0;

			&:hover, &:focus {
				border-color: var(--my-content-link);
				transform: translateX(-1px);
			}
			.entry-date {
				font-family: "Titillium Web", sans-serif;
				color: var(--my-content-bullet);
				font-weight: bold;
				font-size: 15px;
			}
			.entry-title {
				color: var(--my-content-text);
				font-size: 16px;
			}

			.entry-description {
				font-size: 13px;
				color: var(--my-content-text-dimmed);
			}

			.cta {
				display: inline-block;
				font-size: 13px;
				color: var(--my-content-link);
				border-bottom: 2px solid transparent;
			}
			&:hover {
				.cta {
					color: var(--my-content-link-hover);
					border-bottom: 2px solid var(--my-content-link);
				}
			}
		}
	}
}
.sidebar {
	//position: relative;
	padding: 10px;
	border: 2px solid var(--my-content-accent);

	h5 {
		padding: 0;
		margin: 0;
		color: var(--my-sidebar-heading);
		font-size: 15px;
		font-weight: 600;
	}

	form.search-box {
		&:has(input:focus),
		&:has(input:hover),
		&:has(button:focus),
		&:has(button:hover) {
			outline: 2px solid var(--my-content-link);
		}
		input {
			width: 100%;
			color: var(--my-sidebar-searchbox-text);
			background-color: var(--my-sidebar-searchbox);
			padding: 5px 8px;
			font-size: 16px;
			&:focus {
				outline: none;
				background-color: var(--my-sidebar-searchbox-focus-background);
			}
			+button {
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: var(--my-sidebar-searchbox);
				color: var(--my-sidebar-search-button-icon);
				padding: 0 10px;
				cursor: pointer;
				touch-action: manipulation;

				&:hover {
					color: var(--my-siderbar-search-button-icon-highlight);
				}
			}
		}

		@media screen and (width < 768px) {
			position: absolute;
			width: 200px;
			right: 20px;
			top: -9vh;
			border: 2px solid var(--my-content-accent);
			padding: 5px;
			margin-bottom: 20px;
			transition: width 120ms ease-out;


			&:has(input:focus),
			&:has(input:hover),
			&:has(button:focus),
			&:has(button:hover) {
				border-color: transparent;
			}
			&:has(input:focus),
			&:has(button:focus) {
				width: 300px;
			}
		}
	}

	.tag-list > .tag {
		background-color: var(--my-sidebar-tag-background);
		color: var(--my-sidebar-tag-text);
		font-size: 12.5px;
		font-weight: 400;
		cursor: pointer;
		transform: skewX(-10deg);
		border: 2px solid var(--my-sidebar-tag-background);

		&:hover {
			color: var(--my-sidebar-tag-text-highlight);
			outline: 2px solid var(--my-content-link);
			transform: skewX(-10deg) translateX(-1px);
		}

		.tag-name {
			display: inline-block;
			padding-left: 8px;
			transform: skewX(10deg);
		}
		.tag-count {
			display: inline-block;
			padding: 2px 7.5px;
			margin-left: 10px;
			background-color: var(--my-sidebar-tag-count-background);
			color: var(--my-sidebar-tag-count-text);
			font-weight: 700;
		}
	}
}
</style>