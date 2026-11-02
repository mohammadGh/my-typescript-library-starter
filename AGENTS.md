# AGENTS.md

Guidance for AI agents working in a project built from `ts-lib-starter-kit`. These
conventions are the baseline the starter provides; keep them intact as the project
develops.

## Commands

Use `pnpm` for everything; `npm` and `yarn` are not supported.

| Command | Purpose |
| --- | --- |
| `pnpm install` | Install dependencies |
| `pnpm dev` | Rebuild on change |
| `pnpm build` | Bundle into `dist/` and validate the package |
| `pnpm test` / `pnpm test --run` | Run Vitest in watch mode / once |
| `pnpm coverage` | Run tests with V8 coverage |
| `pnpm lint` | Lint the repo |
| `pnpm typecheck` | Run `tsc --noEmit` |
| `pnpm spell` | Spell-check the repository |
| `pnpm commit` | Create a Conventional Commit interactively |
| `pnpm release` | Version, changelog, tag, and publish |

Before handing work back, run `pnpm lint`, `pnpm typecheck`, and `pnpm test --run`.
Also run `pnpm build` when the public API or build output changes.

## Project Conventions

### Package management

- Use `pnpm` only. Shared dev tool versions live in catalogs in `pnpm-workspace.yaml`;
  add a version to the matching catalog and reference it as `"catalog:<name>"` instead
  of hard-coding ranges in `package.json`.
- Change `pnpm-lock.yaml` only through `pnpm`; never edit it by hand. CI installs with
  `--frozen-lockfile`.

### Module format and build

- The package is **ESM-only** (`"type": "module"`), with `src/index.ts` as the single
  entry point emitted to `dist/index.js`. Add CommonJS only by explicitly enabling
  `format: ['esm', 'cjs']` in `tsdown.config.ts`.
- `dist/` is generated and git-ignored. Never edit or commit it.
- Treat `publint` and `attw` warnings as failures.
- Keep the library side-effect free (`"sideEffects": false`); avoid top-level side
  effects in exported modules.

### TypeScript

- `strict` and `strictNullChecks` are enabled. Do not weaken compiler options or use
  `@ts-ignore`/`any` to silence errors; fix the types.
- Target `ESNext` with `Bundler` resolution. Prefer standard ESM and runtime-agnostic
  APIs.

### Linting and formatting

- ESLint flat config via `@antfu/eslint-config` handles both linting and formatting.
  Do not add Prettier or another formatter.
- Follow the existing style and let `eslint --fix`/`pnpm lint` format the code. Put
  rule overrides in `eslint.config.ts`, not inline disables.
- Respect the `sonarjs` and `slop` rules: keep functions focused and avoid low-value
  or redundant code.

### Testing

- Tests live in `test/` and use Vitest, importing from `../src` (or the public entry).
  Add a test for every behavior change or bug fix.
- Keep tests deterministic and free of network or filesystem side effects.
- Coverage uses `@vitest/coverage-v8`; do not lower thresholds or exclude real source
  files just to pass.

### Commits and hooks

- Use **Conventional Commits**: `<type>[optional scope]: <description>`. Valid types
  are `feat`, `fix`, `docs`, `refactor`, `test`, `build`, `ci`, `chore`, `perf`, and
  `revert`. Keep subjects concise and do not end them with a period.
- Prefer `pnpm commit` (Commitizen); Commitlint enforces the format.
- Never bypass Husky (`--no-verify`). `pre-commit` runs lint-staged plus cspell on
  staged files; `commit-msg` runs Commitlint plus cspell.
- Stage intentionally. Do not commit secrets or generated files.

### Spelling

- cspell checks staged files and commit messages. Add legitimate project terms to
  `project-words.txt` instead of using inline ignore directives.
- Keep the `CHANGELOG.md` and `README.md` exclusions in `cspell.json` narrow.

### Releases and CI

- Releases use `pnpm release` (release-it + changelogen) from `main`. Never manually
  bump versions, edit `CHANGELOG.md`, tag, or publish; changelogs are generated from
  Conventional Commits.
- Keep the `before:init` hook running `git pull`, lint, typecheck, tests, and build.
- CI (`.github/workflows/build-typecheck-test.yml`) runs install, lint, typecheck,
  tests, and build on pushes and pull requests to `main`. Do not skip or weaken steps;
  fix the underlying failure.

### Layout and configuration

- `src/` is library source, `test/` holds tests, and `dist/` is generated output.
- Configuration belongs in the existing dedicated config files. Avoid ad-hoc configs
  or scripts when a supported option already exists.
