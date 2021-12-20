import ejs from 'ejs'
import fs from 'fs-extra'
import prettier from 'prettier'
import { outputDir } from '../constants'
import { RenderFileArgs } from '../types'

// Configuration
const ejsOptions = {}
const prettierOptions = {
  parser: 'typescript',
  semi: false,
  singleQuote: true
}

/**
 * Given file meta information, an EJS template, and variables, render and
 * output the file.
 * 
 * @param {Object} args - An object.
 * @param {string} args.extension - File extension to use. Defaults to `ts`.
 * @param {string} args.filename - The name of the file to output.
 * @param {string} args.folder - The folder to output the file to.
 * @param {string} args.template - Path to the template file to be used.
 * @param {Object} args.variables
 */
function renderFile({
  extension = 'ts',
  filename,
  folder,
  template,
  variables
}: RenderFileArgs) {
  ejs.renderFile(template, variables, ejsOptions, (err: any, str: string) => {
    if (err) {
      console.error('Error rendering file: ' + err)
      return
    }

    const prettierFile = prettier.format(str, prettierOptions)
    const filePath = `${outputDir}/${folder}/${filename}.${extension}`
    fs.ensureFileSync(filePath)
    fs.outputFileSync(filePath, prettierFile)
  })
}

export default renderFile
