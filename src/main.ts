
import {parse} from '@babel/parser'
import traverse from '@babel/traverse'

export interface FunctionNode{
  start:{
    line:number,
    column:number,
    index:number
  },
  end:{
    line:number,
    column:number,
    index:number
  },
  name:string
}
export function getFunctionNode(code:string,index:number):FunctionNode|undefined {
  let functionNode
  const ast = parse(code)
  traverse(ast,{
    FunctionDeclaration(path){
      console.log(path.node)
      // functionNode = path.node
      if(index >= path.node?.start! && index <= path.node?.end!){
        functionNode = {
          name:path.node.id?.name,
          start:path.node?.loc?.start,
          end:path.node?.loc?.end
        }

      }
    }
  })
  return functionNode
}