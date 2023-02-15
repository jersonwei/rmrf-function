
import {parse} from '@babel/parser'
import traverse from '@babel/traverse'
export function getFunctionNode() {
  
  const code =  `
  function getName () {
      return 'name'
  }
  function getNameA () {
      return 'name'
  }
  `
  const ast = parse(code)
  traverse(ast,{
    FunctionDeclaration(path){
      console.log(path.node)
    }
  })
}