import fetchCurrencyData from './api/fetchCurrencyData.js';
import parseXml from './utils/parseXml.js';
import {
	CURRENCIES_KEY,
	CURRENCY_CODE_KEY,
	DATE_KEY,
	ENTRY_KEY,
	ID_KEY
} from './utils/XML_KEYS.js';

const mapDocumentToCurrencyDetail = ({ xmlData, currencyCode, priceType }) => {
	const data = xmlData[ENTRY_KEY];

	const date = data[ID_KEY][DATE_KEY];

	const currencies = data[CURRENCIES_KEY];

	const currency = currencies.find(
		c => c[ID_KEY][CURRENCY_CODE_KEY] === currencyCode
	);

	return {
		date,
		currencyCode: currency[ID_KEY][CURRENCY_CODE_KEY],
		price: currency[priceType]
	};
};

const getCurrencyDetails = ({ currencyCode, priceType }) =>
	new Promise(async (resolve, reject) => {
		try {
			const currencyData = await fetchCurrencyData();

			const xmlData = await parseXml(currencyData);

			const result = mapDocumentToCurrencyDetail({
				xmlData,
				currencyCode,
				priceType
			});

			return resolve(result);
		} catch (error) {
			console.log(error);
			return reject(
				'Döviz bilgilerine erişilirken bir hata oluştu, lütfen tekrar deneyin.'
			);
		}
	});

export default getCurrencyDetails;
