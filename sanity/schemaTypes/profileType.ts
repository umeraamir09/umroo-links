import {defineField, defineType} from 'sanity'

export const profileType = defineType({
  name: 'profile',
  title: 'Profile',
  type: 'document',
  fields: [
        defineField({
        title: 'Slug',
        name: 'slug',
        type: 'slug',
        options: {
            source: 'fullname',
            maxLength: 200,
            slugify: input => input
                                .toLowerCase()
                                .replace(/\s+/g, '-')
                                .slice(0, 200)
        }
        }),

        defineField({
    title: 'Full Name',
    name: 'fullname',
    type: 'string',
    description: 'Make it catchy',
    validation: Rule => Rule.max(120).warning(`A title shouldn't be more than 120 characters.`).required()
    }),

        defineField({
    title: 'Profile Pic Url',
    name: 'profilepicurl',
    type: 'url',
    description: 'The Profile Pic Url For The Link Tree',
        validation: Rule => Rule.uri({
        scheme: ['http', 'https']
    }).required()
    }),

        defineField({
    title: 'Contact Name',
    name: 'contactname',
    type: 'string',
    description: 'The contact name',
    validation: Rule => Rule.max(120).warning(`A contact name shouldn't be more than 120 characters.`).required()
    }),

        defineField({
    title: 'Contact Number',
    name: 'contactnumber',
    type: 'string',
    description: 'The contact number',
    validation: Rule => Rule.max(50).warning(`A contact number shouldn't be more than 50 characters.`).required()
    }),

          defineField({
    title: 'Contact Email',
    name: 'contactEmail',
    type: 'string',
    description: 'The contact Email',
    validation: Rule => Rule.max(50).warning(`A contact Email shouldn't be more than 50 characters.`).required()
    }),
  ],
})