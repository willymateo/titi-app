import { RadioButtonGroupHF } from "./hookForm/RadioButtonGroupHF";
import { CloudError, PeopleTag } from "iconoir-react-native";
import { useGenders } from "../services/app/genders";
import { Dialog, Portal } from "react-native-paper";
import { LoadingDialog } from "./LoadingDialog";
import { sharedStyles } from "../shared/styles";
import { useTranslation } from "react-i18next";
import { ErrorDialog } from "./ErrorDialog";
import { ScrollView } from "react-native";

function GendersRadioButton({ control, controllerName, isVisible, hide }) {
  const { t } = useTranslation("translation", { keyPrefix: "components" });
  const { data: genders, error, isValidating } = useGenders();

  if (!isVisible) {
    return null;
  }

  if (isValidating) {
    return <LoadingDialog isVisible />;
  }

  if (error) {
    return <ErrorDialog isVisible onDismiss={hide} content={error} icon={CloudError} />;
  }

  return (
    <Portal>
      <Dialog visible onDismiss={hide}>
        <Dialog.Icon icon={props => <PeopleTag {...props} {...sharedStyles.iconoirM} />} />
        <Dialog.Title>{t("inputHookForm.gender")}</Dialog.Title>
        <Dialog.ScrollArea>
          <ScrollView>
            <RadioButtonGroupHF
              rules={{ required: t("inputHookForm.genderRequired") }}
              items={genders.map(({ id, gender }) => ({
                value: t(`gendersRadioButton.${gender}`),
                id,
              }))}
              controllerName={controllerName}
              control={control}
              onSelect={hide}
            />
          </ScrollView>
        </Dialog.ScrollArea>
      </Dialog>
    </Portal>
  );
}

export { GendersRadioButton };
