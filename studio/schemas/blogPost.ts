import { defineField, defineType } from 'sanity'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title_en' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'title_en', title: 'Title (EN)', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'title_tr', title: 'Title (TR)', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'excerpt_en', title: 'Excerpt (EN)', type: 'text', rows: 3 }),
    defineField({ name: 'excerpt_tr', title: 'Excerpt (TR)', type: 'text', rows: 3 }),
    defineField({ name: 'content_en', title: 'Content (EN)', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'content_tr', title: 'Content (TR)', type: 'array', of: [{ type: 'block' }] }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      options: {
        list: [
          { title: 'Serap Ogut', value: 'Serap Ogut' },
          { title: 'Dogan Ogut', value: 'Dogan Ogut' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'date', title: 'Date', type: 'date', validation: (Rule) => Rule.required() }),
    defineField({ name: 'readTime', title: 'Read Time', type: 'string' }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'image', title: 'Cover Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false }),
  ],
  preview: {
    select: { title: 'title_en', subtitle: 'author', media: 'image' },
  },
})
