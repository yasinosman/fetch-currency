import axios from 'axios';

const URL = 'https://tcmb.gov.tr/kurlar/today.xml';

const fetchCurrencyData = () => axios.get(URL).then(res => res.data);

export default fetchCurrencyData;
