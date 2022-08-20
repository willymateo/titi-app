import DateTimePicker from "@react-native-community/datetimepicker";
import { useController } from "react-hook-form";
import { formatISO, parseISO } from "date-fns";
import { cloneElement, useState } from "react";

function DateTimePickerHF({ control, controllerName, mode, children, rules = {} }) {
  const [isVisible, setIsVisible] = useState(false);
  const {
    field: { value, onChange, onBlur },
  } = useController({ control, rules, name: controllerName, defaultValue: formatISO(new Date()) });

  return (
    <>
      {cloneElement(children, { onPress: () => setIsVisible(true) })}
      {isVisible ? (
        <DateTimePicker
          mode={mode}
          value={parseISO(value)}
          onChange={(event, value) => {
            setIsVisible(false);
            onChange(formatISO(value));
            onBlur();
          }}
        />
      ) : (
        <></>
      )}
    </>
  );
}

export { DateTimePickerHF };
