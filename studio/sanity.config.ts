import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? '';
const dataset = process.env.SANITY_STUDIO_DATASET ?? 'production';

export default defineConfig({
	name: 'default',
	title: 'G Boyz Wire Wheels',

	projectId,
	dataset,

	plugins: [
		structureTool({
			structure: (S) =>
				S.list()
					.title('Content')
					.items([
						S.listItem()
							.title('Business Info')
							.child(S.document().schemaType('businessInfo').documentId('businessInfo')),
						S.divider(),
						...S.documentTypeListItems().filter((item) => item.getId() !== 'businessInfo'),
					]),
		}),
		visionTool(),
	],

	schema: {
		types: schemaTypes,
	},
});
