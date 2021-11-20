export const parcArgs = () => {
  const arr = process.argv.slice(2)
  let config = ''
  let input = ''
  let output = ''
  for (let i = 0; i < arr.length; i++) {
    config = findConfig(i, arr, config) || config
    input = findInput(i, arr, input) || input
    output = findOutput(i, arr, output) || output
  }
  const configArr = config.split('-')
  for (let i = 0; i < configArr.length; i++) {
    validateConfig(configArr[i])
  }
  return { config: configArr, input, output }
}

export function findConfig(i, arr, config) {
  if (arr[i] === '-c' || arr[i] === '--config') {
    if (config) {
      console.error('error: flag -c or --config should not be repeated')
      process.exit(1)
    }
    return arr[i + 1]
  }
}

export function findInput(i, arr, config) {
  if (arr[i] === '-i' || arr[i] === '--input') {
    if (config) {
      console.error('error: flag -i or --input should not be repeated')
      process.exit(1)
    }
    return arr[i + 1]
  }
}

export function findOutput(i, arr, config) {
  if (arr[i] === '-o' || arr[i] === '--output') {
    if (config) {
      console.error('error: flag -o or --output should not be repeated')
      process.exit(1)
    }
    return arr[i + 1]
  }
}

export function validateConfig(config) {
  if (config[0] === 'C') {
    validateAction(config)
    return
  }
  if (config[0] === 'R') {
    validateAction(config)
    return
  }
  if (config[0] === 'A') {
    if (config.length > 1) {
      console.error('error: flag Y should not be passed for A flag')
      process.exit(1)
    }
    return
  }
  console.error('error: cipher mark should be "A", "C" or "R"')
  process.exit(1)
}

export function validateAction(action) {
  if (action.slice(1) === '1' || action.slice(1) === '0') {
    return
  }
  console.error('error: flag Y should be 0 or 1')
  process.exit(1)
}
