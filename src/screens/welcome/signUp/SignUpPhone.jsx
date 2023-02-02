import { TextInputHF } from "../../../components/hookForm/TextInputHF";
import { MMKV_USER_TOKEN, storage } from "../../../config/app.config";
import { setUserSession } from "../../../redux/states/userSession";
import { LoadingDialog } from "../../../components/LoadingDialog";
import { useErrorDialog } from "../../../hooks/useErrorDialog";
import { Keyboard, KeyboardAvoidingView } from "react-native";
import { ErrorDialog } from "../../../components/ErrorDialog";
import { createUser } from "../../../services/app/users";
import { SmartphoneDevice } from "iconoir-react-native";
import { useLoading } from "../../../hooks/useLoading";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextInput } from "react-native-paper";
import { sharedStyles } from "../../../shared/styles";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { Footer } from "../Footer";

function SignUpPhone({ navigation }) {
  const userSession = useSelector(({ userSession }) => userSession);
  const { loading, startLoading, stopLoading } = useLoading();
  const { error, showError, hideError } = useErrorDialog();
  const { control, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handlePressSignUp = async ({ phoneNumber }) => {
    startLoading();

    const { token, error: errorOnCreate } = await createUser({
      ...userSession,
      phone: {
        ...userSession.phone,
        phoneNumber,
      },
      token: undefined,
    });

    if (errorOnCreate) {
      showError({ error: errorOnCreate });
      stopLoading();
      return;
    }

    storage.set(MMKV_USER_TOKEN, token);
    stopLoading();
    dispatch(setUserSession({ token, phone: { phoneNumber }, password: undefined }));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[sharedStyles.flx, sharedStyles.flxJCCenter]}>
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

      <Button
        onPress={() => {
          Keyboard.dismiss();
          handleSubmit(handlePressSignUp)();
        }}
        style={sharedStyles.mv15}
        uppercase={false}
        mode="contained">
        {t("screens.signUp.createAccount")}
      </Button>
      <Footer
        onPressAccountRecovery={() => navigation.navigate("AccountRecovery")}
        onPressLogin={() => navigation.navigate("Login")}
      />

      <ErrorDialog isVisible={error} onDismiss={hideError} content={error} />
      <LoadingDialog isVisible={loading} />
    </KeyboardAvoidingView>
  );
}

export { SignUpPhone };
