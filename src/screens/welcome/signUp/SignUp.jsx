import { RadioButtonGroupHF } from "../../../components/hookForm/RadioButtonGroupHF";
import { Button, Dialog, Portal, RadioButton, TextInput } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { DateTimePickerHF } from "../../../components/hookForm/DateTimePickerHF";
import { EMAIL_REGEX, USERNAME_REGEX } from "../../../share/app.config";
import { TextInputHF } from "../../../components/hookForm/TextInputHF";
import { LoginFooter } from "../../../components/LoginFooter";
import { ScrollView, StyleSheet, View } from "react-native";
import { InputChip } from "../../../components/InputChip";
import { intlFormat, parseISO } from "date-fns";
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
  const onPressContinue = data => navigation.navigate("SignUpPhone", data);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const { control, handleSubmit, watch } = useForm();
  const password = watch("password");

  const [visibleDialog, setVisibleDialog] = useState(false);
  const idGenreSelected = watch("idGenre");
  const genres = [
    { id: 1, genre: "not_specified" },
    { id: 2, genre: "male" },
    { id: 3, genre: "female" },
  ];

  const bornDate = watch("bornDate");
  console.log("begin signup");
  console.log(bornDate);
  console.log("end signup");

  return (
    <KeyboardAwareScrollView
      style={styles.scrollView}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      <View>
        <View>
          <TextInputHF
            rules={{
              required: "Email is required",
              pattern: {
                value: EMAIL_REGEX,
                message: "Email is invalid",
              },
            }}
            label="Email"
            control={control}
            controllerName="email"
            style={styles.inputText}
            left={<TextInput.Icon name={props => <Mail {...props} {...styles.iconoir} />} />}
          />
          <TextInputHF
            rules={{
              required: "Username is required",
              minLength: {
                value: 5,
                message: "Username should be minimum 5 characters long",
              },
              maxLength: {
                value: 30,
                message: "Username should be maximum 30 characters long",
              },
              pattern: {
                value: USERNAME_REGEX,
                message: `Username should be in lowercase.
The only allowed special characters are '_' and '.'`,
              },
            }}
            label="Username"
            control={control}
            style={styles.inputText}
            controllerName="username"
            left={<TextInput.Icon name={props => <User {...props} {...styles.iconoir} />} />}
          />
          <TextInputHF
            label="Password"
            control={control}
            style={styles.inputText}
            controllerName="password"
            secureTextEntry={isPasswordHidden}
            rules={{ required: "Password is required" }}
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
              required: "Password is required",
              validate: value => value === password || "Password do not match",
            }}
            secureTextEntry
            control={control}
            label="Repeat password"
            style={styles.inputText}
            controllerName="repeatPassword"
            left={<TextInput.Icon name={props => <KeyAltBack {...props} {...styles.iconoir} />} />}
          />

          <DateTimePickerHF control={control} controllerName="bornDate" mode="date">
            <InputChip
              mode="flat"
              icon={Calendar}
              label="Born date"
              style={styles.inputChip}
              value={bornDate ? parseISO(bornDate).toLocaleString() : "Select your born date"}
            />
          </DateTimePickerHF>

          <InputChip
            mode="flat"
            label="Genre"
            icon={PeopleRounded}
            style={styles.inputChip}
            onPress={() => setVisibleDialog(true)}
            value={
              genres.filter(({ id }) => id === idGenreSelected).map(({ genre }) => genre)[0] ||
              "Select your genre"
            }
          />
          <Portal>
            <Dialog visible={visibleDialog} onDismiss={() => setVisibleDialog(false)}>
              {/* <Dialog.Icon icon={props => <EmojiBlinkRight {...props} {...styles.iconoir} />} />*/}
              <Dialog.Title style={styles.dialogTitle}>Genre</Dialog.Title>
              <Dialog.ScrollArea>
                <ScrollView>
                  <RadioButtonGroupHF
                    control={control}
                    controllerName="idGenre"
                    rules={{ required: "Genre is required" }}>
                    {genres.map(({ id, genre }) => (
                      <RadioButton.Item label={genre} value={id} key={id} />
                    ))}
                  </RadioButtonGroupHF>
                </ScrollView>
              </Dialog.ScrollArea>
              <Dialog.Actions>
                <Button onPress={() => setVisibleDialog(false)} uppercase={false}>
                  Close
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>

        <View>
          <Button mode="contained" uppercase={false} onPress={handleSubmit(onPressContinue)}>
            Continue
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
  dialogTitle: {
    textAlign: "center",
  },
  inputChip: {
    marginVertical: 12,
  },
});

export { SignUp };
