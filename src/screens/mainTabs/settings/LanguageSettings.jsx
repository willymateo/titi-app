import { setLanguagePreference } from "../../../redux/states/languagePreference";
import { MMKV_LNG, storage } from "../../../config/app.config";
import { useSelector, useDispatch } from "react-redux";
import { RadioButton } from "react-native-paper";
import { useTranslation } from "react-i18next";

function LanguageSettings() {
  const { t, i18n } = useTranslation("translation", { keyPrefix: "screens.languageSettings" });
  const { language } = useSelector(state => state.languagePreference);
  const dispatch = useDispatch();

  const languageHandler = value => {
    i18n.changeLanguage(value);
    storage.set(MMKV_LNG, value);
    dispatch(setLanguagePreference({ language: value }));
  };

  return (
    <RadioButton.Group onValueChange={languageHandler} value={language}>
      <RadioButton.Item label={t("english")} value="en" />
      <RadioButton.Item label={t("spanish")} value="es" />
    </RadioButton.Group>
  );
}

export { LanguageSettings };
