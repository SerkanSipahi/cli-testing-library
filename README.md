<div align="center">
<h1>CLI Testing Library [WIP]</h1>

<a href="https://www.joypixels.com/profiles/emoji/1f428">
  <img
    height="80"
    width="80"
    alt="koala"
    src="https://raw.githubusercontent.com/crutchcorn/cli-testing-library/main/other/koala.png"
  />
</a>

<p>Simple and complete CLI testing utilities that encourage good testing
practices.</p>

</div>

<hr />

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->


<!-- prettier-ignore-start -->
[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]
[![version][version-badge]][package]
[![downloads][downloads-badge]][npmtrends]
[![MIT License][license-badge]][license]
[![All Contributors][all-contributors-badge]](#contributors)
[![PRs Welcome][prs-badge]][prs]
[![Code of Conduct][coc-badge]][coc]
[![Discord][discord-badge]][discord]

[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]
[![Tweet][twitter-badge]][twitter]
<!-- prettier-ignore-end -->

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [Usage](#usage)
- [Contributors ✨](#contributors-)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


> This project is not affiliated with the ["Testing Library"](https://github.com/testing-library) ecosystem that this project is
> clearly inspired from. We're just big fans :)


## Installation

This module is distributed via [npm][npm] which is bundled with [node][node] and
should be installed as one of your project's `devDependencies`:

```
npm install --save-dev cli-testing-library
```

## Usage

> This is currently the only section of "usage" documentation. We'll be expanding it as soon as possible

Usage example:

```javascript
const {resolve} = require('path')
const {render, fireEvent} = require('cli-testing-library')

test('Is able to make terminal input and view in-progress stdout', async () => {
  const {cleanup, findByText} = await render('node', [
    resolve(__dirname, './execute-scripts/stdio-inquirer.js'),
  ])

  const instance = await findByText('First option')

  expect(instance).toBeTruthy()

  expect(await findByText('❯ One')).toBeTruthy()

  cleanup()

  fireEvent.down(instance)

  expect(await findByText('❯ Two')).toBeTruthy()

  cleanup()

  fireEvent.enter(instance)

  expect(await findByText('First option: Two')).toBeTruthy()
})
```
## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://crutchcorn.dev/"><img src="https://avatars.githubusercontent.com/u/9100169?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Corbin Crutchley</b></sub></a><br /><a href="https://github.com/crutchcorn/cli-testing-library/commits?author=crutchcorn" title="Code">💻</a> <a href="https://github.com/crutchcorn/cli-testing-library/commits?author=crutchcorn" title="Documentation">📖</a> <a href="#maintenance-crutchcorn" title="Maintenance">🚧</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!