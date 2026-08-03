import { defineField, defineType } from 'sanity';

export default defineType({
	name: 'wheel',
	title: 'Wheel',
	type: 'document',
	fields: [
		defineField({
			name: 'style',
			title: 'Style Name',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'name',
			title: 'Display Name',
			type: 'object',
			fields: [
				defineField({ name: 'en', title: 'English', type: 'string', validation: (Rule) => Rule.required() }),
				defineField({ name: 'es', title: 'Español', type: 'string' }),
			],
		}),
		defineField({
			name: 'description',
			title: 'Description',
			type: 'object',
			fields: [
				defineField({ name: 'en', title: 'English', type: 'text' }),
				defineField({ name: 'es', title: 'Español', type: 'text' }),
			],
		}),
		defineField({
			name: 'availableFinishes',
			title: 'Available Finishes',
			type: 'array',
			of: [{ type: 'string' }],
			options: {
				layout: 'tags',
			},
		}),
		defineField({
			name: 'spokeCount',
			title: 'Spoke Count',
			type: 'number',
			validation: (Rule) => Rule.integer().positive(),
		}),
		defineField({
			name: 'quoteOnly',
			title: 'Quote Only',
			description: 'If enabled, hides price range and shows a "request a quote" call to action.',
			type: 'boolean',
			initialValue: false,
		}),
		defineField({
			name: 'priceRange',
			title: 'Price Range',
			type: 'object',
			hidden: ({ document }) => Boolean(document?.quoteOnly),
			fields: [
				defineField({ name: 'min', title: 'Min ($)', type: 'number' }),
				defineField({ name: 'max', title: 'Max ($)', type: 'number' }),
			],
		}),
		defineField({
			name: 'images',
			title: 'Images',
			type: 'array',
			of: [{ type: 'image', options: { hotspot: true } }],
			validation: (Rule) => Rule.min(1),
		}),
	],
	preview: {
		select: {
			title: 'name.en',
			subtitle: 'style',
			media: 'images.0',
		},
	},
});
