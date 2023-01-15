import { RepeatPasswordHF } from "../../../components/hookForm/RepeatPasswordHF";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { LoadingDialog } from "../../../components/LoadingDialog";
import { useErrorDialog } from "../../../hooks/useErrorDialog";
import { ErrorDialog } from "../../../components/ErrorDialog";
import { useLoading } from "../../../hooks/useLoading";
import { sharedStyles } from "../../../shared/styles";
import { PasswordError } from "iconoir-react-native";
import { updateUser } from "../../../services/app";
import { useTranslation } from "react-i18next";
import { Button } from "react-native-paper";
import { useForm } from "react-hook-form";

function ChangePassword() {
  const { t } = useTranslation("translation", { keyPrefix: "screens.settings" });
  const { loading, startLoading, stopLoading } = useLoading();
  const { error, showError, hideError } = useErrorDialog();
  const { control, watch, handleSubmit } = useForm();

  const changePassword = async ({ password }) => {
    startLoading();
    const { error: errorOnUpdate } = await updateUser({ password });

    if (errorOnUpdate) {
      showError({ error: errorOnUpdate });
    }

    stopLoading();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={sharedStyles.flx}>
      <View style={[sharedStyles.flx, sharedStyles.flxJCCenter]}>
        <View>
          <RepeatPasswordHF control={control} watch={watch} />;
        </View>
        <Button mode="contained" uppercase={false} onPress={handleSubmit(changePassword)}>
          {t("changePassword")}
        </Button>
        <ErrorDialog isVisible={error} onDismiss={hideError} content={error} icon={PasswordError} />
        <LoadingDialog isVisible={loading} />
      </View>
    </KeyboardAvoidingView>
  );
}

export { ChangePassword };
