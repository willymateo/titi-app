import { Bonfire, ClockOutline, EmojiBall } from "iconoir-react-native";
import { Avatar, Divider, Text, useTheme } from "react-native-paper";
import { UserStateChip } from "../../../components/UserStateChip";
import { sharedStyles } from "../../../shared/styles";
import { View } from "react-native";

function ProfileHeader({
  currentState: { state } = {},
  numAdventures = 0,
  firstNames = "",
  numMissing = 0,
  lastNames = "",
  biography = "",
  photoUrl = "",
  username = "",
  numLater = 0,
}) {
  const {
    colors: { onSurface },
  } = useTheme();

  return (
    <View>
      <View style={sharedStyles.flxACenter}>
        <View style={sharedStyles.flxRow}>
          <Avatar.Image source={{ uri: photoUrl }} {...sharedStyles.profilePhoto} />
          <View style={[sharedStyles.flxACenter, sharedStyles.flxJCCenter, sharedStyles.ml10]}>
            <Text>
              {firstNames} {lastNames}
            </Text>
            <View style={[sharedStyles.flxRow, sharedStyles.flxACenter]}>
              <Text>@{username}</Text>
              <UserStateChip state={state} style={sharedStyles.ml10} />
            </View>
          </View>
        </View>

        <Text style={sharedStyles.mv5}>{biography}</Text>
      </View>

      <Divider style={sharedStyles.mv5} />

      <View style={{ ...sharedStyles.flxRow, ...sharedStyles.flxSBtwn }}>
        <View style={sharedStyles.flxACenter}>
          <Text>{numAdventures}</Text>
          <Bonfire {...sharedStyles.iconoirM} color={onSurface} />
          <Text>adventures</Text>
        </View>
        <View style={sharedStyles.flxACenter}>
          <Text>{numLater}</Text>
          <ClockOutline {...sharedStyles.iconoirM} color={onSurface} />
          <Text>later</Text>
        </View>
        <View style={sharedStyles.flxACenter}>
          <Text>{numMissing}</Text>
          <EmojiBall {...sharedStyles.iconoirM} color={onSurface} />
          <Text>missing</Text>
        </View>
      </View>
    </View>
  );
}

export { ProfileHeader };
