import { HelperText, RadioButton } from "react-native-paper";
import { Platform, View } from "react-native";
import { Controller } from "react-hook-form";

function RadioButtonGroupHF({ rules = {}, control, controllerName, items }) {
  return (
    <Controller
      rules={rules}
      control={control}
      name={controllerName}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <View>
          <RadioButton.Group
            value={value}
            onValueChange={value => {
              onChange(value);
              onBlur();
            }}>
            {items.map(({ id, value }) => (
              <RadioButton.Item
                mode={Platform.OS === "ios" ? "ios" : "android"}
                label={value}
                value={id}
                key={id}
              />
            ))}
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
