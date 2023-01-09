import { HelperText, RadioButton } from "react-native-paper";
import { useController } from "react-hook-form";
import { Platform, View } from "react-native";

function RadioButtonGroupHF({
  onSelect = () => {},
  controllerName,
  rules = {},
  items = [],
  control,
}) {
  const {
    fieldState: { error },
    field: { value, onChange, onBlur },
  } = useController({ control, rules, name: controllerName });

  return (
    <View>
      <RadioButton.Group
        onValueChange={value => {
          onChange(value);
          onscroll();
          onBlur();
        }}
        value={value}>
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
