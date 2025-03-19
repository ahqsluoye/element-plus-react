\^\[([a-zA-Z]+)\] `$1`
\^\[enum\]`(.*)` <Enum>$1</Enum>

<Enum type="Function"></Enum>

[a-z\-]+/([a-z\-]+)\n <code src="./$1.tsx"></code>\n
([a-z]+)-([a-z]{1})([a-z]+) $1\u$2$3

getCssVar\('([a-z\-]\*)'\) var(--#{$namespace}$1)

(r-)||(el-) #{$namespace}

:::(demo)?

# element-plus-react

[![NPM version](https://img.shields.io/npm/v/element-plus-react.svg?style=flat)](https://npmjs.org/package/element-plus-react)
[![NPM downloads](http://img.shields.io/npm/dm/element-plus-react.svg?style=flat)](https://npmjs.org/package/element-plus-react)

element-plus-react

## Usage

TODO

## Options

TODO

## Development

```bash
# install dependencies
$ pnpm install

# develop library by docs demo
$ pnpm start

# build library source code
$ pnpm run build

# build library source code in watch mode
$ pnpm run build:watch

# build docs
$ pnpm run docs:build

# check your project for potential problems
$ pnpm run doctor
```

## LICENSE

MIT
