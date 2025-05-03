<script setup>
import { loadText } from '@/utils';
import { ref, onMounted } from 'vue';
import MarkdownIt from 'markdown-it';

const renderedMarkdown = ref('');
const md = new MarkdownIt();

const fetchMarkdown = async () => {
	const textData = await loadText('/content/static/about.md');
	renderedMarkdown.value = md.render(textData);
};
onMounted(fetchMarkdown);
</script>


<template>
	<div
		v-html="renderedMarkdown"
	></div>
</template>