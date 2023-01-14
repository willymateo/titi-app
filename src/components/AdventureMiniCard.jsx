import { Group, Heart, User, UserCircleAlt, Wristwatch } from "iconoir-react-native";
import { Card, Chip, Text, Avatar, Button, IconButton } from "react-native-paper";
import { formatDistanceToNow, intlFormat, parseISO } from "date-fns";
import { StyleSheet, View } from "react-native";
import { sharedStyles } from "../shared/styles";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

function AdventureMiniCard({
  publisher: {
    username,
    gender: { gender },
  },
  numInvitations,
  startDateTime,
  endDateTime,
  description,
  style,
  title,
}) {
  const { t } = useTranslation("translation", { keyPrefix: "components.adventuresCard" });
  const { language } = useSelector(state => state.languagePreference);

  return (
    <Card style={style}>
      <Card.Title
        left={props => (
          <Avatar.Icon
            {...props}
            icon={props => <UserCircleAlt {...props} {...sharedStyles.iconoirM} />}
          />
        )}
        subtitle={`${username} ● ${gender}`}
        title={title}
      />
      <Card.Content>
        <Text style={styles.endDateTimeText}>
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
        <View style={styles.footerContainer}>
          <View style={styles.chipContainer}>
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
          <View style={styles.startDateTimeContainer}>
            <Text style={styles.startDateTimeText}>
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
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 10,
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  chipContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  startDateTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  startDateTimeText: {
    textAlign: "right",
    color: "grey",
  },
  endDateTimeText: {
    fontSize: 23,
  },
});

export { AdventureMiniCard };
