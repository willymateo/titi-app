import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { TextInputHF } from "../../../components/hookForm/TextInputHF";
import { LoginFooter } from "../../../components/LoginFooter";
import { Button, TextInput } from "react-native-paper";
import { PasswordCursor } from "iconoir-react-native";
import { sharedStyles } from "../../../shared/styles";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

function RecoveryCode({ navigation }) {
  const { control, handleSubmit } = useForm();
  const { t } = useTranslation();

  const onPressSendRecovery = data => {
    console.log(data);
    navigation.navigate("ResetPassword");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.root}>
      <View style={styles.container}>
        <TextInputHF
          left={
            <TextInput.Icon
              name={props => <PasswordCursor {...props} {...sharedStyles.iconoirM} />}
            />
          }
          rules={{
            required: t("components.inputHookForm.recoveryCodeRequired"),
          }}
          label={t("components.inputHookForm.recoveryCode")}
          controllerName="recoveryCode"
          style={sharedStyles.mv5}
          control={control}
        />

        <Button mode="contained" uppercase={false} onPress={handleSubmit(onPressSendRecovery)}>
          {t("screens.accountRecovery.verifyRecoveryCode")}
        </Button>
        <LoginFooter
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

export { RecoveryCode };
