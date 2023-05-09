//import adapter from '@sveltejs/adapter-auto';
// import adapter from '@sveltejs/adapter-node';
//import adapter from '@sveltejs/adapter-static';
import adapter from '@eslym/sveltekit-adapter-openwhisk';
import { vitePreprocess } from '@sveltejs/kit/vite';
/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		/* adapter: adapter({
            // default options are shown. On some platforms
            // these options are set automatically — see below
            pages: 'build',
            assets: 'build',
            fallback: null,
            precompress: false,
            strict: true
        }) */
        adapter: adapter({
            // the base url for the function, you will need to specify kit.paths.base when its not on root
            baseUrl: process.env.VITE_PUBILC_OW_API_HOST,
            // header to get connecting ip, 'do-connecting-ip' is an example for DigitalOcean App Platform
            ipHeader: 'do-connecting-ip'
        })
	},
	preprocess: vitePreprocess()
};

export default config;
