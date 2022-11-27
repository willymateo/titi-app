import { Avatar, Text } from "react-native-paper";
import { StyleSheet } from "react-native";

function ProfileTop({
  currentState: { id, state } = {},
  numAdventures = 0,
  firstNames = "",
  numMissing = 0,
  lastNames = "",
  photoUrl = "",
  username = "",
  numLater = 0,
}) {
  return (
    <>
      <Avatar.Image source={{ uri: photoUrl }} size={styles.avatar.size} />
      <Text>{username}</Text>
      <Text>{firstNames}</Text>
      <Text>{lastNames}</Text>
      <Text>{numAdventures} adventures</Text>
      <Text>{numLater} later</Text>
      <Text>{numMissing} missing</Text>
    </>
  );
}

const styles = StyleSheet.create({
  avatar: {
    size: 200,
  },
});

export { ProfileTop };
