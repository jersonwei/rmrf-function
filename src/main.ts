
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
  name?:string,
  params?:any
}
export function getFunctionNode(code:string,index:number):FunctionNode|undefined {
  let functionNode
  const ast = parse(code)
  traverse(ast,{
    FunctionDeclaration(path){
      if(index >= path.node?.start! && index <= path.node?.end!){
        functionNode = {
          name:path.node.id?.name,
          start:path.node?.loc?.start,
          end:path.node?.loc?.end
        }
      }
    },
    ArrowFunctionExpression(path){
      const variableDeclarationPath = path.parentPath.parentPath
      function getArrowFnName(){
        return Object.keys(path.parentPath.getBindingIdentifiers())[0]
      }
      if(variableDeclarationPath?.isVariableDeclaration()){
        if(index >= variableDeclarationPath.node?.start! && index <= variableDeclarationPath.node?.end!){
          functionNode = {
            name:getArrowFnName(),
            start:variableDeclarationPath.node?.loc?.start,
            end:variableDeclarationPath.node?.loc?.end
          }
        }
      }
    },
    FunctionExpression(path){
      const variableDeclarationPath = path.parentPath.parentPath
      function getArrowFnName(){
        return Object.keys(path.parentPath.getBindingIdentifiers())[0]
      }
      if(variableDeclarationPath?.isVariableDeclaration()){
        console.log(variableDeclarationPath)
        if(index >= variableDeclarationPath.node?.start! && index <= variableDeclarationPath.node?.end!){
          functionNode = {
            name:getArrowFnName(),
            start:variableDeclarationPath.node?.loc?.start,
            end:variableDeclarationPath.node?.loc?.end
          }
        }
      }
    }
  })
  return functionNode
}