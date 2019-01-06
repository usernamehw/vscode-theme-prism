const JSON5 = require('json5');
const fs = require('fs');

fs.readFile('themes/Prism-color-theme.json', 'utf8', (err, content) => {
	const parsed = JSON5.parse(content);
	fs.writeFile('themes/Prism-color-theme-minimized.json', JSON.stringify(parsed), 'utf8', () => {
		console.log('✔  DONE');
	});
});