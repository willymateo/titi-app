import { setColorMode } from "../../redux/states/colorMode";
import { useSelector, useDispatch } from "react-redux";
import { RadioButton } from "react-native-paper";

function ThemeSettings() {
  const { theme, isDark } = useSelector(state => state.colorMode);
  const dispatch = useDispatch();

  const colorModeHandler = selectedTheme =>
    dispatch(setColorMode({ theme: selectedTheme, isDark: !isDark }));

  return (
    <RadioButton.Group onValueChange={colorModeHandler} value={theme}>
      <RadioButton.Item label="Light" value="light" />
      <RadioButton.Item label="Dark" value="dark" />
    </RadioButton.Group>
  );
}

export { ThemeSettings };
