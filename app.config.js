import "dotenv/config";

export default () => {
  return {
    name: process.env.APP_PLAIN_NAME,
    description: "Publish and search for adventures that only take place in the next 24 hours",
    slug: "titi",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    assetBundlePatterns: ["**/*"],
    platforms: ["android", "ios"],
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
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
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#000000",
      },
    },
    extra: {
      APP_ENV: process.env.APP_ENV,
      APP_NAME: process.env.APP_NAME,
      APP_API_URL: process.env.APP_API_URL,
      MMKV_ID: process.env.MMKV_ID,
      MMKV_KEY: process.env.MMKV_KEY,
      eas: {
        projectId: "7cec6355-87e3-495b-a022-7322790645ce",
      },
    },
  };
};
