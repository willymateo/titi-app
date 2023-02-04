import { setUserSession } from "../../../redux/states/userSession";
import { LoadingDialog } from "../../../components/LoadingDialog";
import { useErrorDialog } from "../../../hooks/useErrorDialog";
import { ErrorDialog } from "../../../components/ErrorDialog";
import { createUser } from "../../../services/app/users";
import { useLoading } from "../../../hooks/useLoading";
import { sharedStyles } from "../../../shared/styles";
import { Button, Text } from "react-native-paper";
import * as LocationService from "expo-location";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { View } from "react-native";

function Location() {
  const { t } = useTranslation("translation", { keyPrefix: "screens" });
  const { startLoading, loading, stopLoading } = useLoading();
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

    if (status !== LocationService.PermissionStatus.GRANTED) {
      showError({ error: new Error(t("location.permissionDenied")) });
      return;
    }

    try {
      const {
        coords: { latitude, longitude },
      } = await LocationService.getCurrentPositionAsync({
        accuracy: LocationService.Accuracy.High,
      });

      dispatch(
        setUserSession({
          location: {
            longitude,
            latitude,
          },
        })
      );

      allowContinue();
    } catch (e) {
      showError({ error: e.message });
    }
  };

  const handlePressSignUp = async () => {
    startLoading();

    const { token, error: errorOnCreate } = await createUser();

    if (errorOnCreate) {
      showError({ error: errorOnCreate });
      stopLoading();
      return;
    }

    storage.set(MMKV_USER_TOKEN, token);
    stopLoading();
    dispatch(setUserSession({ token, password: "" }));
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
        onPress={handlePressSignUp}
        disabled={!isContinueAllowed}
        uppercase={false}
        mode="contained">
        {t("signUp.createAccount")}
      </Button>

      <ErrorDialog isVisible={error} onDismiss={hideError} content={error} />
      <LoadingDialog isVisible={loading} />
    </View>
  );
}

export { Location };
