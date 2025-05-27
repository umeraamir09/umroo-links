import { type SchemaTypeDefinition } from 'sanity'
import { profileType } from './profileType'
import { buttonType } from './buttonType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [profileType, buttonType],
}
