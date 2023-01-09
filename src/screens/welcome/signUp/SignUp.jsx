import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { DateTimePickerHF } from "../../../components/hookForm/DateTimePickerHF";
import { GendersRadioButtons } from "../../../components/GendersRadioButtons";
import { EMAIL_REGEX, USERNAME_REGEX } from "../../../config/app.config";
import { TextInputHF } from "../../../components/hookForm/TextInputHF";
import { Button, HelperText, TextInput } from "react-native-paper";
import { setSignUpForm } from "../../../redux/states/signUpForm";
import { LoginFooter } from "../../../components/LoginFooter";
import { useIsVisible } from "../../../hooks/useIsVisible";
import { InputChip } from "../../../components/InputChip";
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
  const { isVisible: isVisibleGenderRB, show: showGenderRB, hide: hideGenderRB } = useIsVisible();
  const { isVisible: isVisiblePassword, toggle: togglePasswordVisible } = useIsVisible();
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
            rules={{
              required: t("components.inputHookForm.emailRequired"),
              pattern: {
                value: EMAIL_REGEX,
                message: t("components.inputHookForm.emailInvalid"),
              },
            }}
            control={control}
            controllerName="email"
            style={sharedStyles.mv5}
            label={t("components.inputHookForm.email")}
            left={<TextInput.Icon icon={props => <Mail {...props} {...sharedStyles.iconoirM} />} />}
          />

          <TextInputHF
            rules={{
              required: t("components.inputHookForm.usernameRequired"),
              minLength: {
                value: 5,
                message: t("components.inputHookForm.usernameMinLength"),
              },
              maxLength: {
                value: 30,
                message: t("components.inputHookForm.usernameMaxLength"),
              },
              pattern: {
                value: USERNAME_REGEX,
                message: t("components.inputHookForm.usernameRegex"),
              },
            }}
            control={control}
            style={sharedStyles.mv5}
            controllerName="username"
            label={t("components.inputHookForm.username")}
            left={<TextInput.Icon icon={props => <User {...props} {...sharedStyles.iconoirM} />} />}
          />

          <TextInputHF
            control={control}
            style={sharedStyles.mv5}
            controllerName="password"
            secureTextEntry={!isVisiblePassword}
            label={t("components.inputHookForm.password")}
            rules={{ required: t("components.inputHookForm.passwordRequired") }}
            left={
              <TextInput.Icon icon={props => <KeyAlt {...props} {...sharedStyles.iconoirM} />} />
            }
            right={
              <TextInput.Icon
                onPress={togglePasswordVisible}
                icon={props => {
                  return isVisiblePassword ? (
                    <EyeEmpty {...props} {...sharedStyles.iconoirM} />
                  ) : (
                    <EyeClose {...props} {...sharedStyles.iconoirM} />
                  );
                }}
              />
            }
          />

          <TextInputHF
            rules={{
              required: t("components.inputHookForm.passwordRequired"),
              validate: value => value === password || t("components.inputHookForm.passwordMatch"),
            }}
            secureTextEntry
            control={control}
            style={sharedStyles.mv5}
            controllerName="repeatPassword"
            label={t("components.inputHookForm.repeatPassword")}
            left={
              <TextInput.Icon
                icon={props => <KeyAltBack {...props} {...sharedStyles.iconoirM} />}
              />
            }
          />

          <InputChip
            value={t("components.inputHookForm.genderPlaceholder")}
            label={t("components.inputHookForm.gender")}
            style={sharedStyles.mv15}
            onPress={showGenderRB}
            icon={PeopleRounded}
            mode="flat"
          />
          <GendersRadioButtons
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
