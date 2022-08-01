import "dotenv/config";

export default ({ config }) => {
  const extras = {
    development: {
      domainCathotAPI: process.env.DEV_CATHOT_API_URL,
    },
    production: {
      domainCathotAPI: process.env.PROD_CATHOT_API_URL,
    },
  };

  return {
    ...config,
    extras: {
      ...extras[process.env.NODE_ENV],
    },
  };
};
