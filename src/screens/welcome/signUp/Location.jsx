import { setUserSession } from "../../../redux/states/userSession";
import { useErrorDialog } from "../../../hooks/useErrorDialog";
import { ErrorDialog } from "../../../components/ErrorDialog";
import { useLoading } from "../../../hooks/useLoading";
import { sharedStyles } from "../../../shared/styles";
import { Button, Text } from "react-native-paper";
import * as LocationService from "expo-location";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { View } from "react-native";

function Location({ navigation }) {
  const { t } = useTranslation("translation", { keyPrefix: "screens" });
  const { error, showError, hideError } = useErrorDialog();
  const dispatch = useDispatch();
  const {
    startLoading: allowContinue,
    loading: isContinueAllowed,
    stopLoading: denyContinue,
  } = useLoading();

  const getCurrentLocation = async () => {
    denyContinue();
    const { status } = await LocationService.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      showError({ error: new Error(t("location.permissionDenied")) });
      return;
    }

    const {
      coords: { latitude, longitude },
    } = await LocationService.getCurrentPositionAsync({});

    dispatch(
      setUserSession({
        location: {
          longitude,
          latitude,
        },
      })
    );
    allowContinue();
  };

  return (
    <View style={[sharedStyles.flx, sharedStyles.flxCenter]}>
      <Text>{t("location.advice")}</Text>
      <Button
        onPress={getCurrentLocation}
        style={sharedStyles.mv15}
        uppercase={false}
        mode="contained">
        {t("location.getCurrentLocation")}
      </Button>
      <Button
        onPress={() => navigation.navigate("SignUpPhone")}
        disabled={!isContinueAllowed}
        uppercase={false}
        mode="contained">
        {t("signUp.continue")}
      </Button>

      <ErrorDialog isVisible={error} onDismiss={hideError} content={error} />
    </View>
  );
}

export { Location };
