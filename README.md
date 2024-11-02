# Lastfm rest api cloudflare worker

This is a cloudflare worker that will create a restapi that will return your most recently/currently playing song! This lets you keep your api key yours and hidden while caching requests!

If you do not have 

Deploy
```
npm create cloudflare@latest -- --template https://github.com/monoxideboi/lastfm-cf-worker.git
(name: lastfmcfworker, or whatever you want)
cd lastfmcfworker
npm run deploy
```

You will need to get an api key from lastfm. Once you do, do
`npx wrangler secret put KEY`
and put in your key in the input afterwards.
