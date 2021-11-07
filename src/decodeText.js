import { atbashCipher } from './atbashChipher.js'
import { caesarCipher } from './caesarCipher.js'

const decode = {
  A: atbashCipher,
  C1: caesarCipher(1),
  C0: caesarCipher(-1),
  R0: caesarCipher(-8),
  R1: caesarCipher(8)
}
//[A, C1, R0]
export const decodeText = (text, config) => {
  let result = text
  config.forEach((item, index) => {
    result = decode[item](result)
  })
  return result
}
