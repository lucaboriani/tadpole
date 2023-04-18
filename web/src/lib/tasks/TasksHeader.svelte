<script>
	// @ts-nocheck
	import { submit } from '$lib/tasks/api/submit';
	import { tasks } from './store/tasks';
	let form = {};
	async function addTask() {
		await submit(form);
		$tasks = [...$tasks, form];
		form = {};
	}
</script>

<section>
	<form class="w-full flex items-baseline mb-2">
		<input
			placeholder="What needs to be done?"
			bind:value={form.task}
			class="p-2 grow"
			style="height:inherit"
		/>
		<button
			class="rounded bg-slate-600 text-slate-100 py-2 px-4 mt-8 mr-2"
			on:click={addTask}
			style="height:inherit"
		>
			Add
		</button>
	</form>
</section>
