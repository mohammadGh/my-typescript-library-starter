import { describe, expect, it } from 'vitest'
import { HelloFromLib } from '../src'

describe('should', () => {
  it('my hello msg should be exported correctly', () => {
    expect(HelloFromLib).toEqual('Hi, it\'s just another starter template!')
  })
})
