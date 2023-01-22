import { TextInputHF } from "../../../components/hookForm/TextInputHF";
import { AtSign, EditPencil, OpenBook, User } from "iconoir-react-native";
import { Avatar, Button, TextInput } from "react-native-paper";
import { sharedStyles } from "../../../shared/styles";
import { useTranslation } from "react-i18next";
import { Keyboard, View } from "react-native";
import { useForm } from "react-hook-form";

function EditProfile({ firstNames = "", lastNames = "", biography = "", username = "", photoUrl }) {
  const { control, handleSubmit } = useForm();
  const { t } = useTranslation();
  const showPictures = () => {};

  const handlePressSave = () => {};

  return (
    <View>
      <View style={sharedStyles.flxACenter}>
        <Avatar.Image source={{ uri: photoUrl }} {...sharedStyles.profilePhotoM} />
        <Button
          icon={props => <EditPencil {...props} {...sharedStyles.iconoirM} />}
          style={sharedStyles.mv5}
          onPress={showPictures}
          mode="contained">
          Change profile picture
        </Button>
      </View>

      <View>
        <TextInputHF
          left={<TextInput.Icon icon={props => <User {...props} {...sharedStyles.iconoirM} />} />}
          label="First names"
          controllerName="firstNames"
          style={sharedStyles.mv5}
          control={control}
        />
        <TextInputHF
          left={<TextInput.Icon icon={props => <User {...props} {...sharedStyles.iconoirM} />} />}
          label="Last names"
          controllerName="lastNames"
          style={sharedStyles.mv5}
          control={control}
        />
        <TextInputHF
          left={<TextInput.Icon icon={props => <AtSign {...props} {...sharedStyles.iconoirM} />} />}
          rules={{ required: t("components.inputHookForm.usernameRequired") }}
          label={t("components.inputHookForm.username")}
          controllerName="username"
          style={sharedStyles.mv5}
          control={control}
        />
        <TextInputHF
          left={
            <TextInput.Icon icon={props => <OpenBook {...props} {...sharedStyles.iconoirM} />} />
          }
          controllerName="biography"
          style={sharedStyles.mv5}
          label="Biography"
          control={control}
          numberOfLines={4}
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
        Save
      </Button>
    </View>
  );
}

export { EditProfile };
