import { MMKV_USER_TOKEN, storage } from "../../../config/app.config";
import { setUserSession } from "../../../redux/states/userSession";
import { LoadingDialog } from "../../../components/LoadingDialog";
import { useErrorDialog } from "../../../hooks/useErrorDialog";
import { ErrorDialog } from "../../../components/ErrorDialog";
import { Gps, MapsArrowIssue } from "iconoir-react-native";
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
  const { error, showError, hideError } = useErrorDialog();
  const dispatch = useDispatch();
  const {
    startLoading: startLoadingLocation,
    stopLoading: stopLoadingLocation,
    loading: loadingLocation,
  } = useLoading();
  const {
    startLoading: startLoadingSignUp,
    stopLoading: stopLoadingSignUp,
    loading: loadingSignUp,
  } = useLoading();
  const {
    startLoading: allowContinue,
    loading: isContinueAllowed,
    stopLoading: denyContinue,
  } = useLoading();

  const getCurrentLocation = async () => {
    startLoadingLocation();
    denyContinue();
    const { status } = await LocationService.requestForegroundPermissionsAsync();

    if (status !== LocationService.PermissionStatus.GRANTED) {
      showError({ error: t("location.permissionDenied") });
      stopLoadingLocation();
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
            longitude: longitude.toString(),
            latitude: latitude.toString(),
          },
        })
      );

      allowContinue();
    } catch (e) {
      showError({ error: e.message });
    } finally {
      stopLoadingLocation();
    }
  };

  const handlePressSignUp = async () => {
    startLoadingSignUp();

    const { token, error: errorOnCreate } = await createUser();

    if (errorOnCreate) {
      showError({ error: errorOnCreate });
      stopLoadingSignUp();
      return;
    }

    storage.set(MMKV_USER_TOKEN, token);
    stopLoadingSignUp();
    dispatch(setUserSession({ token, password: "" }));
  };

  return (
    <View style={[sharedStyles.flx, sharedStyles.flxCenter]}>
      <Text>{t("location.advice")}</Text>
      <Button
        icon={props => <Gps {...props} {...sharedStyles.iconoirS} />}
        onPress={getCurrentLocation}
        style={sharedStyles.mv15}
        loading={loadingLocation}
        uppercase={false}
        mode="elevated">
        {loadingLocation ? t("location.gettingCurrentLocation") : t("location.getCurrentLocation")}
      </Button>
      <Button
        disabled={!isContinueAllowed}
        onPress={handlePressSignUp}
        uppercase={false}
        mode="contained">
        {t("signUp.createAccount")}
      </Button>

      <ErrorDialog isVisible={error} onDismiss={hideError} content={error} icon={MapsArrowIssue} />
      <LoadingDialog isVisible={loadingSignUp} />
    </View>
  );
}

export { Location };
