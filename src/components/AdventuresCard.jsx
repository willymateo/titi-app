import { ActivityIndicator, Avatar, Button, Card, Paragraph, Text } from "react-native-paper";
import { useAdventures } from "../services/catHot/adventures";
import { UserCircleAlt } from "iconoir-react-native";
import { StyleSheet, View } from "react-native";
import { intlFormat, parseISO } from "date-fns";
import { useSelector } from "react-redux";

function AdventuresCard() {
  const { language } = useSelector(state => state.languagePreference);
  const { data: adventures, error, isValidating } = useAdventures();

  if (isValidating) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      {adventures.map(
        ({ id, title, description, endDateTime, numInvitations, publisher: { username } }) => (
          <Card key={id} style={styles.card}>
            <Card.Title
              title={title}
              subtitle={username}
              left={props => (
                <Avatar.Icon
                  {...props}
                  icon={props => <UserCircleAlt {...props} {...styles.iconoir} />}
                />
              )}
            />
            <Card.Content>
              <Text>
                Adventure date:
                {intlFormat(
                  parseISO(endDateTime),
                  {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  },
                  { locale: language }
                )}
              </Text>
              <Paragraph>{description}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => console.log("Engage")}>Engage</Button>
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
  iconoir: {
    height: 25,
    width: 25,
  },
});

export { AdventuresCard };
