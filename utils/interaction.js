import alert from 'cli-alerts';
import inquirer from 'inquirer';
import getAvailableCurrencies from '../src/getAvailableCurrencies.js';
import { FOREX_BUYING_KEY, FOREX_SELLING_KEY } from '../src/utils/XML_KEYS.js';

const interaction = () => {
	return inquirer.prompt([
		{
			type: 'input',
			name: 'currency',
			message: 'Döviz cinsi nedir?',
			async filter(input) {
				try {
					const availableCurrencies = await getAvailableCurrencies();

					if (
						availableCurrencies
							.map(c => c.toUpperCase())
							.includes(input.toUpperCase())
					) {
						return input.toUpperCase();
					}

					throw new Error(
						`${input} is not a valid/supported currency. Please try again`
					);
				} catch (error) {
					alert({
						type: 'error',
						msg: error
					});
					process.exit(1);
				}
			}
		},
		{
			type: 'list',
			choices: [
				{
					name: 'Döviz Alış',
					value: FOREX_BUYING_KEY
				},
				{
					name: 'Döviz Satış',
					value: FOREX_SELLING_KEY
				}
			],
			name: 'priceType',
			message: 'Hangi fiyatı sorgulamak istiyorsunuz?',
			default: 'buying'
		}
	]);
};

export default interaction;
