const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const webcPlugin = require('@11ty/eleventy-plugin-webc');

module.exports = function(config) {
	config.addPlugin(EleventyHtmlBasePlugin);
	config.addPlugin(webcPlugin, {
		components: 'src/_includes/**/*.webc'
	});

	config.setServerOptions({
		domDiff: false
	});
	
	if (process.env.ELEVENTY_RUN_MODE !== 'build') {
		config.addPassthroughCopy('src/styles');
		config.addPassthroughCopy('src/scripts');
	}

	config.addPassthroughCopy('src/admin/config.yml');
	config.addPassthroughCopy('src/images');
	config.addPassthroughCopy('src/fonts');
	config.addPassthroughCopy('src/uploads');

	const categoriesMap = new Map([
		['all', { name: 'All Works', color: ''}],
		['ui-ux-design', { name: 'UI/UX Design', color: 'accent-yellow'}],
		['logotype', { name: 'Logotype', color: 'accent-green'}],
		['animation-motion', { name: 'Animation/Motion', color: 'accent-blue'}],
		['social-media', { name: 'Social Media', color: 'accent-pink'}],
		['illustration', { name: 'Illustration', color: 'accent-purple'}],
	]);

	config.addJavaScriptFunction('isBuild', function() {
		return process.env.ELEVENTY_RUN_MODE === 'build';
	});

	config.addJavaScriptFunction('getCategories', function() {
		return Array.from(categoriesMap);
	});

	config.addJavaScriptFunction('getIntroFromContent', function(content) {
		return content.includes('<p>[DEMO]</p>') ? content.split('<p>[DEMO]</p>')[0] : '';
	});

	config.addJavaScriptFunction('getBodyFromContent', function(content) {
		return content.includes('<p>[DEMO]</p>') ? content.split('<p>[DEMO]</p>')[1] : content;
	});

	config.addJavaScriptFunction('getAccentClassByCategory', function(category) {
		if (!categoriesMap.has(category)) {
			return '';
		}

		return categoriesMap.get(category).color;
	});

	config.addJavaScriptFunction('getNameByCategory', function(category) {
		if (!categoriesMap.has(category)) {
			return '';
		}

		return categoriesMap.get(category).name;
	});

	config.addCollection("workSorted", function(collectionApi) {
    const works = collectionApi.getFilteredByTag('work');

		return [
			...works.filter(work => work.data.favorite),
			...works.filter(work => !work.data.favorite)
		];
  });

	return {
		dir: {
			input: 'src',
			data: '_data',
			includes: '_includes',
			layouts: '_layouts',
			output: 'build'
		}
	}
}