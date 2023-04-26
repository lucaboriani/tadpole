<script>
	import { onMount } from 'svelte';
	import CodeMirror from 'svelte-codemirror-editor';
	import { javascript } from '@codemirror/lang-javascript';
	import { python } from "@codemirror/lang-python";
	import { php } from "@codemirror/lang-php";
	import { code } from './editorStore';
	/**
	 * @type {{name:string,namespace:string,annotations:Array<{key:string, value:string}>, exec: { code: string; }; }}
	 */
	export let action;

	

	$: actionName = action.name;
	$: namespace = action.namespace;

	$: exec = action.annotations.find(( ann) => ann.key === 'exec')?.value || 'unknown'
	/**
	 * @type {((config?: { jsx?: boolean | undefined; typescript?: boolean | undefined; } | undefined) => import("@codemirror/language").LanguageSupport) | ((config?: { baseLanguage?: import("@codemirror/language").Language | null | undefined; plain?: boolean | undefined; } | undefined) => import("@codemirror/language").LanguageSupport) | (() => any)}
	 */
	let actionLanguage
	$:  {
		actionLanguage = getLang(exec)
	}
	
	/**
	 * @param {string} exec
	 */
	function getLang(exec){
		const runtime = exec.split(':')[0]
		switch(runtime){
			case 'nodejs':
				return javascript
			case 'python':
				return python
			case 'php':
				return php
			case 'go':
				// fake....
				return javascript
			default:
				// fake....
				return javascript
				
		}
	}
	
	onMount(() => {
		code.set(action.exec.code)
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
			<span class="block mb-2 text-sm">{exec}</span>
		</div>
		{#if $code !== action.exec.code}
			<div class="flex">
				<button 
					on:click={resetCode} 
					class="rounded-xl px-8 mr-2 bg-blue-800 text-slate-200"
				> 
					RESET 
				</button>
				<button 
					on:click={updateAction} 
					class="rounded-xl px-8 bg-blue-800 text-slate-200"
				> 
					UPDATE 
				</button>
			</div>
		{/if}
	</div>

	<CodeMirror
		value={$code ? $code : action.exec.code}
		lang={actionLanguage()}
		on:change={handleCodeChange}
	/>
</div>
