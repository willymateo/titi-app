import { Button, HelperText } from "react-native-paper";
import { sharedStyles } from "../../shared/styles";
import * as ImagePicker from "expo-image-picker";
import { useController } from "react-hook-form";
import { View } from "react-native";

function ImagePickerButton({
  mode = "contained",
  controllerName,
  rules = {},
  style = {},
  children,
  control,
  icon,
}) {
  const {
    field: { onChange },
    fieldState: { error },
  } = useController({ control, rules, name: controllerName });

  const pickImage = async () => {
    const { canceled, assets } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!canceled) {
      onChange(assets[0].uri);
    }
  };

  return (
    <View style={[sharedStyles.flx, style]}>
      <Button icon={icon} style={style} onPress={pickImage} mode={mode}>
        {children}
      </Button>
      {error && <HelperText type="error">{error.message}</HelperText>}
    </View>
  );
}

export { ImagePickerButton };
