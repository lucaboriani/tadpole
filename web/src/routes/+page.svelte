<script>
	import { onMount } from 'svelte';
	import Header from '$lib/Header.svelte';
	import { code } from '$lib/actions/editorStore';
	import { packages as store } from '$lib/packages/store';
	import PackageItem from '$lib/packages/PackageItem.svelte';
	import ActionEditor from '$lib/actions/ActionEditor.svelte';
	import { getActionCode } from '$lib/actions/api/getActionCode';
	/** @type {import('./$types').PageData} */
	export let data;

	const { packages } = data;

	/**
	 * @type {{name: string; namespace: string; exec: { code: string; kind:string }; annotations:Array<{key:string, value:string}> }}
	 */
	let action;

	onMount(() => {
		// @ts-ignore
		store.set(packages);
	});

	/**
	 * @param {CustomEvent<any>} event
	 */
	async function handleActionSelected(event) {
		try {
			const { detail } = event;
			action = await getActionCode(detail);
			code.set(action.exec.code);
		} catch (error) {
			console.log('something went wrong');
			
		}
	}
	
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>
<div class="flex flex-col min-h-screen pl-4 grow">
	<Header />
	<h1 class="text-3xl font-bold pt-8">List all packages w/actions</h1>
	<main class="w-full flex grow">
		<section class="border border-gray-200 rounded-xl p-2 my-4 min-w-[240px]">
			{#each [...$store] as [pkg, actions]}
				<PackageItem
					packageName={pkg}
					{actions}
					on:action-selected={(e) => handleActionSelected(e)}
				/>
			{/each}
		</section>
		{#if action}
			<ActionEditor action={action} />
		{/if}
	</main>
</div>
