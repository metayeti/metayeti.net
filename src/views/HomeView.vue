<script setup>
import LatestPosts from '@/components/LatestPosts.vue';
import LatestProjects from '@/components/LatestProjects.vue';
import { RouterLink } from 'vue-router';
</script>

<template>
	<section>
		<h2>Hi! I'm Danijel.</h2>
		<p>Welcome to my humble online abode.</p>
		<p>
			I'm a software developer from Slovenia.
			I make <RouterLink to="/projects" class="link">games</RouterLink> <br class="responsive-break">
			and <a href="https://github.com/metayeti" target="_blank" class="link">whirring gizmos</a>. I sometimes write some nonsense<br class="responsive-break">
			on my <RouterLink to="/blog" class="link">blog</RouterLink>. I like snow leopards, tea, drawing, reading <br class="responsive-break">and coding.
		</p>
		<p>Enjoy your stay!</p>
	</section>
	<section>
		<h2>Latest Posts</h2>
		<LatestPosts class="py-3" />
	</section>
	<section>
		<h2>Latest projects</h2>
		<LatestProjects class="py-3" />
	</section>
</template>

<style scoped>
@media screen and (max-height: 510px), screen and (max-width: 720px) {
    br.responsive-break {
        display: none;
    }
}
</style>