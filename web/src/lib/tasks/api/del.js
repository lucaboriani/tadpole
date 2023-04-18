import { base } from './base';
/**
 *
 * @param {String} select
 */
export async function del(select) {
	console.log(select);
	try {
		await fetch(base + 'tasklist/del?task=' + select);
	} catch (error) {
		console.log(error);
	}
}
