import { Button, Dialog, HelperText, Portal, RadioButton, TextInput } from "react-native-paper";
import { RadioButtonGroupHF } from "../../../components/hookForm/RadioButtonGroupHF";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { DateTimePickerHF } from "../../../components/hookForm/DateTimePickerHF";
import { EMAIL_REGEX, USERNAME_REGEX } from "../../../share/app.config";
import { TextInputHF } from "../../../components/hookForm/TextInputHF";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { setSignUpForm } from "../../../redux/states/signUpForm";
import { LoginFooter } from "../../../components/LoginFooter";
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
  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(errors);
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
            control={control}
            controllerName="email"
            style={styles.inputText}
            label={t("components.inputHookForm.email")}
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
            control={control}
            style={styles.inputText}
            controllerName="username"
            label={t("components.inputHookForm.username")}
            left={<TextInput.Icon name={props => <User {...props} {...styles.iconoir} />} />}
          />
          <TextInputHF
            control={control}
            style={styles.inputText}
            controllerName="password"
            secureTextEntry={isPasswordHidden}
            label={t("components.inputHookForm.password")}
            rules={{ required: t("components.inputHookForm.passwordRequired") }}
            left={<TextInput.Icon name={props => <KeyAlt {...props} {...styles.iconoir} />} />}
            right={
              <TextInput.Icon
                onPress={() => setIsPasswordHidden(!isPasswordHidden)}
                name={props => {
                  return isPasswordHidden ? (
                    <EyeClose {...props} {...styles.iconoir} />
                  ) : (
                    <EyeEmpty {...props} {...styles.iconoir} />
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
            style={styles.inputText}
            controllerName="repeatPassword"
            label={t("components.inputHookForm.repeatPassword")}
            left={<TextInput.Icon name={props => <KeyAltBack {...props} {...styles.iconoir} />} />}
          />
          <InputChip
            value={
              genres.filter(({ id }) => id === idGenreSelected).map(({ genre }) => genre)[0] ||
              t("components.inputHookForm.genrePlaceholder")
            }
            label={t("components.inputHookForm.genre")}
            onPress={() => setIsVisibleGenreRB(true)}
            style={styles.inputChip}
            icon={PeopleRounded}
            mode="flat"
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
                      <RadioButton.Item
                        mode={Platform.OS === "ios" ? "ios" : "android"}
                        label={genre}
                        value={id}
                        key={id}
                      />
                    ))}
                  </RadioButtonGroupHF>
                </ScrollView>
              </Dialog.ScrollArea>
            </Dialog>
          </Portal>
          <View style={styles.inputChip}>
            <DateTimePickerHF control={control} controllerName="bornDate" mode="date">
              <InputChip
                value={bornDate ? bornDate : t("components.inputHookForm.bornDatePlaceholder")}
                label={t("components.inputHookForm.bornDate")}
                icon={Calendar}
                mode="flat"
              />
            </DateTimePickerHF>
            <HelperText>{t("components.inputHookForm.bornDateHelperText")}</HelperText>
          </View>
        </View>

        <View>
          <Button mode="contained" uppercase={false} onPress={handleSubmit(onPressContinue)}>
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
