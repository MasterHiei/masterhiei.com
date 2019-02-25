import axios from 'axios';

let protocol = process.env.protocol;
let host = process.env.host;
let port = process.env.port;
let prefix = process.env.api_prefix;

export default axios.create({
  baseURL: `${protocol}://${host}:${port}${prefix}`,
  withCredentials: true,
});
