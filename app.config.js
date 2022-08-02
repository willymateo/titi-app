import "dotenv/config";

export default ({ config }) => {
  const extra = {
    development: {
      CATHOT_API_URL: process.env.DEV_CATHOT_API_URL,
    },
    production: {
      CATHOT_API_URL: process.env.PROD_CATHOT_API_URL,
    },
  };

  return {
    ...config,
    extra: extra[process.env.APP_ENV],
  };
};
