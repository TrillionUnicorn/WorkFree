import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/kit/vite';

export default {
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
			$components: 'src/lib/components',
			$utils: 'src/lib/utils',
			$server: 'src/lib/server'
		}
	}
};

