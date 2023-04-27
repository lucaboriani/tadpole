# Tadpole

Preparatory sketch app for [nuvolaris](https://www.nuvolaris.io/) admin panel. Testing/exploring base functionalities of the combination of sveltekit and nuvolaris. 

The project has been scaffolded with [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte) and generates a static site using [`@sveltejs/adapter-static`](https://www.npmjs.com/package/@sveltejs/adapter-static)

## Overview

This scratch app, found in `/web` is configured to be styled with tailwind. 
It lists all the actions available grouped by package.

Each package is dispayed as an expandable element listing all its actions.
Clicking on each function loads and displays its code. 
Modifying the code makes two button appear: clicking on reset the code is restored to the original state, while clicking on update currently logs to the console the value of the modified code.

project requires node 16 +  and was developed using `whisk CLI version	v0.2.2-trinity.22072521`

A demo package with actions is found in `/packages/hello_lang` (see `manifest.yaml`). The creation of the demo package is optional, while the default "hello" action should exist for testing purposes (see "Testing" below) 



## To run demo

Once you've checked out the project,

`cd web && npm install`

setup the .env  file:

copy and rename `env.example`into 
`.env` , edit it accordingly, i.e. 

```
# Public
VITE_PUBILC_OW_API_HOST='your private api host'
VITE_PUBILC_OW_API_KEY='your private key'
```

if you're unsure, grab your credentials with `nuv wsk property get` 

```bash
whisk API host      your-api-host
whisk auth          your-auth-key

...

```

start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Testing

This project uses vitest and [svelte-testing-library](https://github.com/testing-library/svelte-testing-library) for unit testing and playwright for e2e testing.


to run unit test : `npm run test:unit`

see `web/src/lib/actions/ActionListItem.spec.js` and `web/src/lib/packages/PackageItem.spec.js` for sample implementations.


to run e2e test : `npm run test` 

playwright tests are found in `/tests`, see `web/tests/home.spec.js` for a sample implementation. **Please note that to pass `/tests/home.spec.js` the default "hello" action should not have been deleted**.


## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.




## Installed dependencies

The following dep have been installed: 

[buffer](https://www.npmjs.com/package/buffer)

[svelte-codemirror-editor](https://github.com/touchifyapp/svelte-codemirror-editor)

[@codemirror/lang-javascript](https://github.com/codemirror/lang-javascript)

[@codemirror/lang-python](https://github.com/codemirror/lang-python)

[@codemirror/lang-php](https://github.com/codemirror/lang-php)







