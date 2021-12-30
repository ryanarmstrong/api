import { OpenAPIV3 } from 'openapi-types' 
import fs from 'fs-extra'
import https from 'https'
import nodePath from 'path'
import { generateTypes, getOperationVariables, renderFile } from './core'
import { outputDir } from './constants'
import { OperationType } from './types'
import { pascalCase } from './lib'

// Constants
const API_URL = 'https://petstore.swagger.io/v2/swagger.json'
const ORG_PATH = '/v2/admin/org/{org-name}'
const SUPPORTED_OPERATIONS = ['get']

function main() {
  // Ensure the `dist` directory is clean. 
  fs.emptyDirSync(outputDir)

  // Generate the Typescript typings.
  generateTypes()

  // Fetch the OpenAPI spec.
  https.get(API_URL, (res: any) => {
    let data = ''
    res.on('data', (chunk: any) => data += chunk)
    res.on('end', () => {
      // Parse the OpenAPI document.
      const openApiSpec: OpenAPIV3.Document = JSON.parse(data)

      // Get the array of paths.
      const servicePaths = Object.keys(openApiSpec.paths)
        // For now only get the admin GET org service.
        .filter(path => path.includes(ORG_PATH))

      // Generate React Query client.
      servicePaths.forEach(path => {
        const service = openApiSpec.paths[path]

        // Get an array of supported operations.
        const availableOperations = Object.keys(service!).filter((op: any) => SUPPORTED_OPERATIONS.includes(op)) as OperationType[]

        // Generate the React Query client for each operation.
        availableOperations.forEach(operation => {
          const variables = getOperationVariables(operation, path, service!)
          const template = nodePath.join(__dirname, './templates/reactQueryQuery.ejs')

          renderFile({
            filename: `use${pascalCase(variables.operationId!)}`,
            folder: variables.nameKebab,
            template,
            variables
          })
        })
      })
    })
  }).on('error', (err: any) => {
    console.error('Error fetching API spec: ' + err.message)
  })
}

main()
