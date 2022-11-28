import { UserStateChip } from "../../../components/UserStateChip";
import { Avatar, Divider, Text } from "react-native-paper";
import { sharedStyles } from "../../../shared/styles";
import { StyleSheet, View } from "react-native";

function ProfileTop({
  currentState: { state } = {},
  numAdventures = 0,
  firstNames = "",
  numMissing = 0,
  lastNames = "",
  photoUrl = "",
  username = "",
  numLater = 0,
}) {
  return (
    <View>
      <View style={sharedStyles.flxACenter}>
        <Avatar.Image source={{ uri: photoUrl }} size={styles.avatar.size} />
        <View style={{ ...sharedStyles.flxRow, ...sharedStyles.flxACenter }}>
          <Text>@{username}</Text>
          <UserStateChip state={state} />
        </View>
        <Text>
          {firstNames} {lastNames}
        </Text>
      </View>
      <Divider />
      <View style={{ ...sharedStyles.flxRow, ...sharedStyles.flxSBtwn }}>
        <View style={sharedStyles.flxACenter}>
          <Text>{numAdventures}</Text>
          <Text>adventures</Text>
        </View>
        <View style={sharedStyles.flxACenter}>
          <Text>{numLater}</Text>
          <Text>later</Text>
        </View>
        <View style={sharedStyles.flxACenter}>
          <Text>{numMissing}</Text>
          <Text>missing</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    size: 80,
  },
});

export { ProfileTop };
