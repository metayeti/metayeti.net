<script setup>
</script>

<template>

	<article>
		<h2>Hi! I'm Danijel.</h2>

		<p>
			I'm a software developer from Slovenia.
			I make <a href="/projects" class="fancy">games</a> <br class="responsive-break">
			and <a href="https://github.com/metayeti" class="fancy">whirring gizmos</a>. I sometimes write some nonsense<br class="responsive-break">
			on my <a href="/blog" class="fancy">blog</a>. I like snow leopards, tea, drawing, reading <br class="responsive-break">and coding.
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