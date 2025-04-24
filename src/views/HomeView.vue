<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>

	<section>
		<h2>Hi! I'm Danijel.</h2>
		<p>Welcome to my humble online abode.</p>
		<p>
			I'm a software developer from Slovenia.
			I make <RouterLink to="/projects">games</RouterLink> <br class="responsive-break">
			and <a href="https://github.com/metayeti">whirring gizmos</a>. I sometimes write some nonsense<br class="responsive-break">
			on my <RouterLink to="/blog">blog</RouterLink>. I like snow leopards, tea, drawing, reading <br class="responsive-break">and coding.
		</p>
		<p>Enjoy your stay!</p>
	</section>
	<section>
		<h2>Latest Posts</h2>

	</section>
	<section>
		<h2>Latest projects</h2>
		<br v-for="i in 15" :key="i">
	</section>

</template>