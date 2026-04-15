import { assert } from '@quentinadam/assert';
import * as base32 from './base32.ts';

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
    decoded: Uint8Array.fromHex('00443214c74254b635cf84653a56d7c675be77df'),
    encoded: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567',
  },
  {
    decoded: Uint8Array.fromHex('00443214c74254b635cf84653a56d7c675be77df00'),
    encoded: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567AA======',
  },
  {
    decoded: Uint8Array.fromHex('00443214c74254b635cf84653a56d7c675be77df'),
    encoded: 'BCDEFGHIJKLMNOPQRSTUVWXYZ234567A',
    alphabet: 'BCDEFGHIJKLMNOPQRSTUVWXYZ234567A',
  },
  {
    decoded: Uint8Array.fromHex('00443214c74254b635cf84653a56d7c675be77df00'),
    encoded: 'BCDEFGHIJKLMNOPQRSTUVWXYZ234567ABB======',
    alphabet: 'BCDEFGHIJKLMNOPQRSTUVWXYZ234567A',
  },
  {
    decoded: Uint8Array.fromHex('00443214c74254b635cf84653a56d7c675be77df00'),
    encoded: 'BCDEFGHIJKLMNOPQRSTUVWXYZ234567ABB******',
    alphabet: 'BCDEFGHIJKLMNOPQRSTUVWXYZ234567A*',
  },
];

Deno.test('encode', () => {
  for (const { decoded, encoded, alphabet, padding } of vectors) {
    const buffer = typeof decoded === 'string' ? new TextEncoder().encode(decoded) : decoded;
    const result = base32.encode(buffer, { alphabet, padding });
    assert(result === encoded, `Expected ${JSON.stringify(encoded)} but got ${JSON.stringify(result)}`);
  }
});

Deno.test('decode', () => {
  for (const { decoded, encoded, alphabet } of vectors) {
    if (typeof decoded === 'string') {
      const result = new TextDecoder().decode(base32.decode(encoded, { alphabet }));
      assert(result === decoded, `Expected ${JSON.stringify(decoded)} but got ${JSON.stringify(result)}`);
    } else {
      const result = base32.decode(encoded, { alphabet });
      assert(
        result.toHex() === decoded.toHex(),
        `Expected [${decoded.toHex()}] but got [${result.toHex()}]`,
      );
    }
  }
});
