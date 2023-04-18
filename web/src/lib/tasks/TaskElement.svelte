<script>
	import { tasks } from './store/tasks';
	import { submit } from '$lib/tasks/api/submit';
	import { del } from '$lib/tasks/api/del';
	/**
	 * @type {{ task: any; complete: any; }}
	 */
	export let task;
	/**
	 * @type {Boolean}
	 */
	let editing = false;
	/**
	 * @type {String}
	 */
	let newVal;
	/**
	 * Toggles Complete value
	 * @param {Event} e
	 */
	async function toggleComplete(e) {
		task = $tasks.find((t) => t.task === task.task);
		task.complete = !task.complete;
		await submit(task);
	}
	/**
	 * Deletes this task
	 */
	async function remove() {
		await del(task.task);
		$tasks = $tasks.filter((t) => t.task !== task.task);
	}
	/**
	 * Toggles state
	 * @param {Event} e
	 */
	function handleChange(e) {
		// @ts-ignore
		newVal = e.target.value;
	}
	/**
	 * Saves changes
	 */
	async function edit() {
		task = $tasks.find((t) => t.task === task.task);
		await del(task.task);
		task.task = newVal;
		await submit(task);
		editing = false;
	}
</script>

<div class="border rounded bg-slate-300 p-2 mb-2">
	<div class="flex justify-between">
		{#if editing}
			<input type="text" on:input={handleChange} value={task.task} />
			<button class="bg-slate-600 text-white p-1 rounded" on:click={edit}>save</button>
		{:else}
			<span class="font-bold">{task.task}</span>
			<div>
				<span>completed:</span>
				<input type="checkbox" on:change={toggleComplete} checked={task.complete} />
			</div>
		{/if}
	</div>
	<div class="flex justify-between">
		<button class="bg-slate-600 text-white p-1 rounded" on:click={() => (editing = !editing)}
			>edit</button
		>
		<button class="bg-slate-600 text-white p-1 rounded" on:click={remove}>remove</button>
	</div>
</div>
