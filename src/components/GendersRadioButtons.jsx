import { RadioButtonGroupHF } from "./hookForm/RadioButtonGroupHF";
import { CloudError, PeopleRounded } from "iconoir-react-native";
import { useGenders } from "../services/app/genders";
import { Dialog, Portal } from "react-native-paper";
import { LoadingDialog } from "./LoadingDialog";
import { sharedStyles } from "../shared/styles";
import { useTranslation } from "react-i18next";
import { ErrorDialog } from "./ErrorDialog";
import { ScrollView } from "react-native";

function GendersRadioButtons({ control, controllerName, isVisible, hide }) {
  const { t } = useTranslation("translation", { keyPrefix: "components.inputHookForm" });
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
        <Dialog.Icon icon={props => <PeopleRounded {...props} {...sharedStyles.iconoirM} />} />
        <Dialog.Title>{t("gender")}</Dialog.Title>
        <Dialog.ScrollArea>
          <ScrollView>
            <RadioButtonGroupHF
              items={genders.map(({ id, gender }) => ({ id, value: gender }))}
              rules={{ required: t("genderRequired") }}
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

export { GendersRadioButtons };
