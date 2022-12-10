import { HelperText, TextInput } from "react-native-paper";
import { sharedStyles } from "../../shared/styles";
import { useController } from "react-hook-form";
import { View } from "react-native";

function TextInputHF({
  mode = "outlined",
  secureTextEntry,
  controllerName,
  placeholder,
  rules = {},
  control,
  label,
  right,
  style,
  left,
}) {
  const {
    fieldState: { error },
    field: { value, onChange, onBlur },
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
        placeholder={placeholder}
        onChangeText={onChange}
        style={style}
        error={error}
        label={label}
        value={value}
        right={right}
        mode={mode}
        left={left}
      />
      <View style={[sharedStyles.flxRow, sharedStyles.flxSBtwn]}>
        {error && (
          <HelperText visible type="error">
            {error.message}
          </HelperText>
        )}
        {rules.maxLength && (
          <HelperText
            style={[sharedStyles.flx, sharedStyles.textAlignR]}
            type={error ? "error" : "info"}
            visible>
            {value ? value.length : 0}/{rules.maxLength.value}
          </HelperText>
        )}
      </View>
    </View>
  );
}

export { TextInputHF };
