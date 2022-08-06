const translatePriceType = priceType => {
	return {
		ForexBuying: 'Döviz Alış',
		ForexSelling: 'Döviz Alış'
	}[priceType];
};

export default translatePriceType;
