const path = require('node:path');
const { EleventyHtmlBasePlugin } = require('@11ty/eleventy');
const eleventyWebcPlugin = require('@11ty/eleventy-plugin-webc');
const Image = require('@11ty/eleventy-img');

module.exports = function(config) {
	config.addPlugin(EleventyHtmlBasePlugin);
	config.addPlugin(eleventyWebcPlugin, {
		components: [
			'src/_includes/**/*.webc'
		]
	});

	config.setServerOptions({
		domDiff: false
	});
	
	if (process.env.ELEVENTY_RUN_MODE !== 'build') {
		config.addPassthroughCopy('src/styles');
		config.addPassthroughCopy('src/scripts');
	}

	config.addPassthroughCopy('src/auth/index.html');
	config.addPassthroughCopy('src/admin/config.yml');
	config.addPassthroughCopy('src/images');
	config.addPassthroughCopy('src/assets');
	config.addPassthroughCopy('src/fonts');
	config.addPassthroughCopy('src/uploads');
	// config.addPassthroughCopy('src/robots.txt');
	config.addPassthroughCopy('src/favicon.ico');
	config.addPassthroughCopy('src/icon.svg');
	config.addPassthroughCopy('src/icon-192.png');
	config.addPassthroughCopy('src/icon-512.png');
	config.addPassthroughCopy('src/apple-touch-icon.png');
	config.addPassthroughCopy('src/manifest.webmanifest');

	const categoriesMap = new Map([
		['all', { name: 'All Works', color: ''}],
		['ui_ux_design', { name: 'UI/UX Design', color: 'accent-yellow'}],
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

	config.addJavaScriptFunction('picture', async function(src, widths = ['auto'], sizes = '', alt = '') {
		const metadata = await Image(src, {
			widths: widths,
			formats: ['webp', 'auto'],
			urlPath: '/images/',
			outputDir: './build/images/',
			filenameFormat: (id, src, width, format) => {
				const { name } = path.parse(src);

				return `${name}-${width}w.${format}`;
			},
			sharpAvifOptions: {
				quality: 100
			},
			sharpWebpOptions: {
				quality: 100
			},
			sharpPngOptions: {
				quality: 100
			},
			sharpJpegOptions: {
				quality: 100
			}
		});

		return Image.generateHTML(metadata, { class: 'preview__media', sizes, alt});
	});

	config.addJavaScriptFunction('getWorksBySlugs', function(works, slugs) {
		if (!slugs || !works) return [];

		return works.filter(work => slugs.includes(work.fileSlug));
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