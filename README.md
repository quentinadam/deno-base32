# base32

[![JSR](https://jsr.io/badges/@quentinadam/base32)](https://jsr.io/@quentinadam/base32)
[![CI](https://github.com/quentinadam/deno-base32/actions/workflows/ci.yml/badge.svg)](https://github.com/quentinadam/deno-base32/actions/workflows/ci.yml)

A simple library to encode and decode base32 strings.

Optionnaly supports specifying the alphabet to use.

## Usage

```ts
import * as base32 from '@quentinadam/base32';

base32.encode(new Uint8Array([102, 111, 111])); // returns 'MZXW6==='

base32.decode('MZXW6==='); // returns Uint8Array([102, 111, 111])

base32.encode(new Uint8Array([102, 111, 111]), { padding: false }); // returns 'MZXW6'
```
