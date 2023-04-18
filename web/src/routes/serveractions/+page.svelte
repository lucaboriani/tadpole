<script>
	// @ts-nocheck

	/** @type {import('./$types').PageData} */
	export let data;

	const { actions } = data;

	let namespaces = new Map();

	actions.forEach((action) => {
		if (!namespaces.get(action.namespace)) {
			namespaces.set(action.namespace, [action]);
		} else {
			namespaces.get(action.namespace).push(action);
		}
	});
</script>

<svelte:head>
	<title>Server Actions</title>
</svelte:head>
<div class="flex flex-col min-h-screen">
	<h1 class="text-3xl font-bold mt-16">Server loaded actions</h1>
	<main class="bg-slate-100 rounded-xl p-8 mt-8 w-96">
		<section>
			{#each [...namespaces.keys()] as namespace}
				<div>
					<h3 class="text-xl font-bold">{namespace}</h3>
					{#each namespaces.get(namespace) as action}
						<p>{action.name}</p>
					{/each}
				</div>
			{/each}
		</section>
	</main>
</div>
