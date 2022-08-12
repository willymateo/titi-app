import { RadioButton } from "react-native-paper";
import { useTranslation } from "react-i18next";

function LanguageSettings() {
  const { t } = useTranslation("translation", { keyPrefix: "screens.languageSettings" });
  const languageHandler = newLanguage => {
    console.log("Language changed", newLanguage);
  };

  return (
    <RadioButton.Group onValueChange={languageHandler} value="en">
      <RadioButton.Item label={t("english")} value="en" />
      <RadioButton.Item label={t("spanish")} value="es" />
    </RadioButton.Group>
  );
}

export { LanguageSettings };
