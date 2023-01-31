import { Text, Chip, HelperText } from "react-native-paper";
import { sharedStyles } from "../shared/styles";
import { useController } from "react-hook-form";
import { View } from "react-native";

function InputChip({
  controllerName,
  mode = "flat",
  icon: Icon,
  style = {},
  rules = {},
  control,
  onPress,
  label,
  value,
}) {
  const {
    fieldState: { error },
  } = useController({ control, rules, name: controllerName });

  return (
    <View style={style}>
      <Text style={sharedStyles.mb5}>{label}</Text>
      <View style={sharedStyles.flxRow}>
        <Chip
          icon={props => <Icon {...props} {...sharedStyles.iconoirM} />}
          onPress={onPress}
          mode={mode}>
          {value}
        </Chip>
      </View>
      {error ? (
        <HelperText visible type="error">
          {error.message}
        </HelperText>
      ) : null}
    </View>
  );
}

export { InputChip };
