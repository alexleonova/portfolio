import CMS from 'decap-cms-app';

CMS.init();

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
		if (data.structuralLevel === data.visualLevel) {
			return `${'#'.repeat(data.structuralLevel)} ${data.content}`;
		} else {
			return `<h${data.structuralLevel} class="text-heading-${data.visualLevel}">${data.content}</h${data.structuralLevel}>`;
		}
	},
	toPreview: function(data) {
		if (data.structuralLevel === data.visualLevel) {
			return `${'#'.repeat(data.structuralLevel)} ${data.content}`;
		} else {
			return `<h${data.structuralLevel} class="text-heading-${data.visualLevel}">${data.content}</h${data.structuralLevel}>`;
		}
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
		return '<p>[DEMO]</p>';
	}
});
