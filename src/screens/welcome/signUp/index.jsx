import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { DateTimePickerHF } from "../../../components/hookForm/DateTimePickerHF";
import { GendersRadioButton } from "../../../components/GendersRadioButton";
import { EMAIL_REGEX, USERNAME_REGEX } from "../../../config/app.config";
import { TextInputHF } from "../../../components/hookForm/TextInputHF";
import { Button, HelperText, TextInput } from "react-native-paper";
import { setSignUpForm } from "../../../redux/states/signUpForm";
import { LoginFooter } from "../../../components/LoginFooter";
import { InputChip } from "../../../components/InputChip";
import { useVisible } from "../../../hooks/useVisible";
import { useDispatch, useSelector } from "react-redux";
import { sharedStyles } from "../../../shared/styles";
import { parseISO, intlFormat } from "date-fns";
import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import {
  Mail,
  User,
  KeyAlt,
  EyeClose,
  Calendar,
  EyeEmpty,
  KeyAltBack,
  PeopleRounded,
} from "iconoir-react-native";

function SignUp({ navigation }) {
  const { isVisible: isVisibleGenderRB, show: showGenderRB, hide: hideGenderRB } = useVisible();
  const { isVisible: isVisiblePassword, toggle: togglePasswordVisible } = useVisible();
  const { language } = useSelector(state => state.languagePreference);
  const { watch, control, handleSubmit } = useForm();
  const idGenderSelected = watch("idGender");
  const password = watch("password");
  const bornDate = watch("bornDate");
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handlePressContinue = ({ username, password, email, bornDate, idGender }) => {
    dispatch(
      setSignUpForm({
        username,
        password,
        bornDate,
        idGender,
        email,
      })
    );

    navigation.navigate("SignUpPhone");
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      style={styles.scrollView}>
      <View>
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
            left={<TextInput.Icon icon={props => <User {...props} {...sharedStyles.iconoirM} />} />}
            rules={{
              required: t("components.inputHookForm.usernameRequired"),
              minLength: {
                message: t("components.inputHookForm.usernameMinLength"),
                value: 5,
              },
              maxLength: {
                message: t("components.inputHookForm.usernameMaxLength"),
                value: 30,
              },
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

          <TextInputHF
            left={
              <TextInput.Icon icon={props => <KeyAlt {...props} {...sharedStyles.iconoirM} />} />
            }
            rules={{ required: t("components.inputHookForm.passwordRequired") }}
            right={
              <TextInput.Icon
                icon={props => {
                  return isVisiblePassword ? (
                    <EyeEmpty {...props} {...sharedStyles.iconoirM} />
                  ) : (
                    <EyeClose {...props} {...sharedStyles.iconoirM} />
                  );
                }}
                onPress={togglePasswordVisible}
              />
            }
            label={t("components.inputHookForm.password")}
            secureTextEntry={!isVisiblePassword}
            controllerName="password"
            style={sharedStyles.mv5}
            control={control}
          />

          <TextInputHF
            rules={{
              validate: value => value === password || t("components.inputHookForm.passwordMatch"),
              required: t("components.inputHookForm.passwordRequired"),
            }}
            left={
              <TextInput.Icon
                icon={props => <KeyAltBack {...props} {...sharedStyles.iconoirM} />}
              />
            }
            label={t("components.inputHookForm.repeatPassword")}
            controllerName="repeatPassword"
            style={sharedStyles.mv5}
            control={control}
            secureTextEntry
          />

          <InputChip
            value={t("components.inputHookForm.genderPlaceholder")}
            label={t("components.inputHookForm.gender")}
            style={sharedStyles.mv15}
            onPress={showGenderRB}
            icon={PeopleRounded}
            mode="flat"
          />
          <GendersRadioButton
            isVisible={isVisibleGenderRB}
            controllerName="idGender"
            hide={hideGenderRB}
            control={control}
          />

          <View style={sharedStyles.mv15}>
            <DateTimePickerHF control={control} controllerName="bornDate" mode="date">
              <InputChip
                value={
                  bornDate
                    ? intlFormat(
                        parseISO(bornDate),
                        {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                        { locale: language }
                      )
                    : t("components.inputHookForm.bornDatePlaceholder")
                }
                label={t("components.inputHookForm.bornDate")}
                icon={Calendar}
                mode="flat"
              />
            </DateTimePickerHF>
            <HelperText>{t("components.inputHookForm.bornDateHelperText")}</HelperText>
          </View>
        </View>

        <View>
          <Button mode="contained" uppercase={false} onPress={handleSubmit(handlePressContinue)}>
            {t("screens.signUp.continue")}
          </Button>
          <LoginFooter
            onPressAccountRecovery={() => navigation.navigate("AccountRecovery")}
            onPressLogin={() => navigation.navigate("Login")}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
  },
});

export { SignUp };
