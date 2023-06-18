import { inject } from 'vue'
import type { CommonWidgetDefine } from './types'

export const SchemaKey = Symbol('schemaKey')

type SchemaContext = {
  SchemaItem: CommonWidgetDefine
}

export function useSchemaContext () {
  const context: SchemaContext | undefined = inject(SchemaKey)
  if (!context) {
    throw Error('SchemaContext not provided')
  }
  return context
}