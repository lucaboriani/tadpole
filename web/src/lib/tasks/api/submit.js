import { base } from './base';

/**
 * @param {{}} form
 */
export async function submit(form) {
	try {
		await fetch(base + 'tasklist/set', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(form)
		});
	} catch (error) {
		console.log(error);
	}
	form = {};
}
