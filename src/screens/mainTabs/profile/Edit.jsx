import { ImagePickerButtonHF } from "../../../components/hookForm/ImagePickerButtonHF";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AtSign, Camera, CloudError, OpenBook, User } from "iconoir-react-native";
import { TextInputHF } from "../../../components/hookForm/TextInputHF";
import { updateAccountInformation } from "../../../services/app/me";
import { setUserSession } from "../../../redux/states/userSession";
import { LoadingDialog } from "../../../components/LoadingDialog";
import { Avatar, Button, TextInput } from "react-native-paper";
import { useErrorDialog } from "../../../hooks/useErrorDialog";
import { ErrorDialog } from "../../../components/ErrorDialog";
import { useDispatch, useSelector } from "react-redux";
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

function Edit({ navigation }) {
  const { firstNames, lastNames, biography, username, photoUrl } = useSelector(
    ({ userSession }) => userSession
  );
  const { loading, startLoading, stopLoading } = useLoading();
  const { error, showError, hideError } = useErrorDialog();
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      firstNames,
      lastNames,
      biography,
      username,
      photoUrl,
    },
  });
  const photoUrlSelected = watch("photoUrl");
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handlePressSave = async data => {
    startLoading();
    const { error: errorOnUpdate } = await updateAccountInformation(data);

    if (errorOnUpdate) {
      showError({ error: errorOnUpdate });
      stopLoading();
      return;
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
      <View style={sharedStyles.flxACenter}>
        <Avatar.Image source={{ uri: photoUrlSelected }} {...sharedStyles.profilePhotoM} />
        <ImagePickerButtonHF
          icon={props => <Camera {...props} {...sharedStyles.iconoirM} />}
          controllerName="photoUrl"
          style={sharedStyles.mv5}
          control={control}>
          {t("screens.editProfile.changeProfilePhoto")}
        </ImagePickerButtonHF>
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

      <ErrorDialog isVisible={error} onDismiss={hideError} content={error} icon={CloudError} />
      <LoadingDialog isVisible={loading} />
    </KeyboardAwareScrollView>
  );
}

export { Edit };
