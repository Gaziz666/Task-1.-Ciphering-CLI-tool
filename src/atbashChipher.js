export const atbashCipher = (str) => {
  let resultStr = ''
  for (let i = 0; i < str.length; i++) {
    const newChar = decodeChar(str[i].charCodeAt(0))
    resultStr += String.fromCharCode(newChar)
  }
  return resultStr
}

const decodeChar = (letter) => {
  let char
  if (letter >= 65 && letter <= 90) {
    char = calcNewChar(letter, 64)
  } else if (letter >= 97 && letter <= 122) {
    char = calcNewChar(letter, 96)
  } else char = letter

  return char
}

const calcNewChar = (char, charOfA) => {
  const newChar = 26 - (char - charOfA) + 1 + charOfA
  return newChar
}
