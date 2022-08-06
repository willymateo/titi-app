import { Text, Chip } from "react-native-paper";
import { StyleSheet, View } from "react-native";

function InputChip({ style, label, mode, onPress, Icon, value }) {
  return (
    <View style={style}>
      <Text style={styles.labelChip}>{label}</Text>
      <View style={styles.chip}>
        <Chip mode={mode} onPress={onPress} icon={props => <Icon {...props} {...styles.iconoir} />}>
          {value}
        </Chip>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconoir: {
    width: 25,
    height: 25,
  },
  labelChip: {
    marginBottom: 5,
  },
  chip: {
    flexDirection: "row",
  },
});

export { InputChip };
