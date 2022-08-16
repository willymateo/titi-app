import { Button, Dialog, HelperText, Portal, RadioButton, TextInput } from "react-native-paper";
import { RadioButtonGroupHF } from "../../../components/hookForm/RadioButtonGroupHF";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { DateTimePickerHF } from "../../../components/hookForm/DateTimePickerHF";
import { EMAIL_REGEX, USERNAME_REGEX } from "../../../share/app.config";
import { TextInputHF } from "../../../components/hookForm/TextInputHF";
import { setSignUpForm } from "../../../redux/states/signUpForm";
import { LoginFooter } from "../../../components/LoginFooter";
import { ScrollView, StyleSheet, View } from "react-native";
import { InputChip } from "../../../components/InputChip";
import { parseISO, intlFormat } from "date-fns";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
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
  const [isVisibleGenreRB, setIsVisibleGenreRB] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const { control, handleSubmit, watch } = useForm();
  const idGenreSelected = watch("idGenre");
  const password = watch("password");
  const bornDate = watch("bornDate");
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onPressContinue = ({ username, password, email, bornDate, idGenre }) => {
    dispatch(
      setSignUpForm({
        username,
        password,
        email,
        profileInformation: {
          bornDate,
          idGenre,
        },
      })
    );
    navigation.navigate("SignUpPhone");
  };

  const genres = [
    { id: 1, genre: "not_specified" },
    { id: 2, genre: "male" },
    { id: 3, genre: "female" },
  ];

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
            label={t("components.inputHookForm.email")}
            control={control}
            controllerName="email"
            style={styles.inputText}
            left={<TextInput.Icon name={props => <Mail {...props} {...styles.iconoir} />} />}
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
            label={t("components.inputHookForm.username")}
            control={control}
            style={styles.inputText}
            controllerName="username"
            left={<TextInput.Icon name={props => <User {...props} {...styles.iconoir} />} />}
          />
          <TextInputHF
            label={t("components.inputHookForm.password")}
            control={control}
            style={styles.inputText}
            controllerName="password"
            secureTextEntry={isPasswordHidden}
            rules={{ required: t("components.inputHookForm.passwordRequired") }}
            left={<TextInput.Icon name={props => <KeyAlt {...props} {...styles.iconoir} />} />}
            right={
              <TextInput.Icon
                name={props => {
                  return isPasswordHidden ? (
                    <EyeClose {...props} {...styles.iconoir} />
                  ) : (
                    <EyeEmpty {...props} {...styles.iconoir} />
                  );
                }}
                onPress={() => setIsPasswordHidden(!isPasswordHidden)}
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
            label={t("components.inputHookForm.repeatPassword")}
            style={styles.inputText}
            controllerName="repeatPassword"
            left={<TextInput.Icon name={props => <KeyAltBack {...props} {...styles.iconoir} />} />}
          />

          <InputChip
            mode="flat"
            label={t("components.inputHookForm.genre")}
            icon={PeopleRounded}
            style={styles.inputChip}
            onPress={() => setIsVisibleGenreRB(true)}
            value={
              genres.filter(({ id }) => id === idGenreSelected).map(({ genre }) => genre)[0] ||
              t("components.inputHookForm.genrePlaceholder")
            }
          />
          <Portal>
            <Dialog visible={isVisibleGenreRB} onDismiss={() => setIsVisibleGenreRB(false)}>
              {/* <Dialog.Icon icon={props => <EmojiBlinkRight {...props} {...styles.iconoir} />} />*/}
              <Dialog.Title>{t("components.inputHookForm.genre")}</Dialog.Title>
              <Dialog.ScrollArea>
                <ScrollView>
                  <RadioButtonGroupHF
                    control={control}
                    controllerName="idGenre"
                    rules={{ required: t("components.inputHookForm.genreRequired") }}>
                    {genres.map(({ id, genre }) => (
                      <RadioButton.Item label={genre} value={id} key={id} />
                    ))}
                  </RadioButtonGroupHF>
                </ScrollView>
              </Dialog.ScrollArea>
            </Dialog>
          </Portal>
          <View style={styles.inputChip}>
            <DateTimePickerHF control={control} controllerName="bornDate" mode="date">
              <InputChip
                mode="flat"
                icon={Calendar}
                label={t("components.inputHookForm.bornDate")}
                value={bornDate ? bornDate : t("components.inputHookForm.bornDatePlaceholder")}
              />
            </DateTimePickerHF>
            <HelperText>This is to confirm your legal of age</HelperText>
          </View>
        </View>

        <View>
          <Button mode="contained" uppercase={false} onPress={handleSubmit(onPressContinue)}>
            {t("screens.signUp.continue")}
          </Button>
          <LoginFooter
            onPressLogin={() => navigation.navigate("Login")}
            onPressAccountRecovery={() => navigation.navigate("AccountRecovery")}
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
  inputText: {
    marginVertical: 5,
  },
  iconoir: {
    height: 25,
    width: 25,
  },
  inputChip: {
    marginVertical: 12,
  },
});

export { SignUp };
