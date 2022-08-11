import "dotenv/config";

export default () => {
  const environment = {
    development: {
      name: "CatHot dev",
      ios: {
        bundleIdentifier: "com.darkosoft.cathot.dev",
      },
      android: {
        package: "com.darkosoft.cathot",
      },
      extra: {
        CATHOT_API_URL: process.env.DEV_CATHOT_API_URL,
      },
    },
    preview: {
      name: "CatHot prev",
      ios: {
        bundleIdentifier: "com.darkosoft.cathot.prev",
      },
      android: {
        package: "com.darkosoft.cathot",
      },
      extra: {
        CATHOT_API_URL: process.env.DEV_CATHOT_API_URL,
      },
    },
    production: {
      name: "CatHot",
      ios: {
        bundleIdentifier: "com.darkosoft.cathot",
      },
      android: {
        package: "com.darkosoft.cathot",
      },
      extra: {
        CATHOT_API_URL: process.env.PROD_CATHOT_API_URL,
      },
    },
  };

  return {
    name: environment[process.env.APP_ENV].name,
    description: "Publish and search for adventures that only take place in the next 24 hours",
    slug: "cathot",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    assetBundlePatterns: ["**/*"],
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#000000",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    ios: {
      supportsTablet: true,
      ...environment[process.env.APP_ENV].ios,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#000000",
      },
      ...environment[process.env.APP_ENV].android,
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      APP_ENV: process.env.APP_ENV,
      ...environment[process.env.APP_ENV].extra,
    },
  };
};
