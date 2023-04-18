<script>
	import { onMount } from 'svelte';
	import { all } from '../../lib/tasks/api/all';
	import { tasks } from '../../lib/tasks/store/tasks.js';
	import TasksHeader from '../../lib/tasks/TasksHeader.svelte';
	import TaskElement from '../../lib/tasks/TaskElement.svelte';

	onMount(async () => {
		const data = await all();
		$tasks = [...data];
	});
</script>

<svelte:head>
	<title>Tasks</title>
</svelte:head>
<div class="flex flex-col min-h-screen items-center">
	<h1 class="text-3xl font-bold mt-16">tasks</h1>
	<main class="bg-slate-100 rounded-xl p-8 mt-8 w-96">
		<TasksHeader />
		<section>
			{#each $tasks as task}
				<TaskElement {task} />
			{/each}
		</section>
	</main>
</div>
