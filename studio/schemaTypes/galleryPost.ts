import { defineField, defineType } from 'sanity';

export default defineType({
	name: 'galleryPost',
	title: 'Gallery Post',
	type: 'document',
	fields: [
		defineField({
			name: 'photos',
			title: 'Photo(s)',
			type: 'array',
			of: [{ type: 'image', options: { hotspot: true } }],
			validation: (Rule) => Rule.min(1).required(),
		}),
		defineField({
			name: 'vehicleYear',
			title: 'Vehicle Year',
			type: 'number',
			validation: (Rule) => Rule.integer().min(1900).max(2100),
		}),
		defineField({
			name: 'vehicleMake',
			title: 'Vehicle Make',
			type: 'string',
		}),
		defineField({
			name: 'vehicleModel',
			title: 'Vehicle Model',
			type: 'string',
		}),
		defineField({
			name: 'wheel',
			title: 'Wheel Style',
			type: 'reference',
			to: [{ type: 'wheel' }],
		}),
		defineField({
			name: 'finish',
			title: 'Finish',
			type: 'string',
			description: 'Finish shown in this specific photo (may differ from the wheel\'s default finish list).',
		}),
		defineField({
			name: 'submittedBy',
			title: 'Submitted By',
			type: 'object',
			fields: [
				defineField({
					name: 'type',
					title: 'Type',
					type: 'string',
					options: {
						list: [
							{ title: 'Shop', value: 'shop' },
							{ title: 'Customer', value: 'customer' },
						],
						layout: 'radio',
					},
					validation: (Rule) => Rule.required(),
				}),
				defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
				defineField({ name: 'contact', title: 'Contact (email or phone)', type: 'string' }),
			],
		}),
		defineField({
			name: 'status',
			title: 'Status',
			type: 'string',
			options: {
				list: [
					{ title: 'Pending', value: 'pending' },
					{ title: 'Approved', value: 'approved' },
				],
				layout: 'radio',
			},
			initialValue: 'pending',
			validation: (Rule) => Rule.required(),
		}),
	],
	preview: {
		select: {
			media: 'photos.0',
			make: 'vehicleMake',
			model: 'vehicleModel',
			status: 'status',
		},
		prepare({ media, make, model, status }) {
			return {
				title: [make, model].filter(Boolean).join(' ') || 'Untitled vehicle',
				subtitle: status,
				media,
			};
		},
	},
});
