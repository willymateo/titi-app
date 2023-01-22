import { AtSign, EditPencil, OpenBook, User } from "iconoir-react-native";
import { TextInputHF } from "../../../components/hookForm/TextInputHF";
import { updateAccountInformation } from "../../../services/app/me";
import { LoadingDialog } from "../../../components/LoadingDialog";
import { Avatar, Button, TextInput } from "react-native-paper";
import { useErrorDialog } from "../../../hooks/useErrorDialog";
import { ErrorDialog } from "../../../components/ErrorDialog";
import { useLoading } from "../../../hooks/useLoading";
import { sharedStyles } from "../../../shared/styles";
import { useTranslation } from "react-i18next";
import { Keyboard, View } from "react-native";
import { useForm } from "react-hook-form";
import {
  USERNAME_REGEX,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from "../../../config/app.config";

function EditProfile({
  route: {
    params: { firstNames = "", lastNames = "", biography = "", username = "", photoUrl },
  },
  navigation,
}) {
  const { loading, startLoading, stopLoading } = useLoading();
  const { error, showError, hideError } = useErrorDialog();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      firstNames,
      lastNames,
      biography,
      username,
    },
  });
  const { t } = useTranslation();
  const showPictures = () => {};

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
    <View>
      <View style={sharedStyles.flxACenter}>
        <Avatar.Image source={{ uri: photoUrl }} {...sharedStyles.profilePhotoM} />
        <Button
          icon={props => <EditPencil {...props} {...sharedStyles.iconoirM} />}
          style={sharedStyles.mv5}
          onPress={showPictures}
          mode="contained">
          {t("screens.editProfile.changeProfilePhoto")}
        </Button>
      </View>

      <View>
        <TextInputHF
          left={<TextInput.Icon icon={props => <User {...props} {...sharedStyles.iconoirM} />} />}
          label={t("components.inputHookForm.firstNames")}
          controllerName="firstNames"
          style={sharedStyles.mv5}
          control={control}
        />
        <TextInputHF
          left={<TextInput.Icon icon={props => <User {...props} {...sharedStyles.iconoirM} />} />}
          label={t("components.inputHookForm.lastNames")}
          controllerName="lastNames"
          style={sharedStyles.mv5}
          control={control}
        />
        <TextInputHF
          left={<TextInput.Icon icon={props => <AtSign {...props} {...sharedStyles.iconoirM} />} />}
          rules={{
            required: t("components.inputHookForm.usernameRequired"),
            minLength: {
              message: t("components.inputHookForm.usernameMinLength"),
              value: USERNAME_MIN_LENGTH,
            },
            maxLength: {
              message: t("components.inputHookForm.usernameMaxLength"),
              value: USERNAME_MAX_LENGTH,
            },
            pattern: {
              message: t("components.inputHookForm.usernameRegex"),
              value: USERNAME_REGEX,
            },
          }}
          label={t("components.inputHookForm.username")}
          controllerName="username"
          style={sharedStyles.mv5}
          control={control}
        />
        <TextInputHF
          left={
            <TextInput.Icon icon={props => <OpenBook {...props} {...sharedStyles.iconoirM} />} />
          }
          rules={{
            maxLength: {
              message: t("components.inputHookForm.biographyMaxLength"),
              value: 255,
            },
          }}
          label={t("components.inputHookForm.biography")}
          controllerName="biography"
          style={sharedStyles.mv5}
          numberOfLines={4}
          control={control}
          multiline
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
    </View>
  );
}

export { EditProfile };
