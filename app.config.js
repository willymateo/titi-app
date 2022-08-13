import "dotenv/config";

export default () => {
  return {
    name: process.env.APP_NAME,
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
      bundleIdentifier: process.env.IOS_BUNDL_ID,
    },
    android: {
      package: process.env.ANDROID_PKG,
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#000000",
      },
    },
    extra: {
      APP_ENV: process.env.APP_ENV,
      CATHOT_API_URL: process.env.CATHOT_API_URL,
    },
  };
};
