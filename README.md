# Obfuscate paths from `@vercel/nft` without `eval`

The `@vercel/nft` parser only makes a best effort at finding assets which means it's
quite easy to obfuscate the paths like this:

```ts
const path = require("path");

function getPath() {
  const parts = [];
  parts.push(__dirname);
  parts.push("..");
  parts.push(`sentry-cli${process.platform === "win32" ? ".exe" : ""}`);
  return path.resolve(...parts);
}

const binaryPath = getPath();
```

`yarn test` results:
## Non-obfuscated code picks up assets
```js
 {
  fileList: Set(4) {
    'src/main.js',
    'package.json',
    'sentry-cli.exe',
    'sentry-cli'
  },
  esmFileList: Set(0) {},
  reasons: Map(4) {
    'src/main.js' => {
      type: [ 'initial', 'dependency' ],
      ignored: false,
      parents: Set(0) {}
    },
    'package.json' => {
      type: [ 'resolve' ],
      ignored: false,
      parents: Set(1) { 'src/main.js' }
    },
    'sentry-cli.exe' => {
      type: [ 'asset' ],
      ignored: false,
      parents: Set(1) { 'src/main.js' }
    },
    'sentry-cli' => {
      type: [ 'dependency' ],
      ignored: false,
      parents: Set(1) { 'src/main.js' }
    }
  },
  warnings: Set(0) {}
}
```
## Obfuscated code doesn't see assets
```js
 {
  fileList: Set(2) { 'src/main-obfuscated.js', 'package.json' },
  esmFileList: Set(0) {},
  reasons: Map(2) {
    'src/main-obfuscated.js' => {
      type: [ 'initial', 'dependency' ],
      ignored: false,
      parents: Set(0) {}
    },
    'package.json' => {
      type: [ 'resolve' ],
      ignored: false,
      parents: Set(1) { 'src/main-obfuscated.js' }
    }
  },
  warnings: Set(0) {}
}

```