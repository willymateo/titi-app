import { Archery, Fishing, Stretching } from "iconoir-react-native";
import { sharedStyles } from "../shared/styles";
import { useTranslation } from "react-i18next";
import { Chip } from "react-native-paper";
import { StyleSheet } from "react-native";

function UserStateChip({ state, style = {} }) {
  const { t } = useTranslation("translation", { keyPrefix: "components.userStateChip" });

  const STATE_COMPONENTS = {
    available: (
      <Chip
        icon={props => <Stretching {...props} {...sharedStyles.iconoirS} />}
        style={[style, styles.available]}>
        {t(state)}
      </Chip>
    ),
    looking_for: (
      <Chip
        icon={props => <Fishing {...props} {...sharedStyles.iconoirS} />}
        style={[style, styles.lookingFor]}>
        {t(state)}
      </Chip>
    ),
    engaged_temporarily: (
      <Chip
        icon={props => <Archery {...props} {...sharedStyles.iconoirS} />}
        style={[style, styles.engagedTemporarily]}>
        {t(state)}
      </Chip>
    ),
  };

  return STATE_COMPONENTS[state] || <Chip style={style}>Unknow user state</Chip>;
}

const styles = StyleSheet.create({
  available: {
    backgroundColor: "#4caf50",
  },
  lookingFor: {
    backgroundColor: "#ff9800",
  },
  engagedTemporarily: {
    backgroundColor: "#f44336",
  },
});

export { UserStateChip };
