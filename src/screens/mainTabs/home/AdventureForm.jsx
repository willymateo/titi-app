import { DateTimePickerHF } from "../../../components/hookForm/DateTimePickerHF";
import { TextInputHF } from "../../../components/hookForm/TextInputHF";
import { createAdventure } from "../../../services/app/adventures";
import { LoadingDialog } from "../../../components/LoadingDialog";
import { useErrorDialog } from "../../../hooks/useErrorDialog";
import { ErrorDialog } from "../../../components/ErrorDialog";
import { Button, TextInput } from "react-native-paper";
import { useLoading } from "../../../hooks/useLoading";
import { sharedStyles } from "../../../shared/styles";
import { Bonfire, Map } from "iconoir-react-native";
import { useTranslation } from "react-i18next";
import { Keyboard, View } from "react-native";
import { useForm } from "react-hook-form";

function AdventureForm() {
  const { t } = useTranslation("translation", { keyPrefix: "components" });
  const { loading, startLoading, stopLoading } = useLoading();
  const { error, showError, hideError } = useErrorDialog();
  const { control, watch, handleSubmit } = useForm();

  const handlePressSave = async data => {
    console.log({ data });
    startLoading();
    const { error: errorOnCreate } = await createAdventure(data);

    if (errorOnCreate) {
      showError({ error: errorOnCreate });
    }

    stopLoading();
  };

  return (
    <View>
      <TextInputHF
        left={<TextInput.Icon icon={props => <Bonfire {...props} {...sharedStyles.iconoirM} />} />}
        rules={{ required: t("inputHookForm.titleRequired") }}
        label={t("inputHookForm.title")}
        style={sharedStyles.mv5}
        controllerName="title"
        control={control}
      />
      <TextInputHF
        left={<TextInput.Icon icon={props => <Map {...props} {...sharedStyles.iconoirM} />} />}
        rules={{
          maxLength: {
            message: t("inputHookForm.descriptionMaxLength"),
            value: 255,
          },
        }}
        label={t("inputHookForm.description")}
        controllerName="description"
        style={sharedStyles.mv5}
        numberOfLines={4}
        control={control}
        multiline
      />
      <DateTimePickerHF
        rules={{ required: t("inputHookForm.startDateTimeRequired") }}
        placeholder={t("inputHookForm.startDateTimePlaceholder")}
        helperText={t("inputHookForm.bornDateHelperText")}
        label={t("inputHookForm.startDateTime")}
        controllerName="startDateTime"
        control={control}
        watch={watch}
      />
      <DateTimePickerHF
        rules={{ required: t("inputHookForm.endDateTimeRequired") }}
        placeholder={t("inputHookForm.endDateTimePlaceholder")}
        helperText={t("inputHookForm.bornDateHelperText")}
        label={t("inputHookForm.endDateTime")}
        controllerName="endDateTime"
        control={control}
        watch={watch}
      />
      <Button
        onPress={() => {
          Keyboard.dismiss();
          handleSubmit(handlePressSave)();
        }}
        style={sharedStyles.mv15}
        uppercase={false}
        mode="contained">
        {t("homeStackNavigator.createAdventure")}
      </Button>

      <ErrorDialog isVisible={error} onDismiss={hideError} content={error} />
      <LoadingDialog isVisible={loading} />
    </View>
  );
}

export { AdventureForm };
