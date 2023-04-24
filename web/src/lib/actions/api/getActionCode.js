import { variables } from '$lib/envVariables';
import {getActionPath } from './getActionPath'
/**
 * @param {{ name: string; namespace: string; }} detail
 */
export async function getActionCode({ name, namespace }) {
    /**
     * @type {{auth:string}}
     */
     const {auth} = variables   
     if (auth) {
        let path = getActionPath(name, namespace) + '?code=true'
        try {
            const response = await fetch(path, {
                method:'GET',
                headers: {
                    Authorization: auth
                }
            });
            if (response.ok) {
                const action = await response.json()
                return action;
            }
        } catch (error) {
            // @ts-ignore
            throw new Error(error.message);
        }
    } else {
        alert(`auth key not setted !!! Please note that authentication flow hasn't been implemented, edit your evn files! `
        );
        return;
    } 
}