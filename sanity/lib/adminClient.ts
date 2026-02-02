import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

const token = process.env.SANITY_API_WRITE_TOKEN

if (!token) {
  throw new Error('Missing SANITY_API_WRITE_TOKEN')
}

export const adminClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
})
