import camelCase from 'lodash.camelcase'
import kebabCase from 'lodash.kebabcase'

export const getCases = (value: string, key: string) => ({
  [`${key}Camel`]: camelCase(value),
  [`${key}Kebab`]: kebabCase(value),
  [`${key}Pascal`]: pascalCase(value)
})

export const pascalCase = (value: string) =>
  value.charAt(0).toUpperCase() + camelCase(value).slice(1)

export {
  camelCase,
  kebabCase
}
