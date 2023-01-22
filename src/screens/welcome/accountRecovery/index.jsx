import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { TextInputHF } from "../../../components/hookForm/TextInputHF";
import { EMAIL_REGEX } from "../../../config/app.config";
import { Button, TextInput } from "react-native-paper";
import { sharedStyles } from "../../../shared/styles";
import { useTranslation } from "react-i18next";
import { Mail } from "iconoir-react-native";
import { useForm } from "react-hook-form";
import { Footer } from "../Footer";

function AccountRecovery({ navigation }) {
  const { control, handleSubmit } = useForm();
  const { t } = useTranslation();

  const onPressSendRecovery = data => {
    console.log(data);
    navigation.navigate("RecoveryCode");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.root}>
      <View style={styles.container}>
        <TextInputHF
          left={<TextInput.Icon icon={props => <Mail {...props} {...sharedStyles.iconoirM} />} />}
          placeholder={t("components.inputHookForm.emailPlaceholder")}
          rules={{
            required: t("components.inputHookForm.emailRequired"),
            pattern: {
              value: EMAIL_REGEX,
              message: t("components.inputHookForm.emailInvalid"),
            },
          }}
          label={t("components.inputHookForm.email")}
          style={sharedStyles.mv5}
          controllerName="email"
          control={control}
        />

        <Button
          onPress={handleSubmit(onPressSendRecovery)}
          style={sharedStyles.mv15}
          uppercase={false}
          mode="contained">
          {t("screens.accountRecovery.sendRecoveryCode")}
        </Button>
        <Footer
          onPressSignUp={() => navigation.navigate("SignUp")}
          onPressLogin={() => navigation.navigate("Login")}
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
    flex: 1,
    justifyContent: "center",
  },
});

export { AccountRecovery };
