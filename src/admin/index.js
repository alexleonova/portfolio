import CMS from 'decap-cms-app';
import markdownit from 'markdown-it'

CMS.init();

const md = markdownit({
  html: true,
  linkify: true,
  typographer: true
})

CMS.registerEditorComponent({
	id: "heading",
	label: "Custom heading",
	summary: "<h{{fields.structuralLevel}} class=\"text-heading-{{fields.visualLevel}}\">{{fields.content}}</h{{fields.structuralLevel}}>",
	fields: [
		{
			label: 'Content',
			name: 'content',
			widget: 'string',
			default: "Custom heading"
		},
		{
			label: 'Structural level',
			name: 'structuralLevel',
			widget: 'select',
			options: [
				{ label: "H1", value: "1" },
				{ label: "H2", value: "2" },
				{ label: "H3", value: "3" },
				{ label: "H4", value: "4" },
				{ label: "H5", value: "5" },
				{ label: "H6", value: "6" }
			]
		},
		{
			label: 'Visual level',
			name: 'visualLevel',
			widget: 'select',
			options: [
				{ label: "H1", value: "1" },
				{ label: "H2", value: "2" },
				{ label: "H3", value: "3" },
				{ label: "H4", value: "4" },
				{ label: "H5", value: "5" },
				{ label: "H6", value: "6" }
			]
		}
	],
	pattern: /^<h([1-6]?)\sclass="text-heading-([1-6]?)">(.*?)<\/h([1-6]?)>$/m,
	fromBlock: function(match) {
		return {
			structuralLevel: match[1] || '2',
			visualLevel: match[2] || '',
			content: match[3] || ''
		};
	},
	toBlock: function(data) {
		return `<h${data.structuralLevel} class="text-heading-${data.visualLevel}">${data.content}</h${data.structuralLevel}>`;
	},
	toPreview: function(data) {
		return `<h${data.structuralLevel} class="text-heading-${data.visualLevel}">${data.content}</h${data.structuralLevel}>`;
	}
});

CMS.registerEditorComponent({
	id: "accent",
	label: "Accent color block",
	summary: "<div class=\"accent-{{fields.accent}}\">...</div>",
	fields: [
		{
			label: 'Accent color',
			name: 'accent',
			widget: 'select',
			options: [
				{ label: "Yellow", value: "yellow" },
				{ label: "Green", value: "green" },
				{ label: "Blue", value: "blue" },
				{ label: "Pink", value: "pink" },
				{ label: "Purple", value: "purple" }
			]
		},
		{
			label: 'Content',
			name: 'content',
			widget: 'markdown'
		}
	],
	pattern: /^<div\sclass="accent-(.*?)">\n(.*?)\n<\/div>$/ms,
	fromBlock: function(match) {
		return {
			accent: match[1],
			content: match[2],
		};
	},
	toBlock: function(data) {
		return `<div class="accent-${data.accent}">
${data.content}
</div>`;
	},
	toPreview: function(data) {
		return `<div class="accent-${data.accent}">
${md.render(data.content)}
</div>`;
	}
});

CMS.registerEditorComponent({
	id: "separator",
	label: "Demo block separator",
	pattern: /^<p\s>\[DEMO\]<\/p>$/ms,
	toBlock: function() {
		return '<p>[DEMO]</p>';
	},
	toPreview: function() {
		return '<p>[DEMO]<p>';
	}
});