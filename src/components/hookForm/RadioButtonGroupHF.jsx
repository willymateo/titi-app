import { HelperText, RadioButton } from "react-native-paper";
import { Controller } from "react-hook-form";
import { View } from "react-native";

function RadioButtonGroupHF({ rules = {}, control, children, controllerName }) {
  return (
    <Controller
      rules={rules}
      control={control}
      name={controllerName}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <View>
          <RadioButton.Group value={value} onValueChange={onChange}>
            {children}
          </RadioButton.Group>

          {error && (
            <HelperText visible type="error">
              {error.message}
            </HelperText>
          )}
        </View>
      )}
    />
  );
}

export { RadioButtonGroupHF };
