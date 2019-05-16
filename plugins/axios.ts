import { Context } from '@nuxt/vue-app';

export default ({ $axios, error }: Context): void => {
  $axios.onError(
    (e): void => {
      const statusCode = e.response ? e.response.status : 500;
      error({ statusCode: statusCode, message: e.message });
    }
  );
};
