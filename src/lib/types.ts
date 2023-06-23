import type { DefineComponent, PropType } from 'vue'
import SelectionWidget from './widgets/selection'
import type { ErrorSchema } from './validator'

export enum SchemaTypes {
  'NUMBER' = 'number',
  'INTEGER' = 'integer',
  'STRING' = 'string',
  'OBJECT' = 'object',
  'ARRAY' = 'array',
  'BOOLEAN' = 'boolean',
}

type SchemaRef = { $ref: string }

export interface Schema {
  type?: SchemaTypes | string
  const?: any
  format?: string

  title?: string
  default?: any

  properties?: {
    [key: string]: Schema
  }
  items?: Schema | Schema[] | SchemaRef
  uniqueItems?: any
  dependencies?: {
    [key: string]: string[] | Schema | SchemaRef
  }
  oneOf?: Schema[]
  anyOf?: Schema[]
  allOf?: Schema[]
  // TODO: uiSchema
  // vjsf?: VueJsonSchemaConfig
  required?: string[]
  enum?: any[]
  enumNames?: any[]
  enumKeyValue?: any[]
  additionalProperties?: any
  additionalItems?: Schema

  minLength?: number
  maxLength?: number
  minimum?: number
  maximum?: number
  multipleOf?: number
  exclusiveMaximum?: number
  exclusiveMinimum?: number
}

export const FieldPropsDefine = {
  schema: {
    type: Object as PropType<Schema>,
    required: true
  },
  rootSchema: {
    type: Object as PropType<Schema>,
    required: true
  },
  value: {
    required: true
  },
  onChange: {
    type: Function as PropType<(v: any) => void>,
    required: true
  },
  errorSchema: {
    type: Object as PropType<ErrorSchema>,
    required: true
  }
} as const

export const CommonWidgetPropsDefine = {
  value: {},
  onChange: {
    type: Function as PropType<(v: any) => void>,
    required: true,
  },
  schema: {
    type: Object as PropType<Schema>,
    required: true,
  },
  errors: {
    type: Object as PropType<string[]>,
  },
} as const

export const SelectionWidgetPropsDefine = {
  ...CommonWidgetPropsDefine,
  options: {
    type: Array as PropType<{ key: string; value: any }[]>,
    required: true,
  },
} as const

export type CommonFieldType = DefineComponent<typeof FieldPropsDefine>
export type CommonWidgetDefine = DefineComponent<typeof CommonWidgetPropsDefine>
export type SelectionWidgetDefine = DefineComponent<typeof SelectionWidgetPropsDefine>

export enum WidgetNames {
  SelectionWidget = 'SelectionWidget',
  TextWidget = 'TextWidget',
  NumberWidget = 'NumberWidget'
}

export type Theme = {
  widgets: {
    SelectionWidget: SelectionWidgetDefine
    TextWidget: CommonWidgetDefine
    NumberWidget: CommonWidgetDefine
  }
}