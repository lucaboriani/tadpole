import { base } from './base';

export async function all() {
	let url = base + 'tasklist/all.json';
	let res = await fetch(url);
	let body = await res.json();
	return body.data;
}
