# Tadpole

Preparatory sketch app for [nuvolaris](https://www.nuvolaris.io/) admin panel. Testing/exploring base functionalities of the combination of sveltekit and nuvolaris. Many hints and classes found in [microbots](https://github.com/nuvolaris/microbots)

The project has been scaffolded with [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Overview

This scratch app, found in `/web` is configured to be styled with tailwind. 

Demo actions/packages are found in `/packages`

project requires node 16 + 


### auth bypass

Please note that authentication flow hasn't been implemented

Setup .env  files

copy and rename `web/env.example`into 
.env , edit it accordingly. Default OW_API_HOST is http://localhost:3233 , OW_API_KEY is found in ./nuvolaris/config.yaml -namespaces -> nuvolaris.


### Views

the app has 5 different views: 

- *index*, nothing special
- */tasks* (yet another todolist, using redis )
- */address* (a remake of [this tutorial](https://www.youtube.com/watch?v=pOdhx_vxxPI&t=43s&ab_channel=Nuvolaris)). 
- */actions* (displays a list of all registered actions, grouped by package.
    Clicking on an action's name loads the source code. 
    If the code is modified the interface displays an "update" and a "reset" button. (clicking on reset works, while clicking on update currently console logs the changed value of the code )  

- */serveractions*
    EXPERIMENTAL - proof of concept.
    Lists all registered actions, grouped by package, like in /actions but with a server side client. Since the official [ow client](https://github.com/apache/openwhisk-client-js/tree/master/lib) didn't seem to be compatible with svelte-kit/vite environment (babel transpile seemed to work in dev mode but not with build/preview or playwright's builtin server)  I've made a quick and dirty es6+ compatible patch (totally) of the client (with its few dependencies ), see `src/lib/ow-client`. 
    

to support serverside functionalities it uses [@sveltejs/adapter-node](https://www.npmjs.com/package/@sveltejs/adapter-node), waiting for nuvolaris/sveltekit adapter :)


## Developing

Once you've checked out the project and installed dependencies with `npm install` (or `pnpm install`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Installed dependencies

The following dep have been installed: 

[@codemirror/lang-javascript](https://github.com/codemirror/lang-javascript)

[@codemirror/lang-python](https://github.com/codemirror/lang-python)

[svelte-codemirror-editor](https://github.com/touchifyapp/svelte-codemirror-editor)




## Testing

This project uses vitest for unit testing (no tests written yet) and playwright for e2e testing

to run unit test : `npm run test:unit`

to run e2e test : `npm run test` 

playwright tests are found in `/tests`, see `/tests/address.spec.js` for a sample implementation


## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.






