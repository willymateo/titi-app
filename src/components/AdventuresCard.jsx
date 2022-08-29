import { Group, Heart, User, UserCircleAlt, Wristwatch } from "iconoir-react-native";
import { formatDistanceToNow, intlFormat, parseISO } from "date-fns";
import { useAdventures } from "../services/catHot/adventures";
import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  Card,
  Chip,
  Text,
  Avatar,
  Button,
  IconButton,
  ActivityIndicator,
} from "react-native-paper";

function AdventuresCard() {
  const { t } = useTranslation("translation", { keyPrefix: "components.adventuresCard" });
  const { language } = useSelector(state => state.languagePreference);
  const { data: adventures, error, isValidating } = useAdventures();
  console.log(adventures);

  if (isValidating) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      {adventures.map(
        ({
          id,
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
        }) => (
          <Card key={id} style={styles.card}>
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
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  card: {
    marginVertical: 4,
  },
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

export { AdventuresCard };
