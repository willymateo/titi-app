import { Archery, Fishing, Stretching } from "iconoir-react-native";
import { useTranslation } from "react-i18next";
import { sharedStyles } from "../theme/styles";
import { Chip } from "react-native-paper";

function UserStateChip({ state }) {
  const { t } = useTranslation("translation", { keyPrefix: "components.userStateChip" });

  const STATE_COMPONENTS = {
    available: (
      <Chip icon={props => <Stretching {...props} {...sharedStyles.iconoirS} />}>{t(state)}</Chip>
    ),
    looking_for: (
      <Chip icon={props => <Fishing {...props} {...sharedStyles.iconoirS} />}>{t(state)}</Chip>
    ),
    engaged_temporarily: (
      <Chip icon={props => <Archery {...props} {...sharedStyles.iconoirS} />}>{t(state)}</Chip>
    ),
  };

  return STATE_COMPONENTS[state] || <Chip>Unknow user state</Chip>;
}

export { UserStateChip };
