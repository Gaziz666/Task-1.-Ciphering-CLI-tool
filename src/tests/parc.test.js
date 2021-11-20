import { findConfig, findInput, findOutput, validateAction } from "../cli";

describe('parc process.arg', () => {
  const input = 'input'
  const config = 'config'
  const output = 'output'
  const argsConfig = ['-c', config, '--config', config]
  const argsInput = ['-i', input, '--input', input]
  const argsOutput = ['-o', output, '--output', output]
  const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {})


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
  test('validate action', () => {
    const action = 'C1'
    expect(validateAction(action)).toBe()
  })
})