/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx) {
		const url = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${env.USER}&api_key=${env.KEY}&limit=1&format=json`;
		const cacheUrl = new URL(url);

		// Construct the cache key from the cache URL
		const cacheKey = new Request(cacheUrl.toString());
		const cache = caches.default;

		// Check whether the value is already available in the cache
		// if not, you will need to fetch it from origin, and store it in the cache
		let response = await cache.match(cacheKey);

		if (!response) {
			console.log(
				`Response for request url: ${url} not present in cache. Fetching and caching request.`,
			);
			// If not in cache, get it from origin
			let json = await fetch(url).then(data => {
				return data.json();
			}).then(json => {
				return json.recenttracks.track[0];
			});

			// Must use Response constructor
			response = Response.json(json);

			// Cache API respects Cache-Control headers. Setting s-max-age to 2
			// will limit the response to be in cache for 2 seconds max
			response.headers.append("Cache-Control", "s-maxage=2");
			
			response.headers.append("Access-Control-Allow-Origin", "*");
			response.headers.append("Access-Control-Allow-Headers", "*")

			// Any changes made to the response here will be reflected in the cached value
			ctx.waitUntil(cache.put(cacheKey, response.clone()));
		} else {
			console.log(`Cache hit for: ${url}.`);
		}
		return response;
	},
};