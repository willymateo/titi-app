import { setColorMode } from "../../../redux/states/colorMode";
import { useSelector, useDispatch } from "react-redux";
import { RadioButton } from "react-native-paper";
import { useTranslation } from "react-i18next";

function ThemeSettings() {
  const { t } = useTranslation("translation", { keyPrefix: "screens.themeSettings" });
  const { theme, isDark } = useSelector(state => state.colorMode);
  const dispatch = useDispatch();

  const colorModeHandler = selectedTheme =>
    dispatch(setColorMode({ theme: selectedTheme, isDark: !isDark }));

  return (
    <RadioButton.Group onValueChange={colorModeHandler} value={theme}>
      <RadioButton.Item label={t("light")} value="light" />
      <RadioButton.Item label={t("dark")} value="dark" />
    </RadioButton.Group>
  );
}

export { ThemeSettings };
