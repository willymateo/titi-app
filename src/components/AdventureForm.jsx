import { DateTimePickerHF } from "./hookForm/DateTimePickerHF";
import { createAdventure } from "../services/app/adventures";
import { Bonfire, Group, Map } from "iconoir-react-native";
import { NumberInputHF } from "./hookForm/NumberInputHF";
import { useErrorDialog } from "../hooks/useErrorDialog";
import { Button, TextInput } from "react-native-paper";
import { TextInputHF } from "./hookForm/TextInputHF";
import { useLoading } from "../hooks/useLoading";
import { sharedStyles } from "../shared/styles";
import { LoadingDialog } from "./LoadingDialog";
import { useTranslation } from "react-i18next";
import { Keyboard, View } from "react-native";
import { ErrorDialog } from "./ErrorDialog";
import { useForm } from "react-hook-form";

function AdventureForm({
  route: {
    params: {
      numInvitations = 1,
      description = "",
      startDateTime,
      endDateTime,
      buttonLabel,
      title = "",
    } = {},
  } = {},
  navigation,
}) {
  const { t } = useTranslation("translation", { keyPrefix: "components" });
  buttonLabel = buttonLabel || t("adventures.createAdventure");
  const { loading, startLoading, stopLoading } = useLoading();
  const { error, showError, hideError } = useErrorDialog();
  const { control, watch, handleSubmit } = useForm({
    defaultValues: {
      numInvitations,
      startDateTime,
      description,
      endDateTime,
      title,
    },
  });

  const handlePressCreate = async data => {
    startLoading();
    const { error: errorOnCreate } = await createAdventure(data);

    if (errorOnCreate) {
      showError({ error: errorOnCreate });
      stopLoading();
      return;
    }

    stopLoading();
    navigation.goBack();
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
      <NumberInputHF
        left={<TextInput.Icon icon={props => <Group {...props} {...sharedStyles.iconoirM} />} />}
        rules={{
          min: { value: 1, message: t("inputHookForm.numInvitationsMin") },
          required: t("inputHookForm.numInvitationsRequired"),
        }}
        label={t("inputHookForm.numInvitations")}
        controllerName="numInvitations"
        style={sharedStyles.mv5}
        control={control}
      />
      <DateTimePickerHF
        rules={{ required: t("inputHookForm.startDateTimeRequired") }}
        placeholder={t("inputHookForm.startDateTimePlaceholder")}
        helperText={t("inputHookForm.startDateTimeHelperText")}
        label={t("inputHookForm.startDateTime")}
        controllerName="startDateTime"
        style={sharedStyles.mv5}
        control={control}
        watch={watch}
      />
      <DateTimePickerHF
        rules={{ required: t("inputHookForm.endDateTimeRequired") }}
        placeholder={t("inputHookForm.endDateTimePlaceholder")}
        helperText={t("inputHookForm.endDateTimeHelperText")}
        label={t("inputHookForm.endDateTime")}
        controllerName="endDateTime"
        control={control}
        watch={watch}
      />
      <Button
        onPress={() => {
          Keyboard.dismiss();
          handleSubmit(handlePressCreate)();
        }}
        style={sharedStyles.mv15}
        uppercase={false}
        mode="contained">
        {buttonLabel}
      </Button>

      <ErrorDialog isVisible={error} onDismiss={hideError} content={error} />
      <LoadingDialog isVisible={loading} />
    </View>
  );
}

export { AdventureForm };
