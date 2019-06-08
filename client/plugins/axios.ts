import axios from '@/api/axios/github';
import { Context } from '@nuxt/vue-app';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export default ({ $axios, error }: Context): void => {
  // GitHub axios
  axios.interceptors.request.use(
    (config): AxiosRequestConfig => config,
    (e: AxiosError): void => {
      const statusCode = e.response ? e.response.status : 500;
      error({ statusCode: statusCode, message: e.message });
    }
  );
  axios.interceptors.response.use(
    (res): AxiosResponse => res,
    (e: AxiosError): void => {
      const statusCode = e.response ? e.response.status : 500;
      error({ statusCode: statusCode, message: e.message });
    }
  );

  // Nuxt axios
  $axios.onError((e): void => {
    const statusCode = e.response ? e.response.status : 500;
    error({ statusCode: statusCode, message: e.message });
  });
};
