import { Group, Heart, User, UserCircleAlt, Wristwatch } from "iconoir-react-native";
import { Card, Chip, Text, Avatar, Button, IconButton } from "react-native-paper";
import { formatDistanceToNow, intlFormat, parseISO } from "date-fns";
import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

function AdventureCard({
  style,
  title,
  description,
  endDateTime,
  startDateTime,
  numInvitations,
  publisher: {
    username,
    profileInformation: {
      gender: { gender },
    },
  },
}) {
  const { t } = useTranslation("translation", { keyPrefix: "components.adventuresCard" });
  const { language } = useSelector(state => state.languagePreference);

  return (
    <Card style={style}>
      <Card.Title
        title={title}
        subtitle={`${username} ● ${gender}`}
        left={props => (
          <Avatar.Icon
            {...props}
            icon={props => <UserCircleAlt {...props} {...styles.iconoir} />}
          />
        )}
      />
      <Card.Content>
        <Text style={styles.endDateTimeText}>
          {intlFormat(
            parseISO(endDateTime),
            {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
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
                  <Group {...props} {...styles.iconoirChip} />
                ) : (
                  <User {...props} {...styles.iconoirChip} />
                );
              }}>
              {t("invitations", { count: numInvitations })}
            </Chip>
          </View>
          <View style={styles.startDateTimeContainer}>
            <Text style={styles.startDateTimeText}>
              {`${t("published")} `}
              {formatDistanceToNow(parseISO(startDateTime), {
                includeSeconds: true,
                addSuffix: true,
              })}
            </Text>
            <IconButton
              disabled
              icon={props => <Wristwatch {...props} {...styles.iconoirChip} />}
            />
          </View>
        </View>
      </Card.Content>
      <Card.Actions>
        <Button
          onPress={() => console.log("Engage")}
          icon={props => <Heart {...props} {...styles.iconoir} />}>
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
  iconoir: {
    height: 25,
    width: 25,
  },
  iconoirChip: {
    height: 15,
    width: 15,
  },
});

export { AdventureCard };
