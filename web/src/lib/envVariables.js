import { Buffer } from 'buffer';

const auth = `Basic ${Buffer.alloc(101,import.meta.env.VITE_PUBILC_OW_API_KEY).toString('base64')}`
    
export const variables = {
	apiHost: import.meta.env.VITE_PUBILC_OW_API_HOST,
	auth: auth
};
