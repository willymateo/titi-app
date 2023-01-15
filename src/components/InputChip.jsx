import { Text, Chip } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { sharedStyles } from "../shared/styles";

function InputChip({ style, label, mode, onPress, icon: Icon, value }) {
  return (
    <View style={style}>
      <Text style={styles.labelChip}>{label}</Text>
      <View style={styles.chip}>
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

const styles = StyleSheet.create({
  labelChip: {
    marginBottom: 5,
  },
  chip: {
    flexDirection: "row",
  },
});

export { InputChip };
