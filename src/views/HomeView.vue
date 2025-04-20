<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>

	<article>
		<h2>Hi! I'm Danijel.</h2>
		<p>Welcome to my humble online abode.</p>
		<p>
			I'm a software developer from Slovenia.
			I make <RouterLink to="/projects" class="fancy">games</RouterLink> <br class="responsive-break">
			and <a href="https://github.com/metayeti" class="fancy" target="_blank">whirring gizmos</a>. I sometimes write some nonsense<br class="responsive-break">
			on my <RouterLink to="/blog" class="fancy">blog</RouterLink>. I like snow leopards, tea, drawing, reading <br class="responsive-break">and coding.
		</p>
	</article>
	<article>
		<h2>Latest Posts</h2>

	</article>
	<article>
		<h2>Latest projects</h2>
		<br v-for="i in 100" :key="i">
	</article>

</template>