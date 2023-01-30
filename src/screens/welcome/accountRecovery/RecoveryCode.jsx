import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { TextInputHF } from "../../../components/hookForm/TextInputHF";
import { Button, TextInput } from "react-native-paper";
import { PasswordCursor } from "iconoir-react-native";
import { sharedStyles } from "../../../shared/styles";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { Footer } from "../Footer";

function RecoveryCode({ navigation }) {
  const { control, handleSubmit } = useForm();
  const { t } = useTranslation();

  const verifyRecoveryCode = data => {
    console.log(data);
    navigation.navigate("ResetPassword");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={sharedStyles.flx}>
      <View style={styles.container}>
        <TextInputHF
          left={
            <TextInput.Icon
              icon={props => <PasswordCursor {...props} {...sharedStyles.iconoirM} />}
            />
          }
          rules={{ required: t("components.inputHookForm.recoveryCodeRequired") }}
          label={t("components.inputHookForm.recoveryCode")}
          controllerName="recoveryCode"
          style={sharedStyles.mv5}
          control={control}
        />

        <Button
          onPress={handleSubmit(verifyRecoveryCode)}
          style={sharedStyles.mv15}
          uppercase={false}
          mode="contained">
          {t("screens.accountRecovery.verifyRecoveryCode")}
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
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export { RecoveryCode };
