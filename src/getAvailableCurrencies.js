import fetchCurrencyData from './api/fetchCurrencyData.js';
import parseXml from './utils/parseXml.js';
import {
	CURRENCIES_KEY,
	CURRENCY_CODE_KEY,
	ENTRY_KEY,
	ID_KEY
} from './utils/XML_KEYS.js';

const mapDocumentToCurrencies = xmlData => {
	const data = xmlData[ENTRY_KEY];

	const currencies = data[CURRENCIES_KEY];

	return currencies.map(currency => currency[ID_KEY][CURRENCY_CODE_KEY]);
};

const getAvailableCurrencies = () =>
	new Promise(async (resolve, reject) => {
		try {
			const currencyData = await fetchCurrencyData();

			const xmlDoc = await parseXml(currencyData);

			const result = mapDocumentToCurrencies(xmlDoc);

			return resolve(result);
		} catch (error) {
			return reject(
				'Kullanılabilir döviz türleri çekilirken bir hata oluştu. Lütfen tekrar deneyin'
			);
		}
	});

export default getAvailableCurrencies;
