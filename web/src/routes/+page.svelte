<script>
	import { onMount } from 'svelte';
	import Header from '$lib/Header.svelte';
	import { code } from '$lib/actions/editorStore';
	import { packages as store } from '$lib/packages/store';
	import { authToken } from '$lib/auth/authStore';
	import PackageItem from '$lib/packages/PackageItem.svelte';
	import ActionEditor from '$lib/actions/ActionEditor.svelte';
	import { variables } from '$lib/envVariables';
	/** @type {import('./$types').PageData} */
	export let data;

	const { packages } = data;

	/**
	 * @type {{name: string; namespace: string; exec: { code: string; }; }}
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
	/**
	 * @param {string} name
	 * @param {string} namespace
	 */
	function getActionPath(name, namespace) {
		let options = {
			apihost: variables.apiHost,
			api_key: variables.apiKey
		};
		let path = options.apihost + '/api/v1/namespaces/_/actions/';
		if (namespace === 'nuvolaris') {
			path += name;
		} else {
			path += namespace.replace('nuvolaris/', '') + '/' + name;
		}

		return path;
	}

	/**
	 * @param {{ name: string; namespace: string; }} detail
	 */
	async function getActionCode({ name, namespace }) {
		/**
		 * @type {{ apihost: string; api_key: string | null; }}
		 */

		if ($authToken) {
			let path = getActionPath(name, namespace);
			path += '?code=true';
			try {
				const response = await fetch(path, {
                    method:'GET',
					headers: {
						Authorization: $authToken
					}
				});
				if (response.ok) {
					const action = await response.json();
					return action;
				}
			} catch (error) {
				console.log('azz');
				// @ts-ignore
				throw new Error(error.message);
			}
		} else {
			alert(`auth key not setted !!! Please note that authentication flow hasn't been implemented, edit your evn files! `
			);
			return;
		}
	}
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>
<div class="flex flex-col min-h-screen pl-4 grow">
	<Header />
	<h1 class="text-3xl font-bold mt-16">Home page, list all packages w/actions</h1>
	<main class="w-full flex grow">
		<section class="border border-gray-200 rounded-xl p-4 my-4 min-w-[240px]">
			{#each [...$store] as [pkg, actions]}
				<PackageItem
					packageName={pkg}
					{actions}
					on:action-selected={(e) => handleActionSelected(e)}
				/>
			{/each}
		</section>
		{#if action}
			<ActionEditor {action} />
		{/if}
	</main>
</div>
