import { variables } from '$lib/envVariables';
import { Buffer } from 'buffer';
import {getActionPath } from './getActionPath'
/**
 * @param {{ name: string; namespace: string; }} detail
 */
export async function getActionCode({ name, namespace }) {
    /**
     * @type {string}
     */
    const auth = `Basic ${Buffer.alloc(101,variables.apiKey).toString('base64')}`
    
     if (auth) {
        let path = getActionPath(name, namespace);
        path += '?code=true';
        try {
            const response = await fetch(path, {
                method:'GET',
                headers: {
                    Authorization: auth
                }
            });
            if (response.ok) {
                const action = await response.json();
                return action;
            }
        } catch (error) {
            console.log('azz');
            // @ts-ignore
            throw new Error(error.message);
        }
    } else {
        alert(`auth key not setted !!! Please note that authentication flow hasn't been implemented, edit your evn files! `
        );
        return;
    } 
}