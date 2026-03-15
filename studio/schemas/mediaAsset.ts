import { defineField, defineType } from 'sanity'

export const mediaAsset = defineType({
  name: 'mediaAsset',
  title: 'Image Pool',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Internal Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: 'alt_tr', title: 'Alt Text (TR)', type: 'string' }),
    defineField({ name: 'alt_en', title: 'Alt Text (EN)', type: 'string' }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', initialValue: 0 }),
    defineField({ name: 'showInStory', title: 'Show in "Our Story" section', type: 'boolean', initialValue: false }),
    defineField({ name: 'showInGallery', title: 'Show in Gallery', type: 'boolean', initialValue: false }),
    defineField({
      name: 'caption_tr',
      title: 'Gallery Caption (TR)',
      type: 'string',
      hidden: ({ document }) => !document?.showInGallery,
    }),
    defineField({
      name: 'caption_en',
      title: 'Gallery Caption (EN)',
      type: 'string',
      hidden: ({ document }) => !document?.showInGallery,
    }),
  ],
  preview: {
    select: { title: 'title', media: 'image', showInStory: 'showInStory', showInGallery: 'showInGallery' },
    prepare({ title, media, showInStory, showInGallery }) {
      const tags = [showInStory && 'Story', showInGallery && 'Gallery'].filter(Boolean).join(', ')
      return { title, subtitle: tags || 'Not shown anywhere', media }
    },
  },
})
