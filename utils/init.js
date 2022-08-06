import welcome from 'cli-welcome';
import { readFile } from 'fs/promises';
import unhandled from 'cli-handle-unhandled';

const packageData = JSON.parse(
	await readFile(new URL('./../package.json', import.meta.url))
);

const { description, version } = packageData;

export default ({ clear = true }) => {
	unhandled();
	welcome({
		title: `fetch-currency`,
		tagLine: `by Yasin Osman`,
		description: description,
		version: version,
		bgColor: '#36BB09',
		color: '#000000',
		bold: true,
		clear
	});
};
