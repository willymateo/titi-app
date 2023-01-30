import { HelperText, TextInput } from "react-native-paper";
import { useController } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View, Platform } from "react-native";

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
  const { t } = useTranslation("translation", { keyPrefix: "components.inputHookForm" });
  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController({
    rules: {
      ...rules,
      validate: value => !isNaN(value) || t("validNumber"),
    },
    name: controllerName,
    control,
  });

  return (
    <View>
      <TextInput
        keyboardType={Platform.OS === "ios" ? "numeric" : "phone-pad"}
        onChangeText={text => {
          const numberInput = Number(text);
          onChange(numberInput);
        }}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        onBlur={onBlur}
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
