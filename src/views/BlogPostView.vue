<script setup>
import { constants, getHumanReadableDateFull, loadJSON, loadText, md } from '@/shared';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

// -- load markdown and handle rendering --

const renderedArticleMarkdown = ref('');

const postListing = ref({});

onMounted(async () => {
	const route = useRoute();
	const routeSlug = route.params.slug;
	const blogData = await loadJSON(`/content/blog/${constants.FILENAME_BLOG_LISTING}`);
	const postData = blogData.posts.find(post => post.slug === routeSlug);
	postListing.value = postData;
	const articlePath = `/content/blog/${routeSlug}/article.md`;
	const articleMarkdown  = await loadText(articlePath);
	renderedArticleMarkdown.value = md.render(articleMarkdown);
});

</script>

<template>
	<section class="post-header flex flex-col">
		<RouterLink to="/blog" custom v-slot="{navigate}">
			<button @click="navigate" class="back">
				<font-awesome-icon icon="fa-solid fa-arrow-left" />
			</button>
		</RouterLink>
		<div class="tag-list flex flex-wrap gap-2">
			<span
				class="tag"
				v-for="tag in postListing.tags"
				:key="tag"
			>
				<span>{{ tag }}</span>
			</span>
		</div>
		<h2 class="post-title">{{ postListing.title }}</h2>
		<span class="post-description">{{ postListing.description }}</span>
		<span class="post-date-published py-3">
			<font-awesome-icon class="pr-2" icon="fa-solid fa-calendar-days" />
			{{ getHumanReadableDateFull(postListing['date-published']) }}
		</span>
	</section>
	<article v-html="renderedArticleMarkdown"></article>
	<section class="post-footer">
		<span class="post-date-updated">
			Article last updated:
			<font-awesome-icon class="px-2" icon="fa-solid fa-calendar-days" />
			{{ getHumanReadableDateFull(postListing['date-updated']) }}
		</span>	
	</section>
</template>

<style scoped lang="scss">
.post-header {
	.back {
		width: 40px;
		height: 40px;
		color: var(--my-content-text);
		border: 2px solid var(--my-content-accent);
		transform: skewX(-10deg);
		padding-right: 2px;
		cursor: pointer;
		* {
			transform: skewX(10deg);
		}
		&:hover, &:focus {
			border-color: var(--my-content-link);
			transform: skewX(-10deg) translateX(-1px);
		}
	}
	.tag-list {
		padding-top: 50px;

		.tag {
			color: var(--my-content-accent-text);
			background-color: var(--my-content-accent);
			padding: 2px 8px;
			font-family: "Titillium Web", sans-serif;
			font-size: 15px;
			transform: skewX(-10deg);

			span {
				display: inline-block;
				transform: skewX(10deg);
			}
		}
	}
	h2.post-title {
		border: 0;
		padding: 0;
		margin: 9px 0 5px 0;
		font-size: 2.2rem;
		line-height: 2.4rem;
	}
	.post-description {
		color: var(--my-content-text-dimmed);
	}
	.post-date-published {
		font-size: 13px;
	}
}
.post-footer {
	.post-date-updated {
		font-size: 13px;
		text-align: right;
	}
}
</style>