import { OpenAPIV3 } from 'openapi-types' 
import { camelCase, getCases } from '../lib'
import { GetOperationVariablesReturn, OperationType } from '../types'
import { parseParameters } from '.'

/**
 * Get the operation variables for a given operation.
 *
 * @param {OperationType} operation
 * @param {string} path
 * @param {OpenAPIV3.PathItemObject} service
 * @returns {GetOperationVariablesReturn}
 */
function getOperationVariables(
  operation: OperationType,
  path: string,
  service: OpenAPIV3.PathItemObject,
): GetOperationVariablesReturn {
  const operationId = service[operation]!.operationId
  const name = operationId!.substring(operation.length)
  const parsedPath = path.replace(
    /{(.*?)}/g,
    (match: string) => '${' + camelCase(match) + '}'
  )

  // @ts-ignore
  return {
    ...service[operation],
    ...getCases(name, 'name'),
    ...getCases(operationId!, 'operationId'),
    // @ts-ignore
    ...parseParameters(service[operation].parameters),
    operation: operation.toUpperCase(),
    path: parsedPath
  }
}

export default getOperationVariables
