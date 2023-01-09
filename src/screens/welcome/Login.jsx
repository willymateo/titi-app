import { EyeClose, EyeEmpty, KeyAltBack, PasswordError, User } from "iconoir-react-native";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { TextInputHF } from "../../components/hookForm/TextInputHF";
import { MMKV_USER_TOKEN, storage } from "../../config/app.config";
import { setUserSession } from "../../redux/states/userSession";
import { LoadingDialog } from "../../components/LoadingDialog";
import { Button, Text, TextInput } from "react-native-paper";
import { useErrorDialog } from "../../hooks/useErrorDialog";
import { ErrorDialog } from "../../components/ErrorDialog";
import { LoginFooter } from "../../components/LoginFooter";
import { useIsVisible } from "../../hooks/useIsVisible";
import { useLoading } from "../../hooks/useLoading";
import { sharedStyles } from "../../shared/styles";
import * as appAPI from "../../services/app/auth";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Constants from "expo-constants";

function Login({ navigation }) {
  const { isVisible: isPasswordVisible, toggle: togglePasswordVisible } = useIsVisible();
  const { loading, startLoading, stopLoading } = useLoading();
  const { error, showError, hideError } = useErrorDialog();
  const { control, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handlePressLogin = async data => {
    try {
      startLoading();
      const { token, error: requestError } = await appAPI.login(data);

      if (requestError) {
        showError({ error: requestError });
        stopLoading();
        return;
      }

      storage.set(MMKV_USER_TOKEN, token);
      dispatch(setUserSession({ token }));
      stopLoading();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={sharedStyles.flx}>
      <View style={{ ...styles.container }}>
        <Text style={styles.appTitle}>{Constants.manifest.extra.APP_NAME}</Text>

        <View>
          <TextInputHF
            left={<TextInput.Icon icon={props => <User {...props} {...sharedStyles.iconoirM} />} />}
            rules={{
              required: t("components.inputHookForm.usernameRequired"),
            }}
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
            rules={{
              required: t("components.inputHookForm.passwordRequired"),
            }}
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

        <Button mode="contained" uppercase={false} onPress={handleSubmit(handlePressLogin)}>
          {t("screens.welcome.login")}
        </Button>
        <LoginFooter
          onPressSignUp={() => navigation.navigate("SignUp")}
          onPressAccountRecovery={() => navigation.navigate("AccountRecovery")}
        />

        <LoadingDialog isVisible={loading} />
        <ErrorDialog isVisible={error} onDismiss={hideError} content={error} icon={PasswordError} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  appTitle: {
    fontFamily: "RedHatMono",
    textAlign: "center",
    fontSize: 60,
  },
});

export { Login };
