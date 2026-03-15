import { defineField, defineType } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
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
    defineField({ name: 'description_en', title: 'Description (EN)', type: 'text', rows: 3 }),
    defineField({ name: 'description_tr', title: 'Description (TR)', type: 'text', rows: 3 }),
    defineField({ name: 'content_en', title: 'Content (EN)', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'content_tr', title: 'Content (TR)', type: 'array', of: [{ type: 'block' }] }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'AI & Automation', value: 'AI & Automation' },
          { title: 'Full-Stack Development', value: 'Full-Stack Development' },
          { title: 'Mobile Development', value: 'Mobile Development' },
          { title: 'Web Development', value: 'Web Development' },
        ],
      },
    }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false }),
    defineField({ name: 'date', title: 'Date', type: 'date' }),
    defineField({ name: 'githubUrl', title: 'GitHub URL', type: 'url' }),
    defineField({ name: 'liveUrl', title: 'Live URL', type: 'url' }),
  ],
  preview: {
    select: { title: 'title_en', media: 'image' },
  },
})
