import { variables } from '$lib/envVariables';


export async function listActions() {
    /**
     * @type {{auth:string}}
     */
    const { auth } = variables   
    if (auth) {
        let path = variables.apiHost + '/api/v1/namespaces/_/actions';
        try {
            const response = await fetch(path, {
                method:'GET',
                headers: {
                    Authorization: auth
                }
            });
            if (response.ok) {
                const actions = await response.json();
                return actions;
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