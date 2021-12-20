import { OpenAPIV3 } from 'openapi-types' 
import { camelCase, getCases } from '../lib'
import { ParseParametersReturn } from '../types'

/**
 * Parse the parameters and split them into path and query parameters.
 *
 * @param {OpenAPIV3.ParameterObject[]} parameters
 * @returns {ParseParametersReturn}
 */
function parseParameters(parameters: OpenAPIV3.ParameterObject[]): ParseParametersReturn {
  const pathParams: OpenAPIV3.ParameterObject[] = []
  const queryParams: OpenAPIV3.ParameterObject[] = []
  const _parameters = parameters.map((parameter: any) => ({
    ...parameter,
    name: camelCase(parameter.name),
  }))

  _parameters.forEach(parameter => {
    if (parameter.in === 'path') {
      pathParams.push(parameter)
    } else if (parameter.in === 'query') {
      queryParams.push({
        ...parameter,
        ...getCases(parameter.name, 'name')
      })
    }
  })

  return {
    parameters: _parameters,
    pathParams,
    queryParams
  }
}

export default parseParameters
