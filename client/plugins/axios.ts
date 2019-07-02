import { Context, ErrorParams } from '@nuxt/vue-app';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import * as NuxtAxios from '@nuxtjs/axios/node_modules/axios';
import axios from '@/api/axios/github';

/**
 * Hanlding axios exception
 * @param e Axios exception
 * @param error Nuxt error context
 */
const errorHandler = (
  e: AxiosError | NuxtAxios.AxiosError,
  error: (params: ErrorParams) => void
): void => {
  const statusCode = e.response ? e.response.status : 500;
  error({ statusCode: statusCode, message: e.message });
};

export default ({ $axios, error }: Context): void => {
  // Handling error for customized axios
  axios.interceptors.request.use(
    (config): AxiosRequestConfig => config,
    (e: AxiosError): void => {
      errorHandler(e, error);
    }
  );
  axios.interceptors.response.use(
    (res): AxiosResponse => res,
    (e: AxiosError): void => {
      errorHandler(e, error);
    }
  );

  // Handling error for Nuxt axios
  $axios.onError((e): void => {
    errorHandler(e, error);
  });
};
