<script setup>
import { updateTitle } from '@/shared';
import { onMounted } from 'vue';

onMounted(() => {
	updateTitle();
});
</script>

<template>
	<p class="caption"><br>Clonk! Crank! Whizzzz!<br>Uh oh - the gears seem to be stuck.<br>Gnomes are already working on it.<br></p>
</template>