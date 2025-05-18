<script setup>
import { constants, getHumanReadableDateFull, getHumanReadableMinutes, loadJSON, loadText, md } from '@/shared';
import { ref, onMounted } from 'vue';
import { useRoute, RouterLink } from 'vue-router';

// -- load markdown and handle rendering --

function estimateReadingTime(text, wordsPerMinute = 200) {
	const words = text.split(' ').length;
	const minutes = Math.ceil(words / wordsPerMinute);
	return minutes;
}

const renderedArticleMarkdown = ref('');
const postListing = ref({});
const readingTime = ref('');

onMounted(async () => {
	const route = useRoute();
	const routeSlug = route.params.slug;
	const blogData = await loadJSON(`/content/blog/${constants.FILENAME_BLOG_LISTING}`);
	const postData = blogData.posts.find(post => post.slug === routeSlug);
	postListing.value = postData;
	const articlePath = `/content/blog/${routeSlug}/article.md`;
	const articleMarkdown  = await loadText(articlePath);
	renderedArticleMarkdown.value = md.render(articleMarkdown);
	// compute get article stats
	const articlePlainText = articleMarkdown
		.replace(/[#*`~\[\]\(\)]/g, '') // remove markdown symbols
		.replace(/\s+/g, ' ') // normalize whitespace
		.trim();
	const readingTimeInMinutes = estimateReadingTime(articlePlainText);
	readingTime.value = getHumanReadableMinutes(readingTimeInMinutes);
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
		<span class="post-meta py-3 flex flex-row gap-5">
			<span>
				<font-awesome-icon class="pr-1.5" icon="fa-solid fa-calendar-days" />
				{{ getHumanReadableDateFull(postListing['date-published']) }}
			</span>
			<span v-if="readingTime">
				<font-awesome-icon class="pr-1.5" icon="fa-solid fa-clock" />
				{{ readingTime }} read
			</span>
		</span>
	</section>
	<article v-html="renderedArticleMarkdown"></article>
	<section class="post-footer">
		<span class="post-date-updated">
			Article last updated:
			<font-awesome-icon class="pl-4 pr-1.5" icon="fa-solid fa-calendar-days" />
			{{ getHumanReadableDateFull(postListing['date-updated']) }}
		</span>	
		<div class="about-author flex flex-row gap-5">
			<img src="@/assets/images/photo_small.jpg" alt="">
			<div>
				<h5>About the author</h5>
				<p>by <RouterLink to="/about" class="link">Danijel Durakovic</RouterLink> - game developer, blogger, digital creator.</p>
			</div>
		</div>
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
		margin: 10px 0 5px 0;
		font-size: 2.2rem;
		line-height: 2.4rem;
	}
	.post-description {
		color: var(--my-content-text-dimmed);
	}
	.post-meta {
		font-size: 13px;
	}
}
.post-footer {
	.post-date-updated {
		font-size: 13px;
		text-align: right;
	}
	.about-author {
		border: 2px solid var(--my-content-accent);
		margin-top: 30px;
		padding: 15px;
		img {
			width: 130px;
			//filter: grayscale(1);
		}
		h5 {
			font-size: 1rem;
			padding: 0;
			margin: 0 0 10px 0;
		}
		p {
			padding: 0;
			margin: 0;
			font-size: 0.8rem;
			line-height: 1.3rem;;
			color: var(--my-content-text-dimmed);
		}
	}
}
</style>