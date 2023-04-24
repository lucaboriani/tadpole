import { variables } from '$lib/envVariables';
/**
 * @param {string} name
 * @param {string} namespace
 */
export function getActionPath(name, namespace) {
    let path = variables.apiHost + '/api/v1/namespaces/_/actions/';
    if (namespace === 'nuvolaris') {
        path += name;
    } else {
        path += namespace.replace('nuvolaris/', '') + '/' + name;
    }

    return path;
}