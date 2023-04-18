// @ts-nocheck
import { OpenWhisk } from '$lib/OpenWhisk';
const options = {
	apihost: 'http://localhost:3233',
	api_key:
		'11c0ccb0-ba75-433f-844a-eb0d7575ce94:CzZl9E0Zj6NLnXkImiQYeW3oBiQpJUWTJrkcxZetmaqUJSOtTBAmp96bYF0HyOgb'
};

const ow = new OpenWhisk(options.apihost, options.api_key, 'nuvolaris');

// @ts-ignore
/** @type {import('./$types').PageLoad} */
export async function load() {
	try {
		const actions = await ow.list();
		let packages = new Map();

		actions.forEach((action) => {
			if (!packages.get(action.namespace)) {
				packages.set(action.namespace, [action]);
			} else {
				packages.get(action.namespace).push(action);
			}
		});

		return {
			packages: packages
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
