import { resetSignUpForm, setSignUpForm } from "../../../redux/states/signUpForm";
import { TextInputHF } from "../../../components/hookForm/TextInputHF";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { MMKV_USER_TOKEN, storage } from "../../../config/app.config";
import { setUserSession } from "../../../redux/states/userSession";
import { LoadingDialog } from "../../../components/LoadingDialog";
import { useErrorDialog } from "../../../hooks/useErrorDialog";
import { ErrorDialog } from "../../../components/ErrorDialog";
import { LoginFooter } from "../../../components/LoginFooter";
import { SmartphoneDevice } from "iconoir-react-native";
import { useLoading } from "../../../hooks/useLoading";
import { Button, TextInput } from "react-native-paper";
import { sharedStyles } from "../../../shared/styles";
import { createUser } from "../../../services/app";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function SignUpPhone({ navigation }) {
  const { loading, startLoading, stopLoading } = useLoading();
  const { error, showError, hideError } = useErrorDialog();
  const { control, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handlePressSignUp = async ({ phoneNumber }) => {
    startLoading();
    dispatch(setSignUpForm({ phone: { phoneNumber } }));

    const { token, error: errorOnCreate } = await createUser();

    if (errorOnCreate) {
      showError({ error: errorOnCreate });
      stopLoading();
      return;
    }

    storage.set(MMKV_USER_TOKEN, token);
    dispatch(resetSignUpForm());
    dispatch(setUserSession({ token }));
    stopLoading();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.root}>
      <View style={{ ...styles.container }}>
        <TextInputHF
          left={
            <TextInput.Icon
              icon={props => <SmartphoneDevice {...props} {...sharedStyles.iconoirM} />}
            />
          }
          rules={{
            required: t("components.inputHookForm.phoneNumberRequired"),
          }}
          label={t("components.inputHookForm.phoneNumber")}
          controllerName="phoneNumber"
          style={sharedStyles.mv5}
          control={control}
        />

        <Button mode="contained" uppercase={false} onPress={handleSubmit(handlePressSignUp)}>
          {t("screens.signUp.createAccount")}
        </Button>
        <LoginFooter
          onPressAccountRecovery={() => navigation.navigate("AccountRecovery")}
          onPressLogin={() => navigation.navigate("Login")}
        />

        <ErrorDialog isVisible={error} onDismiss={hideError} content={error} />
        <LoadingDialog isVisible={loading} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
  },
});

export { SignUpPhone };
