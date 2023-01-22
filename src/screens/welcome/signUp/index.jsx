import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { DateTimePickerHF } from "../../../components/hookForm/DateTimePickerHF";
import { RepeatPasswordHF } from "../../../components/hookForm/RepeatPasswordHF";
import { GendersRadioButton } from "../../../components/GendersRadioButton";
import { EMAIL_REGEX, USERNAME_REGEX } from "../../../config/app.config";
import { Calendar, Mail, PeopleTag, AtSign } from "iconoir-react-native";
import { TextInputHF } from "../../../components/hookForm/TextInputHF";
import { Button, HelperText, TextInput } from "react-native-paper";
import { setSignUpForm } from "../../../redux/states/signUpForm";
import { InputChip } from "../../../components/InputChip";
import { useVisible } from "../../../hooks/useVisible";
import { useDispatch, useSelector } from "react-redux";
import { sharedStyles } from "../../../shared/styles";
import { parseISO, intlFormat } from "date-fns";
import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { Footer } from "../Footer";

function SignUp({ navigation }) {
  const { isVisible: isVisibleGenderRB, show: showGenderRB, hide: hideGenderRB } = useVisible();
  const { language } = useSelector(state => state.languagePreference);
  const { watch, control, handleSubmit } = useForm();
  const idGenderSelected = watch("idGender");
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
      style={sharedStyles.flx}>
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
            left={
              <TextInput.Icon icon={props => <AtSign {...props} {...sharedStyles.iconoirM} />} />
            }
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

          <RepeatPasswordHF control={control} watch={watch} />

          <InputChip
            value={t("components.inputHookForm.genderPlaceholder")}
            label={t("components.inputHookForm.gender")}
            style={sharedStyles.mv15}
            onPress={showGenderRB}
            icon={PeopleTag}
            mode="flat"
          />
          <GendersRadioButton
            isVisible={isVisibleGenderRB}
            controllerName="idGender"
            hide={hideGenderRB}
            control={control}
          />

          <View style={sharedStyles.mt15}>
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
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flexGrow: 1,
  },
});

export { SignUp };
