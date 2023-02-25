import { HelperText, TextInput } from "react-native-paper";
import { useController } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View, Platform } from "react-native";
import { useEffect, useState } from "react";

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
  const [textNumber, setTextNumber] = useState(String(value));

  useEffect(() => {
    onChange(Number(textNumber));
  }, [textNumber]);

  return (
    <View>
      <TextInput
        keyboardType={Platform.OS === "ios" ? "numeric" : "phone-pad"}
        secureTextEntry={secureTextEntry}
        onChangeText={setTextNumber}
        placeholder={placeholder}
        value={textNumber}
        onBlur={onBlur}
        dense={dense}
        style={style}
        error={error}
        label={label}
        right={right}
        mode={mode}
        left={left}
      />
      {error ? (
        <HelperText visible={error} type="error">
          {error?.message}
        </HelperText>
      ) : null}
    </View>
  );
}

export { NumberInputHF };
