import * as base32 from './base32.ts';
import assert from '@quentinadam/assert';

const vectors = [
  { decoded: '', encoded: '' },
  { decoded: 'f', encoded: 'MY======' },
  { decoded: 'fo', encoded: 'MZXQ====' },
  { decoded: 'foo', encoded: 'MZXW6===' },
  { decoded: 'foob', encoded: 'MZXW6YQ=' },
  { decoded: 'fooba', encoded: 'MZXW6YTB' },
  { decoded: 'foobar', encoded: 'MZXW6YTBOI======' },
  { decoded: '', encoded: '', padding: false },
  { decoded: 'f', encoded: 'MY', padding: false },
  { decoded: 'fo', encoded: 'MZXQ', padding: false },
  { decoded: 'foo', encoded: 'MZXW6', padding: false },
  { decoded: 'foob', encoded: 'MZXW6YQ', padding: false },
  { decoded: 'fooba', encoded: 'MZXW6YTB', padding: false },
  { decoded: 'foobar', encoded: 'MZXW6YTBOI', padding: false },
  {
    decoded: new Uint8Array(Array.from({ length: 256 }, (_, i) => i)),
    // deno-fmt-ignore
    encoded: 'AAAQEAYEAUDAOCAJBIFQYDIOB4IBCEQTCQKRMFYYDENBWHA5DYPSAIJCEMSCKJRHFAUSUKZMFUXC6MBRGIZTINJWG44DSOR3HQ6T4P2AIFBEGRCFIZDUQSKKJNGE2TSPKBIVEU2UKVLFOWCZLJNVYXK6L5QGCYTDMRSWMZ3INFVGW3DNNZXXA4LSON2HK5TXPB4XU634PV7H7AEBQKBYJBMGQ6EITCULRSGY5D4QSGJJHFEVS2LZRGM2TOOJ3HU7UCQ2FI5EUWTKPKFJVKV2ZLNOV6YLDMVTWS23NN5YXG5LXPF5X274BQOCYPCMLRWHZDE4VS6MZXHM7UGR2LJ5JVOW27MNTWW33TO55X7A4HROHZHF43T6R2PK5PWO33XP6DY7F47U6X3PP6HZ7L57Z7P674======',
    alphabet: undefined,
  },
  {
    // deno-fmt-ignore
    decoded: new Uint8Array([
      0x00, 0x44, 0x32, 0x14, 0xc7, 0x42, 0x54, 0xb6, 0x35, 0xcf, 0x84, 0x65, 0x3a, 0x56, 0xd7,
      0xc6, 0x75, 0xbe, 0x77, 0xdf
    ]),
    encoded: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567',
  },
  {
    // deno-fmt-ignore
    decoded: new Uint8Array([
      0x00, 0x44, 0x32, 0x14, 0xc7, 0x42, 0x54, 0xb6, 0x35, 0xcf, 0x84, 0x65, 0x3a, 0x56, 0xd7,
      0xc6, 0x75, 0xbe, 0x77, 0xdf, 0x00
    ]),
    encoded: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567AA======',
  },
  {
    // deno-fmt-ignore
    decoded: new Uint8Array([
      0x00, 0x44, 0x32, 0x14, 0xc7, 0x42, 0x54, 0xb6, 0x35, 0xcf, 0x84, 0x65, 0x3a, 0x56, 0xd7,
      0xc6, 0x75, 0xbe, 0x77, 0xdf
    ]),
    encoded: 'BCDEFGHIJKLMNOPQRSTUVWXYZ234567A',
    alphabet: 'BCDEFGHIJKLMNOPQRSTUVWXYZ234567A',
  },
  {
    // deno-fmt-ignore
    decoded: new Uint8Array([
      0x00, 0x44, 0x32, 0x14, 0xc7, 0x42, 0x54, 0xb6, 0x35, 0xcf, 0x84, 0x65, 0x3a, 0x56, 0xd7,
      0xc6, 0x75, 0xbe, 0x77, 0xdf, 0x00
    ]),
    encoded: 'BCDEFGHIJKLMNOPQRSTUVWXYZ234567ABB======',
    alphabet: 'BCDEFGHIJKLMNOPQRSTUVWXYZ234567A',
  },
  {
    // deno-fmt-ignore
    decoded: new Uint8Array([
      0x00, 0x44, 0x32, 0x14, 0xc7, 0x42, 0x54, 0xb6, 0x35, 0xcf, 0x84, 0x65, 0x3a, 0x56, 0xd7,
      0xc6, 0x75, 0xbe, 0x77, 0xdf, 0x00
    ]),
    encoded: 'BCDEFGHIJKLMNOPQRSTUVWXYZ234567ABB******',
    alphabet: 'BCDEFGHIJKLMNOPQRSTUVWXYZ234567A*',
  },
];

Deno.test('encode', () => {
  for (const { decoded, encoded, alphabet, padding } of vectors) {
    const buffer = typeof decoded === 'string' ? new TextEncoder().encode(decoded) : decoded;
    const result = base32.encode(buffer, { alphabet, padding });
    assert(result === encoded, `Expected ${encoded} but got ${result}`);
  }
});

Deno.test('decode', () => {
  for (const { decoded, encoded, alphabet } of vectors) {
    const result = base32.decode(encoded, { alphabet });
    if (typeof decoded === 'string') {
      assert(new TextDecoder().decode(result) === decoded);
    } else {
      assert(result.length === decoded.length);
      for (let i = 0; i < result.length; i++) {
        assert(result[i] === decoded[i]);
      }
    }
  }
});
