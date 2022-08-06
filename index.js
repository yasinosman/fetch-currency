#!/usr/bin/env node

/**
 * fetch-currency
 * Türkiye Cumhuriyet Merkez Bankası günlük döviz verilerine erişmek için bu CLI toolunu kullanabilirsiniz.
 *
 * @author Yasin Osman <https://github.com/yasinosman>
 */
import Listr from 'listr';

import init from './utils/init.js';
import cli from './utils/cli.js';
import log from './utils/log.js';
import interaction from './utils/interaction.js';
import getCurrencyDetails from './src/getCurrencyDetails.js';
import translatePriceType from './src/utils/translatePriceType.js';
import cliAlerts from 'cli-alerts';

const {
	input,
	flags: { clear, debug }
} = cli;

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);

	debug && log(flags);

	const answers = await interaction();

	const { currency, priceType } = answers;

	// Run tasks
	const tasks = new Listr([
		{
			title: `${currency} verilerine erişiliyor`,
			task: async ctx => {
				const { date, currencyCode, price } = await getCurrencyDetails({
					currencyCode: currency,
					priceType
				});

				const result = `${date} tarihli ${currencyCode} ${translatePriceType(
					priceType
				)} değeri: ${price} TRY`;

				ctx.result = result;
			}
		}
	]);

	const { result } = await tasks.run();

	cliAlerts({ type: 'success', msg: result, name: 'OK' });
})();
