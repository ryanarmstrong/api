import fs from 'fs-extra'
import { outputDir } from '../constants'

const openapiTS = require('openapi-typescript').default

/**
 * Using the 'openapi-typescript' library, generate the typescript typings.
 */
async function generateTypes() {
  const output = await openapiTS('https://stg.admin.api.ngc.nvidia.com/v3/api-docs')
  const filePath = `${outputDir}/types.ts`
  fs.ensureFileSync(filePath)
  fs.outputFileSync(filePath, output)
}

export default generateTypes
