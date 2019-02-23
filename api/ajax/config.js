import http from 'http';
import https from 'https';

// response code
const CODE = {
  OK: 0,
  NOT_FOUND: 404,
};

// axios request config
const config = {
  baseURL: process.env.baseUrl + process.env.apiUrl,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  timeout: 30000,
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),
};

export { CODE, config };
