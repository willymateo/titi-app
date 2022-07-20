import { RadioButton } from "react-native-paper";

function LanguageSettings() {
  const languageHandler = newLanguage => {
    console.log("Language changed", newLanguage);
  };

  return (
    <RadioButton.Group onValueChange={languageHandler} value="en">
      <RadioButton.Item label="English" value="en" />
      <RadioButton.Item label="Spanish" value="es" />
    </RadioButton.Group>
  );
}

export { LanguageSettings };
