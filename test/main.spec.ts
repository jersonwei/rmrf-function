import { test,expect} from 'vitest'
import { getFunctionNode } from '../src/main'

test('init',() => {
  const code =  `
  function getName () {
      return 'name'
  }
  function getNameA () {
      return 'name'
  }
  `
  const index =10
  const functionCode =  getFunctionNode(code,index)

  expect(functionCode).toEqual({
    name:'getName',
    start:{
      line: 2, column: 2, index: 3
    },
    end:{
      line: 4, column: 3, index: 48
    }
  })
})

test.only('ArrowFunctionExpression',() => {
  const code = `
  const getName = () => 'heihei'
  `
  const index = 10
  const functionNode = getFunctionNode(code,index)
  console.log(functionNode)
  expect(functionNode).toEqual({
    name:'getName',
    start:{
      line: 2, column: 2, index: 3
    },
    end:{
      line: 2, column: 32, index: 33
    }
  })
})