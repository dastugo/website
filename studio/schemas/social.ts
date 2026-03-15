import { defineField, defineType } from 'sanity'

export const social = defineType({
  name: 'social',
  title: 'Social Links',
  type: 'document',
  fields: [
    defineField({ name: 'email', title: 'Contact Email', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'githubUrl', title: 'GitHub URL (company)', type: 'url' }),
    defineField({ name: 'linkedinUrl', title: 'LinkedIn URL (company)', type: 'url' }),
  ],
})
