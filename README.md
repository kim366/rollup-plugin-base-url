# rollup-plugin-base-url

Allows dynamic imports to be loaded from an absolute URL, such as `/`.

## Why?

When you bundle an app with Rollup, dynamic `import()` calls are loaded as a relative path (starting with `./`). This is an issue if you have different routes, such as `/` and `/login` accessing the same chunk, since the latter will load `/login/your-chunk[hash].js`.

This plugin replaces dynamic import calls to have an absolute URL. By default this is `/` but it can be specified when, for example, your entire site is on another route, such as `/forum`.

## Installation
```
npm i -D rollup-plugin-base-url
```

## Usage
```js
import { baseUrl } from 'rollup-plugin-base-url';

export default {
  input: 'index.js',
  plugins: [
    baseUrl({
      url: '/forum', // the base URL prefix; optional, defaults to /
    }),
  ],
};
```
