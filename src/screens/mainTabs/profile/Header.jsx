import { Avatar, Divider, IconButton, Text, useTheme } from "react-native-paper";
import { Bonfire, Clock, Edit, EmojiBall } from "iconoir-react-native";
import { useNavigation } from "@react-navigation/native";
import { sharedStyles } from "../../../shared/styles";
import { UserStateChip } from "./UserStateChip";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { View } from "react-native";

function Header({ currentState: { state } = {}, numAdventures = 0, numMissing = 0, numLater = 0 }) {
  const { t } = useTranslation("translation", { keyPrefix: "screens.profileHeader" });
  const { firstNames, lastNames, biography, username, photoUrl } = useSelector(
    ({ userSession }) => userSession
  );
  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <View style={sharedStyles.mv5}>
      <View style={sharedStyles.flxACenter}>
        <View style={sharedStyles.flxRow}>
          <Avatar.Image source={{ uri: photoUrl }} {...sharedStyles.profilePhotoS} />
          <View style={[sharedStyles.flxCenter, sharedStyles.ml10]}>
            <Text>
              {firstNames} {lastNames}
            </Text>
            <View style={[sharedStyles.flxRow, sharedStyles.flxACenter, sharedStyles.mt5]}>
              <Text>@{username}</Text>
              <UserStateChip state={state} style={sharedStyles.ml10} />
            </View>
          </View>
          <View style={sharedStyles.flxJCCenter}>
            <IconButton
              icon={props => <Edit {...props} {...sharedStyles.iconoirM} />}
              onPress={() => navigation.navigate("EditProfile")}
            />
          </View>
        </View>

        <Text style={sharedStyles.mv5}>{biography}</Text>
      </View>

      <Divider style={sharedStyles.mv5} />

      <View style={[sharedStyles.flxRow, sharedStyles.flxSBtwn]}>
        <View style={sharedStyles.flxACenter}>
          <Text>{numAdventures}</Text>
          <Bonfire {...sharedStyles.iconoirM} color={colors.onSurface} />
          <Text>{t("adventures")}</Text>
        </View>
        <View style={sharedStyles.flxACenter}>
          <Text>{numLater}</Text>
          <Clock {...sharedStyles.iconoirM} color={colors.onSurface} />
          <Text>{t("later")}</Text>
        </View>
        <View style={sharedStyles.flxACenter}>
          <Text>{numMissing}</Text>
          <EmojiBall {...sharedStyles.iconoirM} color={colors.onSurface} />
          <Text>{t("missing")}</Text>
        </View>
      </View>
    </View>
  );
}

export { Header };
