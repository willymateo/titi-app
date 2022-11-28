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
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.container}>
        <TextInputHF
          style={styles.inputText}
          rules={{ required: t("components.inputHookForm.passwordRequired") }}
          secureTextEntry={isPasswordHidden}
          label={t("components.inputHookForm.password")}
          control={control}
          controllerName="password"
          left={<TextInput.Icon name={props => <KeyAlt {...props} {...sharedStyles.iconoirM} />} />}
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
        />
        <TextInputHF
          style={styles.inputText}
          rules={{
            required: t("components.inputHookForm.passwordRequired"),
            validate: value => value === password || t("components.inputHookForm.passwordMatch"),
          }}
          secureTextEntry
          label={t("components.inputHookForm.repeatPassword")}
          control={control}
          controllerName="repeatPassword"
          left={
            <TextInput.Icon name={props => <KeyAltBack {...props} {...sharedStyles.iconoirM} />} />
          }
        />

        <Button mode="contained" uppercase={false} onPress={handleSubmit(onPressSignUp)}>
          {t("screens.accountRecovery.resetPassword")}
        </Button>
        <LoginFooter
          onPressLogin={() => navigation.navigate("Login")}
          onPressAccountRecovery={() => navigation.navigate("AccountRecovery")}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
  },
  inputText: {
    marginVertical: 5,
  },
});

export { ResetPassword };
