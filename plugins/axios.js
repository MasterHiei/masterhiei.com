import axios from 'axios';

export default axios.create({
  baseURL: `${process.env.domain}${process.env.api_prefix}`,
  withCredentials: true,
});
