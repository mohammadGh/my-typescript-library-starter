import { defineConfig } from 'tsdown'
import { StaleGuardRecorder } from 'tsdown-stale-guard'

export default defineConfig({
  entry: ['src/index.ts'],
  // ESM-only build.
  // To also ship CommonJS, uncomment the following line (emits `.cjs` + `.d.cts`):
  // format: ['esm', 'cjs'],
  dts: true,
  exports: true,
  publint: true,
  attw: true,
  // Runtime-agnostic output without syntax down-leveling.
  // Use `platform: 'node'` for a Node-only library and an explicit
  // `target` (e.g. `target: 'node18'`) to support older runtimes.
  platform: 'neutral',
  target: 'esnext',
  plugins: [
    StaleGuardRecorder(),
  ],
})
