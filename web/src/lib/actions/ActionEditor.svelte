<script>
	import { onMount } from 'svelte';
	import CodeMirror from 'svelte-codemirror-editor';
	import { javascript } from '@codemirror/lang-javascript';
	//import { python } from "@codemirror/lang-python";
	import { code, lang } from './editorStore';
	/**
	 * @type {{name:string,namespace:string, exec: { code: string; kind:string }; }}
	 */
	export let action;

	/* const languages = {
		'nodejs:14': javascript
	} */

	$: actionName = action.name;
	$: namespace = action.namespace;
	
	onMount(() => {
		code.set(action.exec.code)
		lang.set(action.exec.kind)
	});
	/**
	 * @param {any} event
	 */
	function handleCodeChange({ detail }) {
		code.set(detail);
	}

	async function updateAction() {
		console.log(action);
		console.log($code);
	}
	async function resetCode() {
		code.set(action.exec.code)
	}
</script>

<div class="grow bg-white m-4 w-full">
	<div class="flex justify-between align-center">
		<div>
			<b class="block text-sm">{namespace}</b>
			<h1 class="text-2xl font-bold">{actionName}</h1>
			<span class="block mb-2 text-sm">{$lang}</span>
		</div>
		{#if $code !== action.exec.code}
			<div class="flex">
				<button on:click={resetCode} class="rounded-xl px-8 mr-2 bg-blue-800 text-slate-200"> RESET </button>
				<button on:click={updateAction} class="rounded-xl px-8 bg-blue-800 text-slate-200"> UPDATE </button>
			</div>
		{/if}
	</div>

	<CodeMirror
		value={$code ? $code : action.exec.code}
		lang={javascript()}
		on:change={handleCodeChange}
	/>
</div>
