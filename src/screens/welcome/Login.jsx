import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { EyeClose, EyeEmpty, KeyAltBack, User } from "iconoir-react-native";
import { TextInputHF } from "../../components/hookForm/TextInputHF";
import { MMKV_USER_TOKEN, storage } from "../../config/app.config";
import { setUserSession } from "../../redux/states/userSession";
import { LoadingDialog } from "../../components/LoadingDialog";
import { Button, Text, TextInput } from "react-native-paper";
import { useErrorDialog } from "../../hooks/useErrorDialog";
import { ErrorDialog } from "../../components/ErrorDialog";
import { LoginFooter } from "../../components/LoginFooter";
import { useLoading } from "../../hooks/useLoading";
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
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={{ ...styles.container }}>
        <Text style={styles.appTitle}>{Constants.manifest.extra.APP_NAME}</Text>
        <View>
          <TextInputHF
            style={styles.inputText}
            rules={{
              required: t("components.inputHookForm.usernameRequired"),
            }}
            label={t("components.inputHookForm.username")}
            control={control}
            controllerName="username"
            left={<TextInput.Icon name={props => <User {...props} {...styles.iconoir} />} />}
          />
          <TextInputHF
            style={styles.inputText}
            rules={{
              required: t("components.inputHookForm.passwordRequired"),
            }}
            secureTextEntry={isPasswordHidden}
            label={t("components.inputHookForm.password")}
            control={control}
            controllerName="password"
            left={<TextInput.Icon name={props => <KeyAltBack {...props} {...styles.iconoir} />} />}
            right={
              <TextInput.Icon
                name={props => {
                  return isPasswordHidden ? (
                    <EyeClose {...props} {...styles.iconoir} />
                  ) : (
                    <EyeEmpty {...props} {...styles.iconoir} />
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
        <ErrorDialog isVisible={error} onDismiss={hideError} content={error} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  inputText: {
    marginVertical: 5,
  },
  appTitle: {
    fontFamily: "RedHatMono",
    textAlign: "center",
    fontSize: 60,
  },
  iconoir: {
    height: 25,
    width: 25,
  },
});

export { Login };
