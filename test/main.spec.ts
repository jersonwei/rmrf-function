import { test,expect} from 'vitest'
import { getFunctionNode } from '../src/main'

test('init',() => {
  getFunctionNode()
  expect(true).toBe(true)
})