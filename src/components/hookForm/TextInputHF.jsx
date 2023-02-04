import { HelperText, TextInput } from "react-native-paper";
import { sharedStyles } from "../../shared/styles";
import { useController } from "react-hook-form";
import { View } from "react-native";

function TextInputHF({
  numberOfLines = 1,
  multiline = false,
  mode = "outlined",
  secureTextEntry,
  controllerName,
  dense = false,
  placeholder,
  rules = {},
  control,
  label,
  right,
  style,
  left,
}) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController({ control, rules, name: controllerName });

  return (
    <View>
      <TextInput
        secureTextEntry={secureTextEntry}
        numberOfLines={numberOfLines}
        onBlur={() => {
          if (value) {
            onChange(value.trim());
          }
          onBlur();
        }}
        placeholder={placeholder}
        onChangeText={onChange}
        multiline={multiline}
        dense={dense}
        style={style}
        error={error}
        label={label}
        value={value}
        right={right}
        mode={mode}
        left={left}
      />
      <View>
        {rules.maxLength ? (
          <HelperText
            style={[sharedStyles.fullWidth, sharedStyles.textAlignR]}
            type={error ? "error" : "info"}
            visible>
            {value ? value.length : 0}/{rules.maxLength.value}
          </HelperText>
        ) : null}
        {error ? (
          <HelperText visible={error} type="error">
            {error?.message}
          </HelperText>
        ) : null}
      </View>
    </View>
  );
}

export { TextInputHF };
