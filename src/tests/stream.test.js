import 'regenerator-runtime/runtime.js'
import { runStream, validateFileExisting } from '../stream'
import fs from 'fs'

describe('validate streams', () => {
  test('validate file Existing', async () => {
    expect.assertions(1)
    const data = await validateFileExisting('input.txt', 'output.txt')
    expect(data).toBe()
  })

  test('validate file is not Existing', async () => {
    expect.assertions(1)
    try {
      await validateFileExisting('input1.txt', 'output1.txt')
    } catch (err) {
      expect(err.code).toBe('ENOENT')
    }
  })
})

describe('run stream with config', () => {
  const config = ['C1', 'C1', 'R0', 'A']
  const result = 'Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!'

  beforeAll(() => {
    fs.appendFile(
      'testInput.txt',
      'This is secret. Message about "_" symbol!',
      () => {}
    )
    fs.appendFile('testOutput.txt', '', () => {})
  })
  afterAll(() => {
    fs.unlink('testInput.txt', () => {})
    fs.unlink('testOutput.txt', () => {})
  })

  test('run stream with input and output file', async () => {
    const data = await new Promise(async (resolve, reject) => {
      await runStream('testInput.txt', 'testOutput.txt', config)
      fs.readFile('testOutput.txt', 'utf8', (err, data) => {
        resolve(data)
        if (err) {
          reject(err)
        }
      })
    })
    expect(data).toBe(result)
  })
})
