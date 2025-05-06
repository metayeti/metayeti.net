<script setup>
import { loadText, md, routeLinkHandler } from '@/shared';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const renderedAboutMarkdown = ref('');

onMounted(async () => {
	const aboutMarkdown = await loadText('/content/static/about.md');
	renderedAboutMarkdown.value = md.render(aboutMarkdown);
});

const router = useRouter();
const handleRouteLink = routeLinkHandler(router);
</script>


<template>
	<article v-html="renderedAboutMarkdown" @click="handleRouteLink"></article>
</template>

<style scoped lang="scss">
/*
NOTE: Since the contents of this page are generated dynamically via markdown, we need a
"deep selector" to keep styles for this component scoped.

`article >>> element` or `article :deep(element)` both seem to work.
*/

article :deep(img) {
    border: 8px solid var(--my-image-border);
    box-shadow: 0 0 10px 0 var(--my-image-shadow);

	&.me {
		$mobile-breakpoint: 640px;

		display: none;
		background-color: var(--my-image-border);

		@media (width > $mobile-breakpoint) {
			&.desktop {
				display: block;
				float: right;
				min-width: 289px;
				height: 350px;
				margin: 0 0 50px 35px;
			}
		}
		@media (width <= $mobile-breakpoint) {
			&.mobile {
				display: block;
				min-width: 260px;
				max-height: 450px;
				margin-bottom: 20px;
			}
		}
	}
}

</style>