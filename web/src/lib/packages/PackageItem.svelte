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

	export let expand = false
	
</script>

<div>
	<button class="flex items-center justify-between w-full" on:click={()=>expand = !expand} >
		<h3 class="text-xl font-bold">
			{packageName === 'nuvolaris' ? 'default' : packageName.replace('nuvolaris', '') }
		</h3>
		<div
			class={`text-gray-300 font-bold ${expand ? '-rotate-90' : 'rotate-90'}`}
		> 
			> 
		</div>
	</button>
	{#if expand}
		{#each actions as action}
			<ActionListItem action={action} on:action-selected/>
		{/each}
	{/if}
	
</div>
