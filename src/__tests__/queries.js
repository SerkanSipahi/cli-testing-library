const {resolve} = require('path')
const {render} = require('../pure')
const {waitFor} = require("../wait-for");

test('findByText should find text', async () => {
  const {findByText} = await render('node', [
    resolve(__dirname, './execute-scripts/list-args.js'),
    '--version',
  ])

  expect(await findByText('--version')).toBeTruthy()
})

test('findByText should throw errors', async () => {
  const {findByText} = await render('node', [
    resolve(__dirname, './execute-scripts/list-args.js'),
    '--version',
  ])

  await expect(() => findByText('--nothing')).rejects.toThrow('Unable to find an stdout line with the text:')
})

test('queryByText should find text', async () => {
  const props = await render('node', [
    resolve(__dirname, './execute-scripts/list-args.js'),
    '--version',
  ])

  const {queryByText} = props;

  expect(await queryByText('--version')).toBeTruthy()
})

test('queryByText should not throw errors', async () => {
  const {queryByText} = await render('node', [
    resolve(__dirname, './execute-scripts/list-args.js'),
    '--version',
  ])

  expect(await queryByText('--nothing')).toBeFalsy();
})

test('getByText should find text', async () => {
  const {getByText} = await render('node', [
    resolve(__dirname, './execute-scripts/list-args.js'),
    '--version',
  ])

  expect(await waitFor(() => getByText('--version'))).toBeTruthy();
})

test('getByText should throw errors', async () => {
  const {getByText} = await render('node', [
    resolve(__dirname, './execute-scripts/list-args.js'),
    '--version',
  ])

  await expect(() => waitFor(() => getByText('--nothing'))).rejects.toThrow('Unable to find an stdout line with the text:');
})
