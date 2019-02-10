import http from 'http';
import https from 'https';

// response code
const CODE = {
  OK: 0,
  NOT_FOUND: 404,
};

// axios request config
const config = {
  baseURL: 'http://127.0.0.1:3001/api/v1',
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  timeout: 30000,
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),
};

export { CODE, config };
