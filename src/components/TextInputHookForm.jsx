import { HelperText, TextInput } from "react-native-paper";
import { Controller } from "react-hook-form";

function TextInputHookForm({
  left,
  label,
  right,
  control,
  rules = {},
  placeholder,
  controllerName,
  secureTextEntry,
}) {
  return (
    <Controller
      control={control}
      name={controllerName}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <>
          <TextInput
            error={error}
            label={label}
            value={value}
            onBlur={onBlur}
            left={left}
            right={right}
            onChangeText={onChange}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
          />
          {error && (
            <HelperText type="error" visible={true}>
              {error.message}
            </HelperText>
          )}
        </>
      )}
    />
  );
}

export { TextInputHookForm };
