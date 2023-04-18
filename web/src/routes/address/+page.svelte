<script>
	// @ts-nocheck

	import { onMount } from 'svelte';
	let base = 'http://localhost:3233/api/v1/web/nuvolaris/addr/';
	let data = [];
	let select = '';
	let form = {};

	async function all() {
		let res = await fetch(base + 'all.json');
		let body = await res.json();
		data = body.data;
		console.log(data);
	}
	function submit() {
		console.log(form);
		fetch(base + 'set', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(form)
		})
			.then(all)
			.catch(console.log);
		form = {};
	}
	function remove() {
		console.log(select);
		fetch(base + 'del?name=' + select)
			.then(all)
			.catch(console.log);
	}
	onMount(all);
</script>

<svelte:head>
	<title>Address</title>
</svelte:head>
<div class="flex flex-col min-h-screen items-center">
	<h1 class="text-3xl font-bold mt-16">address</h1>
	<main class="bg-slate-100 rounded-xl p-8 mt-8">
		<section>
			<form>
				<input placeholder="Name" bind:value={form.name} id="name"/>
				<input placeholder="Company" bind:value={form.company} id="company"/>
				<input placeholder="Phone" bind:value={form.phone} id="phone"/>
			</form>
			<button class="rounded bg-slate-600 text-slate-100 py-2 px-4 mt-8 mr-2" on:click={submit}
				>Add</button
			>
			<button class="rounded bg-slate-600 text-slate-100 py-2 px-4 mt-8" on:click={remove}
				>remove selected</button
			>
		</section>
		<section>
			{#each data as person}
				<li class="flex">
					<input type="radio" bind:group={select} value={person.name} />
					<div class="m-2">
						<span>Name : {person.name}</span>
						<span>Company : {person.company}</span>
						<span>Phone : {person.phone}</span>
					</div>
				</li>
			{/each}
		</section>
	</main>
</div>
