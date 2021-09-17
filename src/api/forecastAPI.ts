import api from '../config/axios/axios.api.config';

const readForecastAPI = (latitude: string, longitude: string) =>
  api.get(`&lat=${latitude}&lon=${longitude}`);

export default readForecastAPI;
