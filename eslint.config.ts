// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    type: 'lib',
    pnpm: true,
    antislop: true,
    ignores: [
      // eslint ignore globs here
    ],
  },
  {
    rules: {
      // overrides
    },
  },
)
