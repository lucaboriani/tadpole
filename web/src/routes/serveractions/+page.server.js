import { env } from '$env/dynamic/private';
import OpenWhisk from '$lib/ow-client/main';

const options = {
	apihost: env.OW_API_HOST,
	api_key: env.OW_API_KEY
};

const ow = OpenWhisk(options);

// @ts-ignore
/** @type {import('./$types').PageLoad} */
export async function load() {
	try {
		const actions = await ow.actions.list();
		return {
			actions: actions
		};
	} catch (error) {
		console.log(error);
		return {
			error: {
				// @ts-ignore
				message: error.message
			}
		};
	}
}
