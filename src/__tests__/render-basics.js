const {resolve} = require('path')
const isRunning = require('is-running')
const {render} = require('../pure')
const {fireEvent} = require('../events')
const {waitFor} = require("../wait-for");
const {getConfig, configure} = require("../config");

let originalConfig
beforeEach(() => {
  originalConfig = getConfig()
  configure({asyncUtilTimeout: 15000})
})

afterEach(() => {
  configure(originalConfig)
})

test('Should handle stderr outputs with rejection', async () => {
  await expect(() =>
    render('node', [resolve(__dirname, './execute-scripts/throw.js')]),
  ).rejects.toThrow(/Search for this error in stderr/)
})

test('Should handle argument passing', async () => {
  const {findByText} = await render('node', [
    resolve(__dirname, './execute-scripts/list-args.js'),
    '--version',
  ])

  expect(await findByText('--version')).toBeTruthy()
})

// TODO: Replace fireEvent with userevent
test('Is able to make terminal input and view in-progress stdout', async () => {
  const props = await render('node', [
    resolve(__dirname, './execute-scripts/stdio-inquirer.js'),
  ])

  const {clear, findByText} = props;

  const instance = await findByText('First option')

  expect(instance).toBeTruthy()

  // Windows uses ">", Linux/MacOS use "❯"
  expect(await findByText(/[❯>] One/)).toBeTruthy()

  clear()

  fireEvent.down(instance)

  expect(await findByText(/[❯>] Two/)).toBeTruthy()

  clear()

  fireEvent.enter(instance)

  expect(await findByText('First option: Two')).toBeTruthy()
})
