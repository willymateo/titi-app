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
import { useLoading } from "../../hooks/useLoading";
import { sharedStyles } from "../../shared/styles";
import * as appAPI from "../../services/app/auth";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Constants from "expo-constants";
import { useState } from "react";

function Login({ navigation }) {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
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
      style={sharedStyles.flx}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={{ ...styles.container }}>
        <Text style={styles.appTitle}>{Constants.manifest.extra.APP_NAME}</Text>
        <View>
          <TextInputHF
            style={sharedStyles.mv5}
            rules={{
              required: t("components.inputHookForm.usernameRequired"),
            }}
            label={t("components.inputHookForm.username")}
            control={control}
            controllerName="username"
            left={<TextInput.Icon icon={props => <User {...props} {...sharedStyles.iconoirM} />} />}
          />
          <TextInputHF
            style={sharedStyles.mv5}
            rules={{
              required: t("components.inputHookForm.passwordRequired"),
            }}
            secureTextEntry={isPasswordHidden}
            label={t("components.inputHookForm.password")}
            control={control}
            controllerName="password"
            left={
              <TextInput.Icon
                icon={props => <KeyAltBack {...props} {...sharedStyles.iconoirM} />}
              />
            }
            right={
              <TextInput.Icon
                icon={props => {
                  return isPasswordHidden ? (
                    <EyeClose {...props} {...sharedStyles.iconoirM} />
                  ) : (
                    <EyeEmpty {...props} {...sharedStyles.iconoirM} />
                  );
                }}
                onPress={() => setIsPasswordHidden(!isPasswordHidden)}
              />
            }
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
