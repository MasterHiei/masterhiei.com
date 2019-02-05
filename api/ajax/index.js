import axios from 'axios'
import { config, CODE } from './config'

const request = axios.create(config)

// handling request
request.interceptors.request.use(config => {
  // TODO: Do something if need
  return config
})

// handling response
request.interceptors.response.use(
  res => {
    const data = res.data
    if (data.code === CODE.OK) {
      return data.data
    } else {
      return Promise.reject(data.code)
    }
  },
  err => {
    console.log(err)
    return Promise.reject(CODE.NOT_FOUND)
  }
)

// Axios request encapsulation
export default {
  get: (url, data = {}) => {
    const queryStr = createQueryString(url, data)
    return request.get(queryStr)
  },
  post: (url, data) => {
    return request.post(url, data)
  }
}

/**
 * Create GET query string
 * @param {String} url API URL
 * @param {Object} data Queries Object
 * @returns {String} Query String
 */
const createQueryString = (url, data) => {
  let queryStr = url
  let query = []
  Object.keys(data).forEach(key => {
    query.push(key + '=' + data[key])
  })
  if (query.length > 0) {
    queryStr += '?' + query.join('&')
  }
  return queryStr
}
