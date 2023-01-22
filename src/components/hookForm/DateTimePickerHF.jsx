import DateTimePicker from "@react-native-community/datetimepicker";
import { formatISO, intlFormat, parseISO } from "date-fns";
import { useVisible } from "../../hooks/useVisible";
import { HelperText } from "react-native-paper";
import { useController } from "react-hook-form";
import { Calendar } from "iconoir-react-native";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { InputChip } from "../InputChip";
import { View } from "react-native";

function DateTimePickerHF({ style, control, watch, controllerName, mode, rules = {} }) {
  const { t } = useTranslation("translation", { keyPrefix: "components.inputHookForm" });
  const { language } = useSelector(state => state.languagePreference);
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
      <InputChip
        value={
          selectedDate
            ? intlFormat(
                parseISO(selectedDate),
                {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                },
                { locale: language }
              )
            : t("bornDatePlaceholder")
        }
        label={t("bornDate")}
        icon={Calendar}
        onPress={show}
        mode="flat"
      />
      <HelperText>{t("bornDateHelperText")}</HelperText>

      {isVisible ? (
        <DateTimePicker
          onChange={(event, value) => {
            hide();
            onChange(formatISO(value));
            onBlur();
          }}
          value={parseISO(value)}
          mode={mode}
        />
      ) : null}
    </View>
  );
}

export { DateTimePickerHF };
