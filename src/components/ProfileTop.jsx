import { Avatar, Text } from "react-native-paper";
import { StyleSheet } from "react-native";

function ProfileTop({
  username,
  firstNames,
  lastNames,
  numAdventures,
  profileInformation: {
    photoUrl,
    biography,
    numLater,
    numMissing,
    currentState: { id, state },
  },
}) {
  return (
    <>
      <Text>{username}</Text>
      <Text>{numAdventures} adventures</Text>
      <Text>{numLater} later</Text>
      <Text>{numMissing} missing</Text>
      <Avatar.Image
        source={{
          uri: "https://github.com/willymateo.png",
        }}
        size={styles.avatar.size}
      />
    </>
  );
}

const styles = StyleSheet.create({
  avatar: {
    size: 200,
  },
});

export { ProfileTop };
