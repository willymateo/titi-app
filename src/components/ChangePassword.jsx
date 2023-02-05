import { Keyboard, KeyboardAvoidingView, Platform, View } from "react-native";
import { PasswordError, WarningCircle } from "iconoir-react-native";
import { RepeatPasswordHF } from "./hookForm/RepeatPasswordHF";
import { updateAccountInformation } from "../services/app/me";
import { Button, Dialog, Portal } from "react-native-paper";
import { useErrorDialog } from "../hooks/useErrorDialog";
import { useLoading } from "../hooks/useLoading";
import { useVisible } from "../hooks/useVisible";
import { LoadingDialog } from "./LoadingDialog";
import { sharedStyles } from "../shared/styles";
import { useTranslation } from "react-i18next";
import { ErrorDialog } from "./ErrorDialog";
import { useForm } from "react-hook-form";

function ChangePassword({ navigation, route: { params: { buttonLabel } = {} } = {} }) {
  const { loading, startLoading, stopLoading } = useLoading();
  const { error, showError, hideError } = useErrorDialog();
  const { watch, control, handleSubmit } = useForm();
  const { t } = useTranslation("translation");
  const {
    isVisible: isConfirmDialogVisible,
    hide: hideConfirmDialog,
    show: showConfirmDialog,
  } = useVisible();
  buttonLabel = buttonLabel || t("screens.settings.changePassword");

  const changePassword = async ({ password }) => {
    startLoading();
    const { error: errorOnUpdate } = await updateAccountInformation({ password });

    if (errorOnUpdate) {
      showError({ error: errorOnUpdate });
    }

    stopLoading();
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[sharedStyles.flx, sharedStyles.flxJCCenter]}>
      <View>
        <RepeatPasswordHF control={control} watch={watch} />

        <Portal>
          <Dialog visible={isConfirmDialogVisible} onDismiss={hideConfirmDialog}>
            <Dialog.Icon icon={props => <WarningCircle {...props} {...sharedStyles.iconoirM} />} />
            <Dialog.Title>{t("screens.changePassword.confirmationDialog")}</Dialog.Title>
            <Dialog.Actions>
              <Button onPress={hideConfirmDialog}>{t("components.dialog.cancel")}</Button>
              <Button
                onPress={() => {
                  hideConfirmDialog();
                  handleSubmit(changePassword)();
                }}>
                {buttonLabel}
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>

      <Button
        onPress={() => {
          Keyboard.dismiss();
          handleSubmit(showConfirmDialog)();
        }}
        style={sharedStyles.mt15}
        uppercase={false}
        mode="contained">
        {buttonLabel}
      </Button>

      <ErrorDialog isVisible={error} onDismiss={hideError} content={error} icon={PasswordError} />
      <LoadingDialog isVisible={loading} />
    </KeyboardAvoidingView>
  );
}

export { ChangePassword };
