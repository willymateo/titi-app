import DateTimePicker from "@react-native-community/datetimepicker";
import { useVisible } from "../../hooks/useVisible";
import { HelperText } from "react-native-paper";
import { useController } from "react-hook-form";
import { Clock } from "iconoir-react-native";
import { InputChipHF } from "./InputChipHF";
import { format, parse } from "date-fns";
import { View } from "react-native";

function TimePickerHF({
  placeholder = "",
  helperText = "",
  controllerName,
  label = "",
  rules = {},
  chipMode,
  control,
  style,
  watch,
}) {
  const { isVisible, show, hide } = useVisible();
  const selectedTime = watch(controllerName);
  const {
    field: { value, onChange, onBlur },
  } = useController({
    defaultValue: format(new Date(), "HH:mm:ss"),
    name: controllerName,
    control,
    rules,
  });

  return (
    <View style={style}>
      <InputChipHF
        value={selectedTime ? selectedTime.slice(0, -3) : placeholder}
        controllerName={controllerName}
        control={control}
        mode={chipMode}
        onPress={show}
        label={label}
        rules={rules}
        icon={Clock}
      />
      <HelperText>{helperText}</HelperText>

      {isVisible ? (
        <DateTimePicker
          value={parse(value, "HH:mm:ss", new Date())}
          onChange={(event, newValue) => {
            hide();
            onChange(format(newValue, "HH:mm:ss"));
            onBlur();
          }}
          mode="time"
        />
      ) : null}
    </View>
  );
}

export { TimePickerHF };
