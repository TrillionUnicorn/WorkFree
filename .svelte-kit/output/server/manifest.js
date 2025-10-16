export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["robots.txt"]),
	mimeTypes: {".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.B155R3VT.js",app:"_app/immutable/entry/app.Ba6kf-pq.js",imports:["_app/immutable/entry/start.B155R3VT.js","_app/immutable/chunks/DKSd3rZ4.js","_app/immutable/chunks/DBfkENj-.js","_app/immutable/chunks/BKQ24SyH.js","_app/immutable/chunks/CgLjUPxt.js","_app/immutable/entry/app.Ba6kf-pq.js","_app/immutable/chunks/BKQ24SyH.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/DBfkENj-.js","_app/immutable/chunks/CAzanqnO.js","_app/immutable/chunks/D1rKP5K2.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/contact",
				pattern: /^\/api\/contact\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/contact/_server.ts.js'))
			},
			{
				id: "/api/waitlist",
				pattern: /^\/api\/waitlist\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/waitlist/_server.ts.js'))
			},
			{
				id: "/contact",
				pattern: /^\/contact\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/pitch",
				pattern: /^\/pitch\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/product",
				pattern: /^\/product\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
