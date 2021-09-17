import axios from 'axios';
import axiosRetry from 'axios-retry';
axiosRetry(axios, { retries: 3 });

const baseUri =
  'https://api.openweathermap.org/data/2.5/onecall?&units=metric&exclude=minutely&appid=7499aafde0717d9c46e37994ab8b4056';

const headers = () => ({
  json: {
    headers: {
      'Content-Type': 'application/json',
    },
  },
});

const api = {
  baseUri,
  get: async (endpoint: string, params: any = null) => {
    const url = new URL(baseUri + endpoint);
    if (params) {
      Object.keys(params).forEach(key => {
        url.searchParams.append(key, params[key]);
      });
    }
    return axios.get(url.href.slice(0, -1), headers().json);
  },
};

export default api;
