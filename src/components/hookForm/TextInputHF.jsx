import { HelperText, TextInput } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { Controller } from "react-hook-form";

function TextInputHF({
  mode,
  left,
  label,
  right,
  style,
  control,
  rules = {},
  placeholder,
  controllerName,
  secureTextEntry,
}) {
  return (
    <Controller
      rules={rules}
      control={control}
      name={controllerName}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <View>
          <TextInput
            mode={mode}
            left={left}
            style={style}
            error={error}
            label={label}
            value={value}
            right={right}
            onBlur={() => {
              if (value) {
                onChange(value.trim());
              }
              onBlur();
            }}
            onChangeText={onChange}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
          />
          <View style={styles.helpersWrapper}>
            {error && (
              <HelperText visible type="error">
                {error.message}
              </HelperText>
            )}
            {rules.maxLength && (
              <HelperText visible style={styles.counterHelper} type={error ? "error" : "info"}>
                {value ? value.length : 0}/{rules.maxLength.value}
              </HelperText>
            )}
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  helpersWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  counterHelper: {
    flex: 1,
    textAlign: "right",
  },
});

export { TextInputHF };
