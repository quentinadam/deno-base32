# @quentinadam/base32

[![JSR][jsr-image]][jsr-url] [![NPM][npm-image]][npm-url] [![CI][ci-image]][ci-url]

A simple library to encode and decode base32 strings.

Optionnaly supports specifying the alphabet to use.

## Usage

```ts
import * as base32 from '@quentinadam/base32';

base32.encode(new Uint8Array([102, 111, 111])); // returns 'MZXW6==='

base32.decode('MZXW6==='); // returns Uint8Array([102, 111, 111])

base32.encode(new Uint8Array([102, 111, 111]), { padding: false }); // returns 'MZXW6'
```

[ci-image]: https://img.shields.io/github/actions/workflow/status/quentinadam/deno-base32/ci.yml?branch=main&logo=github&style=flat-square
[ci-url]: https://github.com/quentinadam/deno-base32/actions/workflows/ci.yml
[npm-image]: https://img.shields.io/npm/v/@quentinadam/base32.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@quentinadam/base32
[jsr-image]: https://jsr.io/badges/@quentinadam/base32?style=flat-square
[jsr-url]: https://jsr.io/@quentinadam/base32
