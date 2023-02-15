
import {parse} from '@babel/parser'
import traverse from '@babel/traverse'
export function getFunctionNode(code:string,index:number) {
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