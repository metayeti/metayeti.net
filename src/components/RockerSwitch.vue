<script setup>
import { ref } from 'vue';

const emit = defineEmits(['switchToggle']);

const isToggled = ref(false);

const toggleSwitch = () => {
	isToggled.value = !isToggled.value;
	emit('switchToggle', isToggled.value);
};

defineExpose({
	manualSwitch: () => {
		isToggled.value = true;
	}
});
</script>

<template>
	<button
		@click="toggleSwitch"
		class="rocker-switch"
		:class="{ toggled: isToggled }"
	>
		<div class="rocker-inner">
			<div class="switch-container">
				<div class="left-side">
					<div class="l-depth"></div>
					<div class="l-face">
						<div class="icon-O"></div>
					</div>
				</div>
				<div class="right-side">
					<div class="r-face">
						<div class="icon-I"></div>
					</div>
					<div class="r-depth"></div>
				</div>
			</div>
		</div>
	</button>
</template>

<style scoped>
button.rocker-switch {

	--color-rocker-border: rgb(146, 28, 28);
	--color-rocker-dark: rgb(128, 6, 6);
	--color-rocker-light: rgb(190, 13, 13);
	--color-rocker-symbol: rgba(255,255,255,0.5);

	--rocker-depth: 2px;

	position: relative;
	width: 50px;
	height: 30px;
	border-radius: 3px;
	touch-action: manipulation;
	cursor: pointer;

	.rocker-inner {
		position: absolute;
		width: 46px;
		height: 26px;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		margin: auto;
		/* border-radius: 1px; */
		background-color: var(--color-rocker-border);

		.switch-container {
			position: absolute;
			width: 42px;
			height: 22px;
			left: 0;
			right: 0;
			bottom: 0;
			top: 0;
			margin: auto;

			.left-side,
			.right-side {
				position: absolute;
				width: 51%;
				height: 100%;
				top: 0;
			}

			.l-depth, .l-face, .r-depth, .r-face {
				transition: all 100ms ease-in-out;

				/*
				&:before, &:after {
					transition: height 1000ms ease-in-out;
				}
				*/
			}

			.left-side {
				left: 0;
				display: flex;
				flex-direction: row;

				.l-depth {
					width: 0%;
					height: 100%;
				}

				.l-face {
					position: relative;
					width: 100%;
					height: 100%;
					background-color: var(--color-rocker-dark);
				}

				:is(button.rocker-switch).toggled & {
					.l-depth {
						width: 30%;
						background-color: var(--color-rocker-dark);
					}
					.l-face {
						width: 70%;
						background-color: var(--color-rocker-light);
					}
				}
			}

			.right-side {
				right: 0;
				display: flex;
				flex-direction: row;

				.r-face {
					position: relative;
					width: 70%;
					height: 100%;
					background-color: var(--color-rocker-light);

					/* top/bottom depth simulation could be worked in like this, but it really doesn't look good at this size because
					   of nasty jagged pixels */

					/*
					&::before {
						position: absolute;
						content: '';
						bottom: calc(var(--rocker-depth) * -1 + 24px);
						left: 0;
						width: 100%;
						height: var(--rocker-depth);
						background: linear-gradient(to bottom right, transparent 50%, var(--color-rocker-light) 70%) bottom right;
					}
					&::after {
						position: absolute;
						content: '';
						top: calc(var(--rocker-depth) + 20px);
						left: 0;
						width: 100%;
						height: var(--rocker-depth);
						background: linear-gradient(to top right, transparent 50%, var(--color-rocker-light) 70%) bottom right;
					}
					*/
				}
				.r-depth {
					position: relative;
					width: 30%;
					height: 100%;
					background-color: var(--color-rocker-dark);

					/*
					&::before {
						position: absolute;
						content: '';
						bottom: calc(var(--rocker-depth) * -1 + 24px);
						right: 0;
						width: 100%;
						height: var(--rocker-depth);
						background: linear-gradient(to top right, var(--color-rocker-dark) 50%, transparent 70%) bottom right;
					}
					&::after {
						position: absolute;
						content: '';
						top: calc(var(--rocker-depth) + 20px);
						right: 0;
						width: 100%;
						height: var(--rocker-depth);
						background: linear-gradient(to bottom right, var(--color-rocker-dark) 50%, transparent 70%) bottom right;
					}
					*/
				}

				:is(button.rocker-switch).toggled & {
					.r-face {
						width: 100%;
						background-color: var(--color-rocker-dark);

						&::before {
							height: 0;
						}
						&::after {
							height: 0;
						}
					}
					.r-depth {
						width: 0%;

						&::before {
							height: 0;
						}
						&::after {
							height: 0;
						}
					}
				}
			}

			.icon-O {
				position: absolute;
				width: 38%;
				height: 44%;
				border: 2px solid var(--color-rocker-symbol); 
				border-radius: 50%;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				margin: auto;
			}
			
			.icon-I {
				position: absolute;
				width: 2px;
				height: 44%;
				background-color: var(--color-rocker-symbol);
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				margin: auto;
			}
		}
	}
}
</style>