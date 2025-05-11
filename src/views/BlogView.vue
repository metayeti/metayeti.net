<script setup>
import { useTemplateRef } from 'vue';

const searchInput = useTemplateRef('search-input');

const handleSearch = () => {
	const searchTerm = searchInput.value.value;
	console.log(searchInput.value.value);
};
</script>

<template>
	<!-- <br v-for="i in 100" :key="i"> -->
	<div class="flex flex-col md:flex-row gap-20 md:gap-5">
		<div class="flex-1">
			some content
		</div>
		<div class="sidebar flex-none p-3 flex flex-col gap-9 md:max-w-70">

			<form @submit.prevent="handleSearch" class="search-box flex flex-row">
				<input ref="search-input" type="text" placeholder="Search posts ...">
				<button type="submit" title="Search">
					<font-awesome-icon icon="fa-solid fa-search" class="size-5" />
				</button>
			</form>

			<div class="flex flex-col gap-3">
				<h5>Tags</h5>
				<div class="tag-list flex flex-row flex-wrap gap-2">
					<button class="tag">Game Development</button>
					<button class="tag">Unity</button>
					<button class="tag">Unreal Engine</button>
					<button class="tag">Programming</button>
					<button class="tag">C#</button>
					<button class="tag">C++</button>
					<button class="tag">AI</button>
					<button class="tag">Graphics</button>
					<button class="tag">Shaders</button>
					<button class="tag">VR/AR</button>
					<button class="tag">Indie Games</button>
					<button class="tag">Tech Reviews</button>
					<button class="tag">Optimization</button>
					<button class="tag">Networking</button>
					<button class="tag">Game Design</button>
				</div>
			</div>

			<!--
			<div class="flex flex-col gap-3">
				<h5>By Year</h5>
				<div class="tag-list flex flex-row flex-wrap gap-2">
					<span class="tag">2026</span>
					<span class="tag">2025</span>
					<span class="tag">2018</span>
				</div>
			</div>
			-->

		</div>
	</div>
</template>

<style scoped lang="scss">
.sidebar {
	background-color: var(--my-sidebar-background);

	h5 {
		padding: 0;
		margin: 0;
		color: var(--my-sidebar-heading);
		font-size: 15px;
		font-weight: 600;
	}

	form.search-box {
		&:has(input:focus),
		&:has(button:focus) {
			outline: 2px solid var(--my-sidebar-searchbox-focus);
		}
		input {
			width: 100%;
			color: var(--my-sidebar-searchbox-text);
			background-color: var(--my-sidebar-searchbox);
			padding: 5px 8px;
			font-size: 16px;
			&:focus {
				outline: none;
			}
			+button {
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: var(--my-sidebar-searchbox);
				color: var(--my-sidebar-search-button-icon);
				padding: 0 10px;
				cursor: pointer;

				&:hover {
					color: var(--my-siderbar-search-button-icon-highlight);
				}
			}
		}
	}

	.tag-list > .tag {
		background-color: var(--my-sidebar-tag-background);
		color: var(--my-sidebar-tag-text);
		padding: 3px 9px;
		font-family: "Titillium Web", sans-serif;
		font-size: 15px;
		font-weight: 400;
		border-radius: 5px;
		cursor: pointer;

		&:hover {
			background-color: var(--my-sidebar-tag-background-highlight);
			color: var(--my-sidebar-tag-text-highlight);
		}
	}
}
</style>