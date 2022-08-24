import { HelperText, RadioButton } from "react-native-paper";
import { useController } from "react-hook-form";
import { Platform, View } from "react-native";

function RadioButtonGroupHF({ rules = {}, control, controllerName, items = [] }) {
  const {
    fieldState: { error },
    field: { value, onChange, onBlur },
  } = useController({ control, rules, name: controllerName });

  return (
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
  );
}

export { RadioButtonGroupHF };
