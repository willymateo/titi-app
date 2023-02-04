import { EyeClose, EyeEmpty, KeyAlt, KeyAltBack } from "iconoir-react-native";
import { PASSWORD_MIN_LENGTH } from "../../config/app.config";
import { useVisible } from "../../hooks/useVisible";
import { sharedStyles } from "../../shared/styles";
import { TextInput } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { TextInputHF } from "./TextInputHF";

function RepeatPasswordHF({ control, watch }) {
  const { t } = useTranslation("translation", { keyPrefix: "components.inputHookForm" });
  const { isVisible: isPasswordVisible, toggle: togglePasswordHidden } = useVisible();
  const password = watch("password");

  return (
    <>
      <TextInputHF
        left={<TextInput.Icon icon={props => <KeyAlt {...props} {...sharedStyles.iconoirM} />} />}
        right={
          <TextInput.Icon
            icon={props => {
              return isPasswordVisible ? (
                <EyeEmpty {...props} {...sharedStyles.iconoirM} />
              ) : (
                <EyeClose {...props} {...sharedStyles.iconoirM} />
              );
            }}
            onPress={togglePasswordHidden}
          />
        }
        rules={{
          minLength: { value: PASSWORD_MIN_LENGTH, message: t("passwordMinLength") },
          required: t("passwordRequired"),
        }}
        secureTextEntry={!isPasswordVisible}
        controllerName="password"
        style={sharedStyles.mv5}
        label={t("password")}
        control={control}
      />

      <TextInputHF
        left={
          <TextInput.Icon icon={props => <KeyAltBack {...props} {...sharedStyles.iconoirM} />} />
        }
        rules={{
          validate: value => value === password || t("passwordMatch"),
          required: t("passwordRequired"),
        }}
        controllerName="repeatPassword"
        label={t("repeatPassword")}
        style={sharedStyles.mv5}
        control={control}
        secureTextEntry
      />
    </>
  );
}

export { RepeatPasswordHF };
