import mainBottomTabsNavigator from "./components/mainBottomTabsNavigator.json";
import settingsStackNavigator from "./components/settingsStackNavigator.json";
import welcomeStackNavigator from "./components/welcomeStackNavigator.json";
import accountRecovery from "./screens/accountRecovery.json";
import inputHookForm from "./components/inputHookForm.json";
import loginFooter from "./components/loginFooter.json";
import welcome from "./screens/welcome.json";
import signUp from "./screens/signUp.json";

const translationEs = {
  components: {
    loginFooter,
    inputHookForm,
    welcomeStackNavigator,
    settingsStackNavigator,
    mainBottomTabsNavigator,
  },
  screens: { welcome, signUp, accountRecovery },
};

export { translationEs };
