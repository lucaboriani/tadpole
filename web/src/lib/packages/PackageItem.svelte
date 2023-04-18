<script>
	// @ts-nocheck
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	/**
	 * @type {String}
	 */
	export let packageName;
	/**
	 * @type {Array}
	 */
	export let actions;

	function actionSelected(action) {
		dispatch('action-selected', action);
	}
</script>

<div>
	<h3 class="text-xl font-bold">{packageName === 'nuvolaris' ? 'default' : packageName.replace('nuvolaris', '') }</h3>
	{#each actions as action}
		<button 
			class="block" 
			on:click={() => actionSelected(action)}>
				{action.name}
			</button>
	{/each}
</div>
