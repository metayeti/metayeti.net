<script setup>
import { loadText, md } from '@/shared';
import { ref, onMounted } from 'vue';

const renderedMarkdown = ref('');

const fetchMarkdown = async () => {
	const textData = await loadText('/content/static/about.md');
	renderedMarkdown.value = md.render(textData);
};
onMounted(fetchMarkdown);
</script>


<template>
	<article
		v-html="renderedMarkdown"
	></article>
</template>