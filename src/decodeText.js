import { atbashCipher } from './atbashChipher.js'
import { caesarCipher } from './caesarCipher.js'

const decode = {
  A: atbashCipher,
  C1: caesarCipher(1),
  C0: caesarCipher(-1),
  R0: caesarCipher(-8),
  R1: caesarCipher(8)
}
export const decodeText = (text, config) => {
  return decode[config](text)
}
