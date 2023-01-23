import { CloudError, PeopleTag } from "iconoir-react-native";
import { RadioButtonGroupHF } from "./RadioButtonGroupHF";
import { useGenders } from "../../services/app/genders";
import { Dialog, Portal } from "react-native-paper";
import { useVisible } from "../../hooks/useVisible";
import { sharedStyles } from "../../shared/styles";
import { LoadingDialog } from "../LoadingDialog";
import { useTranslation } from "react-i18next";
import { ErrorDialog } from "../ErrorDialog";
import { ScrollView } from "react-native";
import { InputChip } from "../InputChip";

function GendersInputHF({
  controllerName = "idGender",
  rules = {},
  style = {},
  chipMode,
  control,
  watch,
}) {
  const { isVisible: isDialogVisible, show: showDialog, hide: hideDialog } = useVisible();
  const { t } = useTranslation("translation", { keyPrefix: "components" });
  const { data: genders, error, isValidating, gendersObj } = useGenders();
  const idSelectedGender = watch(controllerName);

  return (
    <>
      <InputChip
        value={gendersObj[idSelectedGender] || t("inputHookForm.genderPlaceholder")}
        label={t("inputHookForm.gender")}
        controllerName={controllerName}
        onPress={showDialog}
        control={control}
        icon={PeopleTag}
        mode={chipMode}
        rules={rules}
        style={style}
      />
      <Portal>
        <Dialog visible={isDialogVisible && !isValidating && !error} onDismiss={hideDialog}>
          <Dialog.Icon icon={props => <PeopleTag {...props} {...sharedStyles.iconoirM} />} />
          <Dialog.Title>{t("inputHookForm.gender")}</Dialog.Title>
          <Dialog.ScrollArea>
            <ScrollView>
              <RadioButtonGroupHF
                items={genders.map(({ id, gender }) => ({
                  value: t(`gendersInputHF.${gender}`),
                  id,
                }))}
                controllerName={controllerName}
                onSelect={hideDialog}
                control={control}
                rules={rules}
              />
            </ScrollView>
          </Dialog.ScrollArea>
        </Dialog>
      </Portal>
      <LoadingDialog isVisible={isDialogVisible && isValidating} />
      <ErrorDialog
        isVisible={isDialogVisible && error}
        onDismiss={hideDialog}
        icon={CloudError}
        content={error}
      />
    </>
  );
}

export { GendersInputHF };
