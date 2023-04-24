// @ts-nocheck
import { listActions } from '$lib/actions/api/listActions';

// @ts-ignore
/** @type {import('./$types').PageLoad} */
export async function load() {
	try {
		const actions = await listActions()
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
