import { parseStringPromise } from 'xml2js';

const parseXml = xmlText => {
	return parseStringPromise(xmlText, 'text/xml');
};

export default parseXml;
