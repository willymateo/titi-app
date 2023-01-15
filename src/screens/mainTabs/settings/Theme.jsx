import { MMKV_IS_DARK, MMKV_THEME, storage } from "../../../config/app.config";
import { setColorMode } from "../../../redux/states/colorMode";
import { useDispatch, useSelector } from "react-redux";
import { RadioButton } from "react-native-paper";
import { useTranslation } from "react-i18next";

function Theme() {
  const { t } = useTranslation("translation", { keyPrefix: "screens.themeSettings" });
  const { theme } = useSelector(state => state.colorMode);
  const dispatch = useDispatch();

  const colorModeHandler = value => {
    const isDark = value === "dark";
    storage.set(MMKV_THEME, value);
    storage.set(MMKV_IS_DARK, isDark);
    dispatch(setColorMode({ theme: value, isDark }));
  };

  return (
    <RadioButton.Group onValueChange={colorModeHandler} value={theme}>
      <RadioButton.Item label={t("light")} value="light" />
      <RadioButton.Item label={t("dark")} value="dark" />
    </RadioButton.Group>
  );
}

export { Theme };
