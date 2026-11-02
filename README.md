# ts-lib-starter-kit

A modern, batteries-included starter for TypeScript libraries. It ships an ESM-first
[tsdown](https://tsdown.dev) build, a zero-config linting stack, tests with coverage,
Conventional Commits, and automated releases - with no Prettier required.

## What's inside

- **Build** - tsdown (Rolldown-powered) with declaration files, generated `exports`,
  `publint` + `arethetypeswrong` validation, and stale-build tracking.
- **Code quality** - ESLint flat config via `@antfu/eslint-config` (formatting included) and strict TypeScript.
- **Testing** - Vitest with V8 coverage.
- **Commits** - Commitizen prompts, Commitlint rules, Husky hooks, and lint-staged.
- **Release** - release-it for versioning and publishing, changelogen for changelogs.
- **CSpell** - Autoamting spell checking for everythings (including commit messages).
- **Extras** - pnpm dependency catalogs, a CI workflow, and shared VS Code settings.

## Quick start

Requires Node.js LTS and [pnpm](https://pnpm.io) - pnpm is required because dependency
versions are managed with pnpm catalogs.

```bash
# Use GitHub's "Use this template" button, or clone the repo
pnpm install
```

After cloning, update the project metadata in `package.json`:

- `name`, `version`, `description`
- `author`, `license`
- `homepage`, `repository`, `bugs`
- `keywords`

## Scripts

| Script | Description |
| --- | --- |
| `pnpm dev` | Rebuild on file changes |
| `pnpm build` | Type-check and bundle into `dist/` |
| `pnpm test` | Run Vitest in watch mode |
| `pnpm test --run` | Run the test suite once |
| `pnpm coverage` | Run tests with V8 coverage |
| `pnpm lint` | Lint the repo with ESLint |
| `pnpm typecheck` | Run `tsc --noEmit` |
| `pnpm commit` | Create a Conventional Commit interactively |
| `pnpm release` | Version, changelog, tag, and publish |

## Project layout

```text
.
├── src/                  # Library source
├── test/                 # Vitest tests
├── .github/workflows/    # CI
├── .husky/               # Git hooks
├── eslint.config.ts      # ESLint flat config
├── tsdown.config.ts      # Build config
├── vitest.config.ts      # Test & coverage config
├── commitlint.config.ts  # Commit message rules
├── cspell.json           # Spell-check config
├── .release-it.json      # Release config
└── pnpm-workspace.yaml   # Workspace & dependency catalogs
```

## Build

The library is **ESM-only** by default. `pnpm build` emits `dist/index.js` and
`dist/index.d.ts`, generates the `exports` field, and runs `publint` and `attw` as
part of the build.

To also ship CommonJS, uncomment the `format` line in `tsdown.config.ts`:

```ts
format: ['esm', 'cjs']
```

The build then emits `.cjs` and `.d.cts` outputs and updates `exports` accordingly.
The config uses `platform: 'neutral'` and `target: 'esnext'` for runtime-agnostic
output; switch to `platform: 'node'` and an explicit `target` (e.g. `node18`) for a
Node-only library that supports older runtimes.

## Linting & formatting

Formatting is handled by ESLint through `@antfu/eslint-config` - no Prettier needed.
Customize the rules in `eslint.config.ts`:

```ts
import antfu from '@antfu/eslint-config'

export default antfu({
  type: 'lib',
  pnpm: true,
  stylistic: {
    quotes: 'double',
  },
})
```

## Testing

Vitest runs the tests and `@vitest/coverage-v8` collects coverage. Adjust excludes
in `vitest.config.ts`:

```ts
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      exclude: [
        ...configDefaults.exclude,
        '**/*.d.ts',
        '*.config.js',
        '*.config.cjs',
        '*.config.ts',
      ],
    },
  },
})
```

## Commits & hooks

Stage your changes, then use Commitizen instead of `git commit`:

```bash
git add .
pnpm commit
```

Husky enforces quality before a commit lands:

- **pre-commit** - runs lint-staged on staged code files, then cspell on all staged files.
- **commit-msg** - validates the message with Commitlint and spell-checks it with cspell.

Rules live in `commitlint.config.ts` and extend `@commitlint/config-conventional`.

## Release

`pnpm release` uses release-it to bump the version, generate a changelog with
changelogen, tag the release, publish to npm, and create a GitHub release. Releases
must be made from `main`, and the pre-release hook runs lint, typecheck, tests, and a
build first. The changelog is written to `CHANGELOG.md`.

## Spelling

cspell checks staged files and commit messages. Configure it in `cspell.json` and add
project-specific words to `project-words.txt`.

## Dependency catalogs

Dev dependency versions are centralized in `pnpm-workspace.yaml` using named catalogs
(`lint`, `test`, `build`, `release`, `commit`, `types`, `tooling`). Reference them in
`package.json` instead of repeating versions:

```yaml
catalogs:
  lint:
    '@antfu/eslint-config': ^10.0.0
```

```json
{
  "devDependencies": {
    "@antfu/eslint-config": "catalog:lint"
  }
}
```

## CI

`.github/workflows/build-typecheck-test.yml` runs install, lint, typecheck, tests, and
build on every push and pull request targeting `main`.

## License

[MIT](./LICENSE)
