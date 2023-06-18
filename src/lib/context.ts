import { inject } from 'vue'
import type { CommonFieldType, Theme } from './types'

export const SchemaKey = Symbol('schemaKey')

type SchemaContext = {
  SchemaItem: CommonFieldType
  theme: Theme
}

export function useSchemaContext () {
  const context: SchemaContext | undefined = inject(SchemaKey)
  if (!context) {
    throw Error('SchemaContext not provided')
  }
  return context
}