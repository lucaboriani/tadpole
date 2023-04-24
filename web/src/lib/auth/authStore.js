import { writable } from 'svelte/store';
import { variables } from '$lib/envVariables';
import { Buffer } from 'buffer';



export const authToken = writable(`Basic ${Buffer.alloc(101,variables.apiKey).toString('base64')}`);