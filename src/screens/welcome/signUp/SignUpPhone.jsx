import { TextInputHF } from "../../../components/hookForm/TextInputHF";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { setUserSession } from "../../../redux/states/userSession";
import { LoginFooter } from "../../../components/LoginFooter";
import catHotAPI from "../../../services/catHotAPI/api";
import { SmartphoneDevice } from "iconoir-react-native";
import { Button, TextInput } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

function SignUpPhone({ navigation, route }) {
  const { control, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const onPressSignUp = async data => {
    try {
      const { token, error } = await catHotAPI.createUser({ ...data, ...route.params });
      if (error) {
        console.log("Show modal of error message", error);
        return;
      }
      dispatch(setUserSession({ token }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={{ ...styles.container }}>
        <TextInputHF
          style={styles.inputText}
          rules={{
            required: t("components.inputHookForm.phoneNumberRequired"),
          }}
          label={t("components.inputHookForm.phoneNumber")}
          control={control}
          controllerName="phoneNumber"
          left={
            <TextInput.Icon name={props => <SmartphoneDevice {...props} {...styles.iconoir} />} />
          }
        />

        <Button mode="contained" uppercase={false} onPress={handleSubmit(onPressSignUp)}>
          {t("screens.welcome.signUp")}
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
  iconoir: {
    height: 25,
    width: 25,
  },
});

export { SignUpPhone };
