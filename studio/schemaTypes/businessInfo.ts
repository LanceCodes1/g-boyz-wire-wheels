import { defineField, defineType } from 'sanity';

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;

export default defineType({
	name: 'businessInfo',
	title: 'Business Info',
	type: 'document',
	// Singleton: only one document of this type should exist (enforced in sanity.config.ts structure + desk deskStructure).
	fields: [
		defineField({
			name: 'hours',
			title: 'Hours',
			type: 'array',
			of: [
				{
					type: 'object',
					name: 'dayHours',
					fields: [
						defineField({
							name: 'day',
							title: 'Day',
							type: 'string',
							options: { list: DAYS.map((d) => ({ title: d[0].toUpperCase() + d.slice(1), value: d })) },
							validation: (Rule) => Rule.required(),
						}),
						defineField({ name: 'open', title: 'Open (e.g. 9:00 AM)', type: 'string' }),
						defineField({ name: 'close', title: 'Close (e.g. 6:00 PM)', type: 'string' }),
						defineField({ name: 'closed', title: 'Closed all day', type: 'boolean', initialValue: false }),
					],
					preview: {
						select: { day: 'day', open: 'open', close: 'close', closed: 'closed' },
						prepare({ day, open, close, closed }) {
							return { title: day, subtitle: closed ? 'Closed' : `${open ?? '?'} – ${close ?? '?'}` };
						},
					},
				},
			],
		}),
		defineField({
			name: 'contact',
			title: 'Contact',
			type: 'object',
			fields: [
				defineField({ name: 'phone', title: 'Phone', type: 'string' }),
				defineField({ name: 'email', title: 'Email', type: 'string' }),
				defineField({ name: 'address', title: 'Address', type: 'text' }),
			],
		}),
		defineField({
			name: 'socialHandles',
			title: 'Social Handles',
			type: 'array',
			of: [
				{
					type: 'object',
					name: 'socialHandle',
					fields: [
						defineField({
							name: 'platform',
							title: 'Platform',
							type: 'string',
							options: {
								list: ['Instagram', 'Facebook', 'TikTok', 'YouTube', 'X'].map((p) => ({ title: p, value: p.toLowerCase() })),
							},
							validation: (Rule) => Rule.required(),
						}),
						defineField({ name: 'handle', title: 'Handle', type: 'string' }),
						defineField({ name: 'url', title: 'URL', type: 'url' }),
					],
					preview: {
						select: { title: 'platform', subtitle: 'handle' },
					},
				},
			],
		}),
	],
	preview: {
		prepare() {
			return { title: 'Business Info' };
		},
	},
});
