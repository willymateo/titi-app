import { Text, Chip } from "react-native-paper";
import { sharedStyles } from "../shared/styles";
import { View } from "react-native";

function InputChip({ style, label, mode, onPress, icon: Icon, value }) {
  return (
    <View style={style}>
      <Text style={sharedStyles.mb5}>{label}</Text>
      <View style={sharedStyles.flxRow}>
        <Chip
          icon={props => <Icon {...props} {...sharedStyles.iconoirM} />}
          onPress={onPress}
          mode={mode}>
          {value}
        </Chip>
      </View>
    </View>
  );
}

export { InputChip };
