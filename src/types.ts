import { OpenAPIV3 } from 'openapi-types' 

export type OperationType = 'get'

export type FileExtension = 'ts'
export interface RenderFileArgs {
  extension?: FileExtension
  filename: string
  folder: string
  template: any
  variables: Record<string, any>
}

export interface GetOperationVariablesReturn
  extends Partial<OpenAPIV3.OperationObject> {
    nameCamel: string
    nameKebab: string
    namePascal: string
    operation: string
    operationIdCamel: string
    operationIdKebab: string
    operationIdPascal: string
    path: string
    pathParams: OpenAPIV3.ParameterObject[]
    queryParams: OpenAPIV3.ParameterObject[]
  }

export interface ParseParametersReturn {
  parameters: OpenAPIV3.ParameterObject[]
  pathParams: OpenAPIV3.ParameterObject[]
  queryParams: OpenAPIV3.ParameterObject[]
}
