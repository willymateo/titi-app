import DateTimePicker from "@react-native-community/datetimepicker";
import { formatISO, intlFormat, parseISO } from "date-fns";
import { useVisible } from "../../hooks/useVisible";
import { HelperText } from "react-native-paper";
import { useController } from "react-hook-form";
import { Calendar } from "iconoir-react-native";
import { InputChipHF } from "./InputChipHF";
import { useSelector } from "react-redux";
import { View } from "react-native";

function DateTimePickerHF({
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
  const { language } = useSelector(({ languagePreference }) => languagePreference);
  const { isVisible, show, hide } = useVisible();
  const selectedDate = watch(controllerName);
  const {
    field: { value, onChange, onBlur },
  } = useController({
    defaultValue: formatISO(new Date()),
    name: controllerName,
    control,
    rules,
  });

  return (
    <View style={style}>
      <InputChipHF
        controllerName={controllerName}
        value={
          selectedDate
            ? intlFormat(
                parseISO(selectedDate),
                {
                  weekday: "long",
                  year: "numeric",
                  day: "numeric",
                  month: "long",
                },
                { locale: language }
              )
            : placeholder
        }
        control={control}
        mode={chipMode}
        icon={Calendar}
        onPress={show}
        label={label}
        rules={rules}
      />
      <HelperText>{helperText}</HelperText>

      {isVisible ? (
        <DateTimePicker
          onChange={(event, value) => {
            hide();
            onChange(formatISO(value));
            onBlur();
          }}
          value={parseISO(value)}
          mode="date"
        />
      ) : null}
    </View>
  );
}

export { DateTimePickerHF };
