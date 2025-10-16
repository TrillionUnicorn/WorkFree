import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			routes: {
				include: ['/*'],
				exclude: ['<all>']
			}
		}),
		alias: {
			$lib: 'src/lib',
			$db: 'src/lib/server/db'
		},
		prerender: {
			entries: ['/', '/login', '/register', '/pricing']
		}
	}
};

export default config;

