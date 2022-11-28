import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { TextInputHF } from "../../../components/hookForm/TextInputHF";
import { LoginFooter } from "../../../components/LoginFooter";
import { EMAIL_REGEX } from "../../../config/app.config";
import { Button, TextInput } from "react-native-paper";
import { sharedStyles } from "../../../shared/styles";
import { useTranslation } from "react-i18next";
import { Mail } from "iconoir-react-native";
import { useForm } from "react-hook-form";

function AccountRecovery({ navigation }) {
  const { control, handleSubmit } = useForm();
  const { t } = useTranslation();

  const onPressSendRecovery = data => {
    console.log(data);
    navigation.navigate("RecoveryCode");
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.container}>
        <TextInputHF
          style={styles.inputText}
          rules={{
            required: t("components.inputHookForm.emailRequired"),
            pattern: {
              value: EMAIL_REGEX,
              message: t("components.inputHookForm.emailInvalid"),
            },
          }}
          label={t("components.inputHookForm.email")}
          control={control}
          controllerName="email"
          placeholder={t("components.inputHookForm.emailPlaceholder")}
          left={<TextInput.Icon name={props => <Mail {...props} {...sharedStyles.iconoirM} />} />}
        />

        <Button mode="contained" uppercase={false} onPress={handleSubmit(onPressSendRecovery)}>
          {t("screens.accountRecovery.sendRecoveryCode")}
        </Button>
        <LoginFooter
          onPressLogin={() => navigation.navigate("Login")}
          onPressSignUp={() => navigation.navigate("SignUp")}
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
  inputText: {
    marginVertical: 5,
  },
});

export { AccountRecovery };
