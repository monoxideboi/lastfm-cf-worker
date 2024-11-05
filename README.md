# Lastfm rest api cloudflare worker

This is a cloudflare worker that will create a restapi that will return your most recently/currently playing song! This lets you keep your api key yours and hidden while caching requests!

If you do not have a cloudflare account go get it!

If you do not want to use the [cli](#CLI) do it with the [webapp](#webapp)

## CLI

Deploy
```
npm create cloudflare@latest -- --template https://github.com/monoxideboi/lastfm-cf-worker.git
```
name it lastfmcfworker, or whatever you want
```
cd lastfmcfworker
```
### IMPORTANT!! THEN you need to edit the wrangler.toml file. Just find the USER variable (near the top with all caps!) and replace the field!

```
npx wrangler deploy
```
You will need to get an api key from lastfm. Once you do, do
`npx wrangler secret put KEY`
and put in your key in the input afterwards.

By default the cache time is 2 seconds, feel free to increase this to whatever you want in [the index.js](./src/index.js) but lastfm's limit is 5 per second!

## Webapp

Go to [the cloudflare workers page](https://workers.cloudflare.com/), click log in and go to the dashboard.

Click Create Worker, and name it whatever you want. Create it.

Then click edit code, and copy paste [the index.js](./src/index.js), replacing the original code. Ignore the error messages.

Then go back with the arrow in the top left (and save), and click on settings. Click the `Variables and Secrets` tab. Click the + Add button to add a variable.

First make the USER variable, name is all caps and make the value your lastfm username.

Then make the KEY variable, again all caps and make the value your API key. Feel free to encrypt this one.

You're done! If you want a custom domain keep reading!

## Custom Domain

If you really want a custom domain, go to the worker dashboard and go to your worker's settings, there will be a tab called `Domains & Routes` that you can set a custom domain for.

## Custom Routes
If you want to make your api link like this: `example.com/lastfm`, you can go to the worker routes and route the worker to whatever you want!

## Usage
Just use fetch to get the contents of your REST api, it will return ONLY the last song played. [Check the docs here](https://www.last.fm/api/show/user.getRecentTracks).

## Help
My discord is [monoxideboi](https://discord.com/users/375379813403328523), feel free to DM or ping me if you need help.
