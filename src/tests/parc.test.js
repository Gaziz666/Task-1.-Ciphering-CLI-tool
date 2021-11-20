import { findConfig, findInput, findOutput, validateAction, validateConfig } from "../cli";
const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {})

describe('parc process.arg', () => {
  const input = 'input'
  const config = 'config'
  const output = 'output'
  const argsConfig = ['-c', config, '--config', config]
  const argsInput = ['-i', input, '--input', input]
  const argsOutput = ['-o', output, '--output', output]


  test('find config arg -c', () => {
    expect(findConfig(0, argsConfig, '')).toBe(config)
  });

  test('find config arg --config', () => {
    expect(findConfig(2, argsConfig, '')).toBe(config)
  });

  test('duplicate arg -c', () => {
    findConfig(0, argsConfig, config)
    expect(mockExit).toHaveBeenCalledWith(1)
  });

  test('find config arg -i', () => {
    expect(findInput(0, argsInput, '')).toBe(input)
  });

  test('find config arg --input', () => {
    expect(findInput(2, argsInput, '')).toBe(input)
  });

  test('duplicate arg -i', () => {
    findInput(0, argsInput, input)
    expect(mockExit).toHaveBeenCalledWith(1)
  });

  test('find config arg -o', () => {
    expect(findOutput(0, argsOutput, '')).toBe(output)
  });

  test('find config arg --output', () => {
    expect(findOutput(2, argsOutput, '')).toBe(output)
  });

  test('duplicate arg -i', () => {
    findOutput(0, argsOutput, output)
    expect(mockExit).toHaveBeenCalledWith(1)
  });
});

describe('validate action and config', () => {
  test('validate action command', () => {
    const action = 'C1'
    expect(validateAction(action)).toBe()
  })

  test('validate action other then 0 or 1', () => {
    validateAction('a2')
    expect(mockExit).toHaveBeenCalledWith(1)
  });

  const testConfig = 'A-C1-C0-R1-A1-B'
  const configArr = testConfig.split('-')
  for (let i = 0; i < configArr.length; i++) {
    if(configArr[i] === 'A1') {
      validateConfig(configArr[i])
      expect(mockExit).toHaveBeenCalledWith(1)
      continue
    }
    if(configArr[i] === 'B') {
      validateConfig(configArr[i])
      expect(mockExit).toHaveBeenCalledWith(1)
      continue
    }
    expect(validateConfig(configArr[i])).toBe()
  }
})