import { EyeClose, EyeEmpty, KeyAlt, KeyAltBack } from "iconoir-react-native";
import { TextInputHF } from "../../../components/hookForm/TextInputHF";
import { useIsVisible } from "../../../hooks/useIsVisible";
import { sharedStyles } from "../../../shared/styles";
import { TextInput } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

function ChangePassword() {
  const { isVisible: isPasswordVisible, toggleIsVisible: togglePasswordHidden } = useIsVisible();
  const { t } = useTranslation("translation", { keyPrefix: "components.inputHookForm" });
  const { control } = useForm();

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
        rules={{ required: t("passwordRequired") }}
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
          required: t("passwordRequired"),
          validate: value => value === password || t("passwordMatch"),
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

export { ChangePassword };
