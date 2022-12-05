import { Button, Dialog, HelperText, Portal, TextInput } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { DateTimePickerHF } from "../../../components/hookForm/DateTimePickerHF";
import { GendersRadioButtons } from "../../../components/GendersRadioButtons";
import { EMAIL_REGEX, USERNAME_REGEX } from "../../../config/app.config";
import { TextInputHF } from "../../../components/hookForm/TextInputHF";
import { setSignUpForm } from "../../../redux/states/signUpForm";
import { LoginFooter } from "../../../components/LoginFooter";
import { ScrollView, StyleSheet, View } from "react-native";
import { InputChip } from "../../../components/InputChip";
import { useDispatch, useSelector } from "react-redux";
import { sharedStyles } from "../../../shared/styles";
import { parseISO, intlFormat } from "date-fns";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useState } from "react";
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
  const { language } = useSelector(state => state.languagePreference);
  const [isVisibleGenderRB, setIsVisibleGenderRB] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
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
      style={styles.scrollView}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
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
            left={<TextInput.Icon name={props => <Mail {...props} {...sharedStyles.iconoirM} />} />}
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
            left={<TextInput.Icon name={props => <User {...props} {...sharedStyles.iconoirM} />} />}
          />
          <TextInputHF
            control={control}
            style={sharedStyles.mv5}
            controllerName="password"
            secureTextEntry={isPasswordHidden}
            label={t("components.inputHookForm.password")}
            rules={{ required: t("components.inputHookForm.passwordRequired") }}
            left={
              <TextInput.Icon name={props => <KeyAlt {...props} {...sharedStyles.iconoirM} />} />
            }
            right={
              <TextInput.Icon
                onPress={() => setIsPasswordHidden(!isPasswordHidden)}
                name={props => {
                  return isPasswordHidden ? (
                    <EyeClose {...props} {...sharedStyles.iconoirM} />
                  ) : (
                    <EyeEmpty {...props} {...sharedStyles.iconoirM} />
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
                name={props => <KeyAltBack {...props} {...sharedStyles.iconoirM} />}
              />
            }
          />
          <InputChip
            value={t("components.inputHookForm.genderPlaceholder")}
            label={t("components.inputHookForm.gender")}
            onPress={() => setIsVisibleGenderRB(true)}
            style={sharedStyles.mv15}
            icon={PeopleRounded}
            mode="flat"
          />
          <Portal>
            <Dialog visible={isVisibleGenderRB} onDismiss={() => setIsVisibleGenderRB(false)}>
              {/* <Dialog.Icon icon={props => <EmojiBlinkRight {...props} {...sharedStyles.iconoirM} />} />*/}
              <Dialog.Title>{t("components.inputHookForm.gender")}</Dialog.Title>
              <Dialog.ScrollArea>
                <ScrollView>
                  <GendersRadioButtons control={control} controllerName="idGender" />
                </ScrollView>
              </Dialog.ScrollArea>
            </Dialog>
          </Portal>
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
