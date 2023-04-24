<script>
	// @ts-nocheck
	import ActionListItem from '$lib/actions/ActionListItem.svelte';
	
	/**
	 * @type {String}
	 */
	export let packageName;
	/**
	 * @type {Array}
	 */
	export let actions;

	let expand = false
	
</script>

<div>
	<div class="flex items-center justify-between">
		<h3 class="text-xl font-bold">
			{packageName === 'nuvolaris' ? 'default' : packageName.replace('nuvolaris', '') }
		</h3>
		<button
			on:click={()=>expand = !expand} 
			class={`text-gray-300 font-bold ${expand ? '-rotate-90' : 'rotate-90'}`}
		> 
			> 
		</button>
	</div>
	{#if expand}
		{#each actions as action}
			<ActionListItem action={action} on:action-selected/>
		{/each}
	{/if}
	
</div>
