import { RepeatPasswordHF } from "../../../components/hookForm/RepeatPasswordHF";
import { Keyboard, KeyboardAvoidingView, Platform, View } from "react-native";
import { PasswordError, WarningCircledOutline } from "iconoir-react-native";
import { updateAccountInformation } from "../../../services/app/me";
import { LoadingDialog } from "../../../components/LoadingDialog";
import { useErrorDialog } from "../../../hooks/useErrorDialog";
import { ErrorDialog } from "../../../components/ErrorDialog";
import { Button, Dialog, Portal } from "react-native-paper";
import { useLoading } from "../../../hooks/useLoading";
import { useVisible } from "../../../hooks/useVisible";
import { sharedStyles } from "../../../shared/styles";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

function ChangePassword({ navigation }) {
  const { loading, startLoading, stopLoading } = useLoading();
  const { error, showError, hideError } = useErrorDialog();
  const { watch, control, handleSubmit } = useForm();
  const { t } = useTranslation("translation");
  const {
    isVisible: isConfirmDialogVisible,
    hide: hideConfirmDialog,
    show: showConfirmDialog,
  } = useVisible();

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
      style={sharedStyles.flx}>
      <View style={[sharedStyles.flx, sharedStyles.flxJCCenter]}>
        <View>
          <RepeatPasswordHF control={control} watch={watch} />

          <Portal>
            <Dialog visible={isConfirmDialogVisible} onDismiss={hideConfirmDialog}>
              <Dialog.Icon
                icon={props => <WarningCircledOutline {...props} {...sharedStyles.iconoirM} />}
              />
              <Dialog.Title>{t("screens.changePassword.confirmationDialog")}</Dialog.Title>
              <Dialog.Actions>
                <Button onPress={hideConfirmDialog}>{t("components.dialog.cancel")}</Button>
                <Button
                  onPress={() => {
                    hideConfirmDialog();
                    handleSubmit(changePassword)();
                  }}>
                  {t("screens.settings.changePassword")}
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
          {t("screens.settings.changePassword")}
        </Button>

        <ErrorDialog isVisible={error} onDismiss={hideError} content={error} icon={PasswordError} />
        <LoadingDialog isVisible={loading} />
      </View>
    </KeyboardAvoidingView>
  );
}

export { ChangePassword };
