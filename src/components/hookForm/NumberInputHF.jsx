import { HelperText, TextInput } from "react-native-paper";
import { useController } from "react-hook-form";
import { View } from "react-native";
import { Platform } from "react-native";

function NumberInputHF({
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
        onBlur={() => {
          if (value) {
            onChange(value.trim());
          }
          onBlur();
        }}
        keyboardType={Platform.OS === "ios" ? "numeric" : "phone-pad"}
        placeholder={placeholder}
        onChangeText={onChange}
        dense={dense}
        style={style}
        error={error}
        label={label}
        value={value}
        right={right}
        mode={mode}
        left={left}
      />
      {error && (
        <HelperText visible type="error">
          {error.message}
        </HelperText>
      )}
    </View>
  );
}

export { NumberInputHF };
