import { KeyAlt, EyeClose, EyeEmpty, KeyAltBack } from "iconoir-react-native";
import { TextInputHF } from "../../../components/hookForm/TextInputHF";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { LoginFooter } from "../../../components/LoginFooter";
import { Button, TextInput } from "react-native-paper";
import { sharedStyles } from "../../../shared/styles";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useState } from "react";

function ResetPassword({ navigation }) {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const { control, handleSubmit, watch } = useForm();
  const password = watch("password");
  const { t } = useTranslation();

  const onPressSignUp = async data => {
    console.log(data);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={sharedStyles.flx}>
      <View style={styles.container}>
        <TextInputHF
          left={<TextInput.Icon icon={props => <KeyAlt {...props} {...sharedStyles.iconoirM} />} />}
          rules={{ required: t("components.inputHookForm.passwordRequired") }}
          right={
            <TextInput.Icon
              name={props => {
                return isPasswordHidden ? (
                  <EyeEmpty {...props} {...sharedStyles.iconoirM} />
                ) : (
                  <EyeClose {...props} {...sharedStyles.iconoirM} />
                );
              }}
              onPress={() => setIsPasswordHidden(!isPasswordHidden)}
            />
          }
          label={t("components.inputHookForm.password")}
          secureTextEntry={isPasswordHidden}
          controllerName="password"
          style={sharedStyles.mv5}
          control={control}
        />
        <TextInputHF
          left={
            <TextInput.Icon icon={props => <KeyAltBack {...props} {...sharedStyles.iconoirM} />} />
          }
          rules={{
            validate: value => value === password || t("components.inputHookForm.passwordMatch"),
            required: t("components.inputHookForm.passwordRequired"),
          }}
          label={t("components.inputHookForm.repeatPassword")}
          controllerName="repeatPassword"
          style={sharedStyles.mv5}
          control={control}
          secureTextEntry
        />

        <Button mode="contained" uppercase={false} onPress={handleSubmit(onPressSignUp)}>
          {t("screens.accountRecovery.resetPassword")}
        </Button>
        <LoginFooter
          onPressAccountRecovery={() => navigation.navigate("AccountRecovery")}
          onPressLogin={() => navigation.navigate("Login")}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
  },
});

export { ResetPassword };
