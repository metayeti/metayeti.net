<script setup>
import { loadJSON, loadText, md } from '@/shared';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

// -- load markdown and handle rendering --

const renderedArticleMarkdown = ref('');

const postListing = ref({});

onMounted(async () => {
	const route = useRoute();
	const routeSlug = route.params.slug;
	const blogData = await loadJSON('/content/blog/index.json');
	const postData = blogData.posts.find(post => post.slug === routeSlug);
	postListing.value = postData;
	const articlePath = `/content/blog/${routeSlug}/article.md`;
	const articleMarkdown  = await loadText(articlePath);
	renderedArticleMarkdown.value = md.render(articleMarkdown);
});

</script>

<template>
	<article v-html="renderedArticleMarkdown"></article>
</template>