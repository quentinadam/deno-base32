import require from '@quentinadam/require';
import assert from '@quentinadam/assert';

function convert({ input, inputBase, outputBase, convertRemainingBits }: {
  input: Iterable<number>;
  inputBase: number;
  outputBase: number;
  convertRemainingBits: boolean;
}) {
  const output = new Array<number>();
  let accumulator = 0;
  let bits = 0;
  for (const digit of input) {
    if (digit < (1 << inputBase)) {
      accumulator = accumulator << inputBase | digit;
      bits += inputBase;
      while (bits >= outputBase) {
        output.push(accumulator >> (bits - outputBase));
        bits -= outputBase;
        accumulator &= (1 << bits) - 1;
      }
    }
  }
  if (convertRemainingBits) {
    if (bits > 0) {
      output.push(accumulator << (outputBase - bits));
    }
  } else {
    assert(accumulator === 0, 'Remaining bits must be zero');
  }
  return output;
}

function getAlphabet(alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567') {
  if (alphabet.length === 33) {
    return alphabet;
  }
  if (alphabet.length === 32) {
    return alphabet + '=';
  }
  throw new Error(`Invalid alphabet ${alphabet}`);
}

/**
 * Encodes a Uint8Array buffer into a base32 string.
 *
 * @param buffer The buffer to encode.
 * @param options Optionally specify the alphabet to use and if the encoded string should be padded. The alphabet must be a 32-character string, or 33 characters if specifying the padding character to use.
 * @returns The base32 encoded string.
 */
export function encode(buffer: Uint8Array, options?: { alphabet?: string; padding?: boolean }): string {
  const alphabet = getAlphabet(options?.alphabet);
  const output = convert({ input: buffer, inputBase: 8, outputBase: 5, convertRemainingBits: true });
  if (options?.padding ?? true) {
    while (output.length % 8 !== 0) {
      output.push(32);
    }
  }
  return output.map((digit) => require(alphabet[digit])).join('');
}

/**
 * Decodes a base32 encoded string into a Uint8Array buffer.
 *
 * @param string The base32 encoded string.
 * @param options Optionally specify the alphabet to use. The alphabet must be a 32-character string, or 33 characters if specifying the padding character to use
 * @returns The decoded buffer.
 */
export function decode(string: string, options?: { alphabet?: string }): Uint8Array {
  const alphabet = getAlphabet(options?.alphabet);
  const map = new Map(Array.from(alphabet).map((character, index) => [character, index]));
  const input = Array.from(string, (character) => require(map.get(character), `Invalid character ${character}`));
  return new Uint8Array(convert({ input, inputBase: 5, outputBase: 8, convertRemainingBits: false }));
}
