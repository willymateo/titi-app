import { resetUserSession } from "../redux/states/userSession";
import { MMKV_USER_TOKEN, storage } from "../share/app.config";
import { useTranslation } from "react-i18next";
import { Button } from "react-native-paper";
import { useDispatch } from "react-redux";

function LogoutButton() {
  const { t } = useTranslation("translation", { keyPrefix: "components.logoutButton" });
  const dispatch = useDispatch();
  const onPressLogout = () => {
    storage.delete(MMKV_USER_TOKEN);
    dispatch(resetUserSession());
  };

  return (
    <Button mode="contained" onPress={onPressLogout}>
      {t("logout")}
    </Button>
  );
}

export { LogoutButton };
