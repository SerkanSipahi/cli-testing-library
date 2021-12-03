# API

`CLI Testing Library`, despite taking clear inspiration from, does not re-export anything
from [`DOM Testing Library`](https://testing-library.com/docs/dom-testing-library/). Likewise,
while we've done our best to match the API names of [Testing Library's Core API](https://testing-library.com/docs/),
because of the inherent differences between CLI apps and web apps, we're unable to match all of them.

> Know of a Testing Library Core API that you think would fit here that isn't present? [Let us know!](https://github.com/crutchcorn/cli-testing-library/issues)

Instead, the following API is what `CLI Testing Library` provides the following.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [`render`](#render)
- [`render` Options](#render-options)
  - [`cwd`](#cwd)
  - [`spawnOpts`](#spawnopts)
- [`render` Result](#render-result)
  - [`...queries`](#queries)
    - [ByText](#bytext)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# `render`

```typescript
function render(
    command: string,
    args: string[],
    options?: {
        /* You won't often use this, expand below for docs on options */
    },
): RenderResult;
```

Run the CLI application in a newly spawned process.

```javascript
import {render} from 'cli-testing-library'

render('node', ['./path/to/script.js'])
```


```javascript
import {render} from 'cli-testing-library'

test('renders a message', () => {
    const {getByText} = render('node', ['./console-out.js']);
    expect(getByText('Hello, world!')).toBeTruthy();
});
```

# `render` Options

You won't often need to specify options, but if you ever do,
here are the available options which you could provide as a third argument to `render`.

## `cwd`

By default, `CLI Testing Library` will run the new process in the working directory
of your project's root, as defined by your testing framework. If you provide your own
working directory via this option, it will change the execution directory of your process.

For example: If you are end-to-end testing a file moving script, you don't want to have
to specify the absolute path every time. In this case, you can specify a directory as the render `cwd`.

```javascript
const containingPath = path.resolve(__dirname, './movables');

const {getByText} = render('node', ['mover.js'], {
    cwd: containingPath
})
```

## `spawnOpts`

Oftentimes, you want to modify the behavior of the spawn environment.
This may include things like changing the shell that's used to run scripts or more.

This argument allows you to configure the options that are passed to the underlying
[`child_process.spawn` NodeJS API](https://nodejs.org/api/child_process.html#child_processspawncommand-args-options).

```javascript
const {getByText} = render('script.ps1', {
    spawnOpts: {
        shell: 'powershell.exe'
    }
})
```

# `render` Result

The `render` method returns an object that has a few properties:

## `...queries`

The most important feature of render is that the queries from [CLI Testing Library](https://github.com/crutchcorn/cli-testing-library)
are automatically returned with their first argument bound to the testInstance.

See [Queries](./queries.md) to learn more about how to use these queries and the philosophy behind them.

### ByText

> getByText, queryByText, findByText

```typescript
getByText(
        // If you're using `screen`, then skip the container argument:
        instance: TestInstance,
        text: TextMatch,
        options?: {
          exact?: boolean = true,
          trim?: boolean = false,
          stripAnsi?: boolean = false,
          collapseWhitespace?: boolean = false,
          normalizer?: NormalizerFn,
          suggest?: boolean,
        }): TestInstance
```

Queries for test instance `stdout` results with the given text (and it also accepts a TextMatch). 

These options are all standard for text matching. To learn more, see our [Queries page](./queries.md).

## `fireEvent`

```javascript
fireEvent(instance: TestInstace, event: Event)
```

> While `fireEvent` isn't usually returned on `render` in, say, `React Testing Library`, we're able to do
> so because of our differences in implementation with upstream. See our [Differences](./differences.md) doc for more.
