import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { DateTimePickerHF } from "../../../components/hookForm/DateTimePickerHF";
import { GendersInputHF } from "../../../components/hookForm/GendersInputHF";
import { TextInputHF } from "../../../components/hookForm/TextInputHF";
import { updateAccountInformation } from "../../../services/app/me";
import { setUserSession } from "../../../redux/states/userSession";
import { LoadingDialog } from "../../../components/LoadingDialog";
import { useErrorDialog } from "../../../hooks/useErrorDialog";
import { ErrorDialog } from "../../../components/ErrorDialog";
import { EMAIL_REGEX } from "../../../config/app.config";
import { useLoading } from "../../../hooks/useLoading";
import { Button, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { sharedStyles } from "../../../shared/styles";
import { useTranslation } from "react-i18next";
import { Keyboard, View } from "react-native";
import { Mail } from "iconoir-react-native";
import { useForm } from "react-hook-form";

function PersonalInformation({ navigation }) {
  const { email, bornDate, idGender } = useSelector(({ userSession }) => userSession);
  const { loading, startLoading, stopLoading } = useLoading();
  const { error, showError, hideError } = useErrorDialog();
  const { watch, control, handleSubmit } = useForm({
    defaultValues: {
      bornDate,
      idGender,
      email,
    },
  });
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handlePressSave = async data => {
    startLoading();
    const { error: errorOnUpdate } = await updateAccountInformation(data);

    if (errorOnUpdate) {
      showError({ error: errorOnUpdate });
    }

    dispatch(setUserSession(data));
    stopLoading();
    navigation.goBack();
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={sharedStyles.flxGrow1}
      showsVerticalScrollIndicator={false}
      style={sharedStyles.flx}>
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

        <GendersInputHF
          rules={{ required: t("components.inputHookForm.genderRequired") }}
          controllerName="idGender"
          style={sharedStyles.mv15}
          control={control}
          watch={watch}
        />

        <DateTimePickerHF
          rules={{ required: t("components.inputHookForm.bornDateRequired") }}
          placeholder={t("components.inputHookForm.bornDatePlaceholder")}
          helperText={t("components.inputHookForm.bornDateHelperText")}
          label={t("components.inputHookForm.bornDate")}
          controllerName="bornDate"
          control={control}
          watch={watch}
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
    </KeyboardAwareScrollView>
  );
}

export { PersonalInformation };
