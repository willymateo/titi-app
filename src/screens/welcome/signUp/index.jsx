import { resetUserSession, setUserSession } from "../../../redux/states/userSession";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { DateTimePickerHF } from "../../../components/hookForm/DateTimePickerHF";
import { RepeatPasswordHF } from "../../../components/hookForm/RepeatPasswordHF";
import { GendersInputHF } from "../../../components/hookForm/GendersInputHF";
import { TextInputHF } from "../../../components/hookForm/TextInputHF";
import { Button, TextInput } from "react-native-paper";
import { sharedStyles } from "../../../shared/styles";
import { Mail, AtSign } from "iconoir-react-native";
import { isOfLegalAge } from "../../../shared";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { Footer } from "../Footer";
import { useEffect } from "react";
import {
  EMAIL_REGEX,
  USERNAME_REGEX,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from "../../../config/app.config";

function SignUp({ navigation }) {
  const { watch, control, handleSubmit } = useForm();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetUserSession());
  }, []);

  const handlePressContinue = ({ username, password, email, bornDate, idGender }) => {
    dispatch(
      setUserSession({
        username,
        password,
        bornDate,
        idGender,
        email,
      })
    );

    navigation.navigate("Location");
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={sharedStyles.flxGrow1}
      showsVerticalScrollIndicator={false}
      style={sharedStyles.flx}>
      <View>
        <TextInputHF
          left={<TextInput.Icon icon={props => <Mail {...props} {...sharedStyles.iconoirM} />} />}
          rules={{
            required: t("components.inputHookForm.emailRequired"),
            pattern: {
              message: t("components.inputHookForm.emailInvalid"),
              value: EMAIL_REGEX,
            },
          }}
          label={t("components.inputHookForm.email")}
          style={sharedStyles.mv5}
          controllerName="email"
          control={control}
        />

        <TextInputHF
          left={<TextInput.Icon icon={props => <AtSign {...props} {...sharedStyles.iconoirM} />} />}
          rules={{
            minLength: {
              message: t("components.inputHookForm.usernameMinLength"),
              value: USERNAME_MIN_LENGTH,
            },
            maxLength: {
              message: t("components.inputHookForm.usernameMaxLength"),
              value: USERNAME_MAX_LENGTH,
            },
            required: t("components.inputHookForm.usernameRequired"),
            pattern: {
              message: t("components.inputHookForm.usernameRegex"),
              value: USERNAME_REGEX,
            },
          }}
          label={t("components.inputHookForm.username")}
          controllerName="username"
          style={sharedStyles.mv5}
          control={control}
        />

        <RepeatPasswordHF control={control} watch={watch} />

        <GendersInputHF
          rules={{ required: t("components.inputHookForm.genderRequired") }}
          controllerName="idGender"
          style={sharedStyles.mv15}
          control={control}
          watch={watch}
        />

        <DateTimePickerHF
          rules={{
            required: t("components.inputHookForm.bornDateRequired"),
            validate: isOfLegalAge,
          }}
          placeholder={t("components.inputHookForm.bornDatePlaceholder")}
          helperText={t("components.inputHookForm.bornDateHelperText")}
          label={t("components.inputHookForm.bornDate")}
          controllerName="bornDate"
          control={control}
          watch={watch}
        />
      </View>

      <View>
        <Button
          onPress={handleSubmit(handlePressContinue)}
          style={sharedStyles.mv15}
          uppercase={false}
          mode="contained">
          {t("screens.signUp.continue")}
        </Button>
        <Footer
          onPressAccountRecovery={() => navigation.navigate("AccountRecovery")}
          onPressLogin={() => navigation.navigate("Login")}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}

export { SignUp };
