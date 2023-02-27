import { Card, Chip, Text, Avatar, Button, IconButton, useTheme } from "react-native-paper";
import { Group, Heart, Trash, User, Wristwatch } from "iconoir-react-native";
import { formatDistanceToNow, intlFormat, parseISO } from "date-fns";
import { sharedStyles } from "../shared/styles";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

function AdventureMiniCard({
  publisher: { username = "", gender, photoUrl = "" } = {},
  numInvitations = 1,
  description = "",
  startDateTime,
  endDateTime,
  style = {},
  title = "",
}) {
  const navigation = useNavigation();
  const { t } = useTranslation("translation", { keyPrefix: "components.adventures" });
  const { language } = useSelector(({ languagePreference }) => languagePreference);
  const { colors } = useTheme();

  return (
    <Card
      style={style}
      onPress={() =>
        navigation.navigate("AdventureForm", {
          buttonLabel: t("updateAdventure"),
          readOnly: true,
          numInvitations,
          startDateTime,
          endDateTime,
          description,
          title,
        })
      }>
      <Card.Title
        left={props => <Avatar.Image {...props} source={{ uri: photoUrl }} />}
        subtitle={`${username} ● ${gender}`}
        title={title}
      />
      <Card.Content>
        <Text variant="titleLarge">
          {intlFormat(
            parseISO(endDateTime),
            {
              minute: "numeric",
              hour: "numeric",
              weekday: "long",
              year: "numeric",
              day: "numeric",
              month: "long",
              hour12: true,
            },
            { locale: language }
          )}
        </Text>

        <Text>{description}</Text>

        <View
          style={[
            sharedStyles.flxACenter,
            sharedStyles.flxSBtwn,
            sharedStyles.flxWrap,
            sharedStyles.flxRow,
          ]}>
          <View>
            <Chip
              icon={props => {
                return numInvitations > 1 ? (
                  <Group {...props} {...sharedStyles.iconoirS} />
                ) : (
                  <User {...props} {...sharedStyles.iconoirS} />
                );
              }}>
              {t("invitations", { count: numInvitations })}
            </Chip>
          </View>
          <View style={[sharedStyles.flxRow, sharedStyles.flxACenter, sharedStyles.flxCenter]}>
            <Text style={[sharedStyles.txtAlignR, { color: colors.surfaceVariant }]}>
              {`${t("published")} ${formatDistanceToNow(parseISO(startDateTime), {
                includeSeconds: true,
                addSuffix: true,
              })}`}
            </Text>
            <IconButton
              icon={props => <Wristwatch {...props} {...sharedStyles.iconoirS} />}
              disabled
            />
          </View>
        </View>
      </Card.Content>
      <Card.Actions>
        <Button
          icon={props => <Heart {...props} {...sharedStyles.iconoirM} />}
          onPress={() => console.log("Engage")}>
          {t("engage")}
        </Button>
        <Button
          icon={props => <Trash {...props} {...sharedStyles.iconoirM} />}
          onPress={() => console.log("delete")}>
          delete
        </Button>
      </Card.Actions>
    </Card>
  );
}

export { AdventureMiniCard };
