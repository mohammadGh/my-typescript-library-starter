# my-typescript-library-starter
A boilerplate for starting a TypeScript library with ease, equipped with:
 - ESLint
 - Commitizen
 - Husky
 - Release-it
 - Changelogen

> **Note**:
> After cloning the repo, replace `name`, `version`, `description`, `author`, `homepage` and `repository related links` fields in `package.json` to use this template.

## ESLint & ESLint Configuration
We use @antfu amazing eslint configuration. Js file `eslint.config.js` configures the `eslint`. It extends antfu's configuration but you can customize it. for example if you prefer to use double-quotations for string, change this file as:

``` javascript
import antfu from '@antfu/eslint-config'

export default antfu({
  stylistic: {
    quotes: 'double'
  },
})
```
## Conventional Commits & Husky Hooks
we use `Commitizen` for conventinal commits. `husky` is used to enforce conventional commit messages with `commitlint`.

## Test & Test Coverage
`Vitest` is used for running tests and measure test coverage.

## Release-it for Releasing
We use `release-it` for version management and publish to anywhere (npm or github). We also use its hooks to execute any command we need to test, build, and publish our project.

## Auto Changelog based on Conventional Commits
We use `changelogen` to generate beautiful changelogs using Conventional Commits.

## License
[MIT](./LICENSE) License
