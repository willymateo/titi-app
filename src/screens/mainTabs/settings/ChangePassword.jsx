import { RepeatPasswordHF } from "../../../components/hookForm/RepeatPasswordHF";
import { useTranslation } from "react-i18next";
import { Button } from "react-native-paper";

function ChangePassword() {
  const { t } = useTranslation("translation", { keyPrefix: "screens.settings" });

  return (
    <>
      <RepeatPasswordHF />
      <Button mode="contained" uppercase={false} onPress={() => {}}>
        {t("changePassword")}
      </Button>
    </>
  );
}

export { ChangePassword };
