import fs from 'fs'
import { Transform, pipeline } from 'stream'
import { decodeText } from './decodeText.js'

const transformData = (config) => {
  return new Transform({
    transform(chunk, encoding, cb) {
      let result = decodeText(chunk.toString(), config)
      this.push(result)
      cb()
    }
  })
}

export const validateFileExisting = async (input, output) => {
  if (input) {
    await new Promise((resolve, reject) => {
      fs.access(input, fs.constants.F_OK, (err) => {
        if (err) {
          reject(err)
        } else resolve()
      })
    })
  }
  if (output) {
    await new Promise((resolve, reject) =>
      fs.access(output, fs.constants.F_OK, (err) => {
        if (err) {
          reject(err)
        } else resolve()
      })
    )
  }
}

export const runStream = async (input, output, config) => {
  let readStream, writeStream
  if (input) {
    readStream = fs.createReadStream(input, () => {})
  } else {
    readStream = process.stdin
  }
  if (output) {
    writeStream = fs.createWriteStream(output, {
      flags: 'a',
      encoding: 'utf-8'
    })
  } else {
    writeStream = process.stdout
  }
  await pipeline(
    readStream,
    ...config.map((item) => {
      return transformData(item)
    }),

    writeStream,
    () => {}
  )
}
