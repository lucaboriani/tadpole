import { writable } from 'svelte/store';
import { variables } from '$lib/envVariables';
import { Buffer } from 'buffer';

export const authToken = writable(`Basic ${Buffer.from(variables.apiKey).toString('base64')}`);