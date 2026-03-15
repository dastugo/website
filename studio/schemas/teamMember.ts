import { defineField, defineType } from 'sanity'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'role_en', title: 'Role (EN)', type: 'string' }),
    defineField({ name: 'role_tr', title: 'Role (TR)', type: 'string' }),
    defineField({ name: 'bio_en', title: 'Bio (EN)', type: 'text', rows: 4 }),
    defineField({ name: 'bio_tr', title: 'Bio (TR)', type: 'text', rows: 4 }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'education', title: 'Education', type: 'string' }),
    defineField({ name: 'image', title: 'Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'websiteUrl', title: 'Personal Website URL', type: 'url' }),
    defineField({ name: 'linkedinUrl', title: 'LinkedIn URL', type: 'url' }),
    defineField({ name: 'githubUrl', title: 'GitHub URL', type: 'url' }),
    defineField({ name: 'order', title: 'Order', type: 'number' }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role_en', media: 'image' },
  },
})
