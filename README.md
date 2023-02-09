# titi-app

Publish and search for adventures that only take place in the next 24 hours.

## Changes

For any change, developers must change the version in the following files:

- [package.json](https://github.com/willymateo/titi-app/blob/main/package.json)
- [package-lock.json](https://github.com/willymateo/titi-app/blob/main/package-lock.json)
- [app.config.js](https://github.com/willymateo/titi-app/blob/main/app.config.js)

In addition, write the change in the [CHANGELOG.md](https://github.com/willymateo/titi-app/blob/main/CHANGELOG.md) file


## Environment variables

### Development
Each time when you start the development client all environment variables are evaluated, so you must have a `.env` file with the following content:

```cmd
# This env file only is valid in development environment
APP_ENV=development
APP_NAME=tĭti Dev
APP_PLAIN_NAME=titi Dev
IOS_BUNDL_ID=com.darkos.titi.dev
ANDROID_PKG=com.darkos.titi.dev
APP_API_URL=https://titi-development.up.railway.app/api

# Must be stored in EXPO secrets
MMKV_ID=
MMKV_KEY=
```
**Note**: Ask to an administrator for the value of previous variables.

### Production and Preview
In the build proccess the environment variables are set in the [eas.json](https://github.com/willymateo/titi-app/blob/main/eas.json) file. In addition, you must make sure that the secrets `MMKV_ID` and `MMKV_KEY` are configured in [Expo](https://expo.dev).

### EAS updates
When you publish an update, the content of the .env and [eas.json](https://github.com/willymateo/titi-app/blob/main/eas.json) files aren't evaluated, so you must do something like this:

```
MMKV_ID=*** MMKV_KEY=*** eas update
```

For more information about environment variables in expo, refer to [Expo Docs](https://docs.expo.dev/eas-update/environment-variables).
