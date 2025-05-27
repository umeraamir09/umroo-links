import {defineField, defineType} from 'sanity'

export const buttonType = defineType({
  name: 'buttons',
  title: 'Buttons',
  type: 'document',
  fields: [
        defineField({
        title: 'Slug',
        name: 'slug',
        type: 'slug',
        options: {
            source: 'label',
            maxLength: 200,
            slugify: input => input
                                .toLowerCase()
                                .replace(/\s+/g, '-')
                                .slice(0, 200)
        }
        }),
        defineField({
    title: 'Label',
    name: 'label',
    type: 'string',
    description: 'The label of the button',
    validation: Rule => Rule.max(120).warning(`A label shouldn't be more than 120 characters.`).required()
    }),
    
        defineField({
    title: 'Button Description',
    name: 'description',
    type: 'string',
    description: 'The description of the button it is (if any)',
    validation: Rule => Rule.max(120).warning(`The type shouldn't be more than 120 characters.`)
    }),

        defineField({
    title: 'Button Type',
    name: 'type',
    type: 'string',
    description: 'The type of button it is (if any)',
    validation: Rule => Rule.max(120).warning(`The type shouldn't be more than 120 characters.`)
    }),

        defineField({
    title: 'Redirect Link',
    name: 'href',
    type: 'url',
    description: 'The link that the button will redirect to',
    validation: Rule => Rule.uri({
        scheme: ['http', 'https', 'mailto', 'tel']
    }).required()
    }),

        defineField({
    title: 'Image Link',
    name: 'imgurl',
    type: 'url',
    description: 'The link that the button will redirect to',
    validation: Rule => Rule.uri({
        scheme: ['http', 'https']
    })
    }),
        defineField({
    title: 'Is the button locked?',
    name: 'locked',
    type: 'boolean',
    }),
        defineField({
    title: 'Spotify Track Id',
    name: 'spotifyTrackId',
    type: 'string',
    description: 'The spotify track\'s id (if any)',
    validation: Rule => Rule.max(22).warning(`The type shouldn't be more than 22 characters.`)
    }),
        defineField({
    title: 'Community Title',
    name: 'communityTitle',
    type: 'string',
    description: 'The spotify track\'s id (if any)',
    validation: Rule => Rule.max(120).warning(`The ct shouldn't be more than 120 characters.`)
    }),
        defineField({
    title: 'Order',
    name: 'order',
    type: 'number',
    description: 'The order number',
    validation: Rule => Rule.max(120).warning(`The on shouldn't be more than 120 characters.`).required()
    }),
  ],
})