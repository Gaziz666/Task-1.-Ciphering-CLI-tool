import { runStream, validateFileExisting } from './stream.js'
import { parcArgs } from './cli.js'

const { config, input, output } = parcArgs()

try {
  await validateFileExisting(input, output)
  await runStream(input, output, config)
} catch (err) {
  console.error('error', err.message)
}
