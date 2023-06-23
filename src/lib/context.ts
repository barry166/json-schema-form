import { inject, type Ref } from 'vue'
import type { CommonFieldType, CommonWidgetDefine, Schema, Theme } from './types'

export const SchemaKey = Symbol('schemaKey')

type SchemaContext = {
  SchemaItem: CommonFieldType
  theme: Theme
}

// 不需要use开头也行
export function useSchemaContext () {
  const context: | {
    SchemaItem: CommonFieldType
    formatMapRef: Ref<{ [key: string]: CommonWidgetDefine }>
    transformSchemaRef: Ref<(schema: Schema) => Schema>
  }
    | undefined = inject(SchemaKey)
  if (!context) {
    throw Error('SchemaContext not provided')
  }
  return context
}