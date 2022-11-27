import mainBottomTabsNavigator from "./components/mainBottomTabsNavigator.json";
import settingsStackNavigator from "./components/settingsStackNavigator.json";
import welcomeStackNavigator from "./components/welcomeStackNavigator.json";
import languageSettings from "./screens/languageSettings.json";
import adventuresCard from "./components/adventuresCard.json";
import accountRecovery from "./screens/accountRecovery.json";
import inputHookForm from "./components/inputHookForm.json";
import loadingDialog from "./components/loadingDialog.json";
import logoutButton from "./components/logoutButton.json";
import themeSettings from "./screens/themeSettings.json";
import loginFooter from "./components/loginFooter.json";
import settings from "./screens/settings.json";
import welcome from "./screens/welcome.json";
import signUp from "./screens/signUp.json";

const translationEn = {
  components: {
    loginFooter,
    logoutButton,
    loadingDialog,
    inputHookForm,
    adventuresCard,
    welcomeStackNavigator,
    settingsStackNavigator,
    mainBottomTabsNavigator,
  },
  screens: { welcome, signUp, accountRecovery, settings, languageSettings, themeSettings },
};

export { translationEn };
