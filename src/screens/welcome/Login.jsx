import { AtSign, EyeClose, EyeEmpty, KeyAltBack, PasswordError } from "iconoir-react-native";
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { TextInputHF } from "../../components/hookForm/TextInputHF";
import { MMKV_USER_TOKEN, storage } from "../../config/app.config";
import { setUserSession } from "../../redux/states/userSession";
import { LoadingDialog } from "../../components/LoadingDialog";
import { Button, Text, TextInput } from "react-native-paper";
import { useErrorDialog } from "../../hooks/useErrorDialog";
import { ErrorDialog } from "../../components/ErrorDialog";
import { useLoading } from "../../hooks/useLoading";
import { useVisible } from "../../hooks/useVisible";
import { sharedStyles } from "../../shared/styles";
import { login } from "../../services/app/auth";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Constants from "expo-constants";
import { Footer } from "./Footer";

function Login({ navigation }) {
  const { isVisible: isPasswordVisible, toggle: togglePasswordVisible } = useVisible();
  const { loading, startLoading, stopLoading } = useLoading();
  const { error, showError, hideError } = useErrorDialog();
  const { control, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handlePressLogin = async data => {
    startLoading();
    const { token, error: errorOnLogin } = await login(data);

    if (errorOnLogin) {
      showError({ error: errorOnLogin });
      stopLoading();
      return;
    }

    storage.set(MMKV_USER_TOKEN, token);
    dispatch(setUserSession({ token }));
    stopLoading();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={sharedStyles.flx}>
      <View style={[sharedStyles.flx, sharedStyles.flxJCCenter]}>
        <Text style={styles.appTitle}>{Constants.manifest.extra.APP_NAME}</Text>

        <View>
          <TextInputHF
            left={
              <TextInput.Icon icon={props => <AtSign {...props} {...sharedStyles.iconoirM} />} />
            }
            rules={{ required: t("components.inputHookForm.usernameRequired") }}
            label={t("components.inputHookForm.username")}
            controllerName="username"
            style={sharedStyles.mv5}
            control={control}
          />

          <TextInputHF
            left={
              <TextInput.Icon
                icon={props => <KeyAltBack {...props} {...sharedStyles.iconoirM} />}
              />
            }
            rules={{ required: t("components.inputHookForm.passwordRequired") }}
            right={
              <TextInput.Icon
                icon={props => {
                  return isPasswordVisible ? (
                    <EyeEmpty {...props} {...sharedStyles.iconoirM} />
                  ) : (
                    <EyeClose {...props} {...sharedStyles.iconoirM} />
                  );
                }}
                onPress={togglePasswordVisible}
              />
            }
            label={t("components.inputHookForm.password")}
            secureTextEntry={!isPasswordVisible}
            controllerName="password"
            style={sharedStyles.mv5}
            control={control}
          />
        </View>

        <Button
          onPress={() => {
            Keyboard.dismiss();
            handleSubmit(handlePressLogin)();
          }}
          style={sharedStyles.mv15}
          uppercase={false}
          mode="contained">
          {t("screens.welcome.login")}
        </Button>
        <Footer
          onPressAccountRecovery={() => navigation.navigate("AccountRecovery")}
          onPressSignUp={() => navigation.navigate("SignUp")}
        />

        <ErrorDialog isVisible={error} onDismiss={hideError} content={error} icon={PasswordError} />
        <LoadingDialog isVisible={loading} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  appTitle: {
    fontFamily: "RedHatMono",
    textAlign: "center",
    fontSize: 60,
  },
});

export { Login };
