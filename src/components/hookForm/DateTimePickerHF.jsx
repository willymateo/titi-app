import DateTimePicker from "@react-native-community/datetimepicker";
import { formatISO, parseISO } from "date-fns";
import { cloneElement, useState } from "react";
import { Controller } from "react-hook-form";

function DateTimePickerHF({ control, controllerName, mode, children }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      {cloneElement(children, { onPress: () => setIsVisible(true) })}
      <Controller
        control={control}
        name={controllerName}
        defaultValue={formatISO(new Date())}
        render={({ field: { value, onChange, onBlur } }) => {
          return isVisible ? (
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
          );
        }}
      />
    </>
  );
}

export { DateTimePickerHF };
