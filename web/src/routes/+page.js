// @ts-nocheck
import { OpenWhisk } from '$lib/OpenWhisk';
import { variables } from '$lib/envVariables';

const ow = new OpenWhisk(
	variables.apiHost, 
	variables.apiKey,
	'nuvolaris'
)

// @ts-ignore
/** @type {import('./$types').PageLoad} */
export async function load() {
	try {
		const actions = await ow.list();
		let packages = new Map();
		console.log(actions)
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
