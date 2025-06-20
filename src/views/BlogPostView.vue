<script setup>
import { constants, getHumanReadableDateFull, getHumanReadableMinutes, loadJSON, loadText, md, updateTitle } from '@/shared';
import { ref, onMounted } from 'vue';
import { useRoute, RouterLink } from 'vue-router';

// -- load markdown and handle rendering --

function estimateReadingTime(text, wordsPerMinute = 200) {
	const words = text.split(' ').length;
	const minutes = Math.ceil(words / wordsPerMinute);
	return minutes;
}

const articleRawMarkdownURL = ref('');
const renderedArticleMarkdown = ref('');
const postListing = ref({});
const readingTime = ref('');

const raw = { listing: null, markdown: ''};

onMounted(async () => {
	const route = useRoute();
	const routeSlug = route.params.slug;
	// load post data
	const blogData = await loadJSON(`/content/blog/${constants.FILENAME_BLOG_LISTING}`);
	const postData = blogData.posts.find(post => post.slug === routeSlug);
	postListing.value = raw.listing = postData;
	// update page title
	updateTitle(postData.title);
	// load article
	const articlePath = articleRawMarkdownURL.value = `/content/blog/${routeSlug}/article.md`;
	const articleMarkdown = raw.markdown = await loadText(articlePath);
	renderedArticleMarkdown.value = md.render(articleMarkdown);
	// estimate read time
	const articlePlainText = articleMarkdown
		.replace(/[#*`~[]()]/g, '') // remove markdown symbols
		.replace(/\s+/g, ' ') // normalize whitespace
		.trim();
	const readingTimeInMinutes = estimateReadingTime(articlePlainText);
	readingTime.value = getHumanReadableMinutes(readingTimeInMinutes);
});

// -- raw markdown --
const getRawMarkdown = () => {
	const markdown = `# ${raw.listing.title}
${raw.listing.description}

---

${raw.markdown}

---

Original article URL: ${window.location.href}

Published: ${getHumanReadableDateFull(raw.listing['date-published'])}${raw.listing['date-updated'] ? '\nUpdated: ' + getHumanReadableDateFull(raw.listing['date-updated']) : ''}

by Danijel Durakovic (https://metayeti.net)
`;

	const blob = new Blob([markdown], { type: 'text/markdown' });
	const url = URL.createObjectURL(blob);

	const a = document.createElement('a');
	a.href = url;
	a.download = 'article.md';
	a.click();

	URL.revokeObjectURL(url);
};

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
		<div class="flex flex-col flex-row justify-between">
			<div class="post-date-updated">
				Article last updated:
				<span>
					<font-awesome-icon class="pl-2.5 pr-1.5" icon="fa-solid fa-calendar-days" />
					{{ getHumanReadableDateFull(postListing['date-updated'] ? postListing['date-updated'] : postListing['date-published']) }}
				</span>
			</div>
			<div class="post-raw-markdown hidden min-[370px]:block">
				<button @click="getRawMarkdown">
					<font-awesome-icon class="pr-1.5" icon="fa-solid fa-floppy-disk" />
					<span>raw</span>
				</button>
			</div>
		</div>
		<div class="about-author flex flex-row gap-5">
			<img src="@/assets/images/photo_small.jpg" alt="">
			<div>
				<h5>About the author</h5>
				<p><RouterLink to="/about" class="link">Danijel Durakovic</RouterLink> - programmer, game developer, blogger, elemental shaman etc.</p>
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
		&:before { content: none; }
		&:after { content: none; }
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
		color: var(--my-content-text-dimmed);
		span {
			color: var(--my-content-text);
		}
	}
	.post-raw-markdown {
		font-size: 13px;
		button {
			position: relative;
			color: var(--my-content-text);
			padding-bottom: 3px;
			border-bottom: 2px solid transparent;
			cursor: pointer;
			span {
				color: var(--my-content-link);
			}
			&:hover {
				left: -1px;
				border-bottom: 2px solid var(--my-content-link);
				color: var(--my-content-link-hover);
				span {
					color: var(--my-content-link-hover);
					transform: translateX(1px);
				}
			}
		}
	}
	.about-author {
		border: 2px solid var(--my-content-accent);
		margin-top: 30px;
		padding: 15px;
		img {
			width: 130px;
			max-width: 35%;
			height: auto;
			object-fit: contain;
			filter: grayscale(1);
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
			line-height: 1.3rem;
			color: var(--my-content-text-dimmed);
		}
	}
}
</style>