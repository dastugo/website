import { defineField, defineType } from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({ name: 'title_en', title: 'Title (EN)', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'title_tr', title: 'Title (TR)', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'description_en', title: 'Description (EN)', type: 'text', rows: 3 }),
    defineField({ name: 'description_tr', title: 'Description (TR)', type: 'text', rows: 3 }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Lucide icon name (e.g. Brain, Zap, Code2, Smartphone, Globe, MessageSquare, Bot, BarChart3)',
      options: {
        list: [
          { title: 'Brain', value: 'Brain' },
          { title: 'Zap', value: 'Zap' },
          { title: 'Code2', value: 'Code2' },
          { title: 'Smartphone', value: 'Smartphone' },
          { title: 'Globe', value: 'Globe' },
          { title: 'MessageSquare', value: 'MessageSquare' },
          { title: 'Bot', value: 'Bot' },
          { title: 'BarChart3', value: 'BarChart3' },
        ],
      },
    }),
    defineField({ name: 'order', title: 'Order', type: 'number' }),
  ],
  preview: {
    select: { title: 'title_en', subtitle: 'icon' },
  },
})
