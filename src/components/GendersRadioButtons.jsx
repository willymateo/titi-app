import { RadioButtonGroupHF } from "./hookForm/RadioButtonGroupHF";
import { ActivityIndicator, Text } from "react-native-paper";
import { useGenders } from "../services/app/genders";
import { useTranslation } from "react-i18next";

function GendersRadioButtons({ control, controllerName }) {
  const { t } = useTranslation("translation", { keyPrefix: "components.inputHookForm" });
  const { data: genders, error, isValidating } = useGenders();

  if (isValidating) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <RadioButtonGroupHF
      control={control}
      controllerName={controllerName}
      items={genders ? genders.map(({ id, gender }) => ({ id, value: gender })) : []}
      rules={{ required: t("genderRequired") }}
    />
  );
}

export { GendersRadioButtons };
