import DateTimePicker from "@react-native-community/datetimepicker";
import { Calendar, Clock } from "iconoir-react-native";
import { HelperText, Text } from "react-native-paper";
import { useVisible } from "../../hooks/useVisible";
import { sharedStyles } from "../../shared/styles";
import { useController } from "react-hook-form";
import { InputChipHF } from "./InputChipHF";
import { useSelector } from "react-redux";
import { View } from "react-native";
import {
  getSeconds,
  getMinutes,
  intlFormat,
  formatISO,
  getMonth,
  getHours,
  parseISO,
  getDate,
  getYear,
  format,
  set,
} from "date-fns";

function DateTimePickerHF({
  timePlaceholder = "",
  datePlaceholder = "",
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
  const selectedDateTime = watch(controllerName);
  const {
    field: { value, onChange, onBlur },
  } = useController({
    defaultValue: formatISO(new Date()),
    name: controllerName,
    control,
    rules,
  });
  const {
    isVisible: isDatePickerVisible,
    show: showDatePicker,
    hide: hideDatePicker,
  } = useVisible();
  const {
    isVisible: isTimePickerVisible,
    show: showTimePicker,
    hide: hideTimePicker,
  } = useVisible();

  return (
    <View style={style}>
      {label ? <Text style={sharedStyles.mb5}>{label}</Text> : null}
      <InputChipHF
        value={
          selectedDateTime
            ? intlFormat(
                parseISO(value),
                {
                  weekday: "long",
                  year: "numeric",
                  day: "numeric",
                  month: "long",
                },
                { locale: language }
              )
            : datePlaceholder
        }
        controllerName={controllerName}
        onPress={() => {
          showDatePicker();
          hideTimePicker();
        }}
        control={control}
        mode={chipMode}
        icon={Calendar}
        rules={rules}
      />
      <InputChipHF
        value={selectedDateTime ? format(parseISO(selectedDateTime), "HH:mm") : timePlaceholder}
        controllerName={controllerName}
        style={sharedStyles.mt5}
        onPress={() => {
          showTimePicker();
          hideDatePicker();
        }}
        control={control}
        mode={chipMode}
        rules={rules}
        icon={Clock}
      />
      <HelperText>{helperText}</HelperText>

      {isDatePickerVisible ? (
        <DateTimePicker
          onChange={(event, newValue) => {
            const newDateTime = set(parseISO(value), {
              month: getMonth(newValue),
              date: getDate(newValue),
              year: getYear(newValue),
            });

            hideDatePicker();
            onChange(formatISO(newDateTime));
            onBlur();
          }}
          value={parseISO(value)}
          mode="date"
        />
      ) : null}

      {isTimePickerVisible ? (
        <DateTimePicker
          onChange={(event, newValue) => {
            const newDateTime = set(parseISO(value), {
              minutes: getMinutes(newValue),
              seconds: getSeconds(newValue),
              hours: getHours(newValue),
            });

            hideTimePicker();
            onChange(formatISO(newDateTime));
            onBlur();
          }}
          value={parseISO(value)}
          mode="time"
        />
      ) : null}
    </View>
  );
}

export { DateTimePickerHF };
