import { GendersRadioButton } from "../../../components/GendersRadioButton";
import { TextInputHF } from "../../../components/hookForm/TextInputHF";
import { updateAccountInformation } from "../../../services/app/me";
import { LoadingDialog } from "../../../components/LoadingDialog";
import { useErrorDialog } from "../../../hooks/useErrorDialog";
import { ErrorDialog } from "../../../components/ErrorDialog";
import { InputChip } from "../../../components/InputChip";
import { EMAIL_REGEX } from "../../../config/app.config";
import { useVisible } from "../../../hooks/useVisible";
import { Button, TextInput } from "react-native-paper";
import { useLoading } from "../../../hooks/useLoading";
import { Mail, PeopleTag } from "iconoir-react-native";
import { sharedStyles } from "../../../shared/styles";
import { useTranslation } from "react-i18next";
import { Keyboard, View } from "react-native";
import { useForm } from "react-hook-form";

function PersonalInformation({
  route: { params: { email, bornDate, idGender } = {} } = {},
  navigation,
}) {
  const { isVisible: isVisibleGenderRB, show: showGenderRB, hide: hideGenderRB } = useVisible();
  const { loading, startLoading, stopLoading } = useLoading();
  const { error, showError, hideError } = useErrorDialog();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      bornDate,
      idGender,
      email,
    },
  });
  const { t } = useTranslation();

  const handlePressSave = async data => {
    startLoading();
    const { error: errorOnUpdate } = await updateAccountInformation(data);

    if (errorOnUpdate) {
      showError({ error: errorOnUpdate });
    }

    stopLoading();
    navigation.goBack();
  };

  return (
    <>
      <View>
        <TextInputHF
          left={<TextInput.Icon icon={props => <Mail {...props} {...sharedStyles.iconoirM} />} />}
          rules={{
            required: t("components.inputHookForm.emailRequired"),
            pattern: {
              message: t("components.inputHookForm.emailInvalid"),
              value: EMAIL_REGEX,
            },
          }}
          label={t("components.inputHookForm.email")}
          style={sharedStyles.mv5}
          controllerName="email"
          control={control}
        />

        <InputChip
          value={t("components.inputHookForm.genderPlaceholder")}
          label={t("components.inputHookForm.gender")}
          style={sharedStyles.mv15}
          onPress={showGenderRB}
          icon={PeopleTag}
          mode="flat"
        />
        <GendersRadioButton
          isVisible={isVisibleGenderRB}
          controllerName="idGender"
          hide={hideGenderRB}
          control={control}
        />
      </View>

      <Button
        onPress={() => {
          Keyboard.dismiss();
          handleSubmit(handlePressSave)();
        }}
        style={sharedStyles.mv15}
        uppercase={false}
        mode="contained">
        {t("screens.editProfile.save")}
      </Button>

      <ErrorDialog isVisible={error} onDismiss={hideError} content={error} />
      <LoadingDialog isVisible={loading} />
    </>
  );
}

export { PersonalInformation };
