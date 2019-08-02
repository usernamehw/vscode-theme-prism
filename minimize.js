const JSON5 = require('json5');
const fs = require('fs');

fs.readFile('themes/Prism-color-theme.json', 'utf8', (err, content) => {
	const parsed = JSON5.parse(content);
	fs.writeFile('themes/Prism-color-theme-minimized.json', JSON.stringify(parsed), 'utf8', () => {
		console.log('✔  DONE');
	});
	const noBoldTokenColors = [];
	for (const item of parsed.tokenColors) {
		if (!item.settings) continue;
		if (item.settings.fontStyle === 'bold') {
			const scope = item.scope;
			const settings = {};
			if (item.settings) {
				settings.foreground = item.settings.foreground;
			}
			noBoldTokenColors.push({
				scope,
				settings,
			});
		} else {
			noBoldTokenColors.push(item);
		}
	}
	noBoldTokenColors.push({
		"scope": "markup.bold",
		"settings": {
			"fontStyle": "bold"
		}
	});
	const noBold = {
		...parsed,
		tokenColors: noBoldTokenColors,
	}
	fs.writeFile('themes/Prism-color-theme-no-bold-minimized.json', JSON.stringify(noBold), 'utf8', () => {
		console.log('✔  NO BOLD DONE');
	});
});
