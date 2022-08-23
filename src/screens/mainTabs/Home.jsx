import { Avatar, Button, Card, Paragraph } from "react-native-paper";
import { UserCircleAlt } from "iconoir-react-native";
import { StyleSheet, View } from "react-native";

function Home() {
  return (
    <View style={styles.container}>
      <Card>
        <Card.Title
          title="Go to cinema"
          subtitle="willymateo"
          left={props => (
            <Avatar.Icon
              {...props}
              icon={props => <UserCircleAlt {...props} {...styles.iconoir} />}
            />
          )}
        />
        <Card.Content>
          <Paragraph>
            This is a example of CatHot adventure. I would like to go to cinema with a girl this
            fridary afternoon.
          </Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => console.log("Engage")}>Engage</Button>
        </Card.Actions>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  iconoir: {
    height: 25,
    width: 25,
  },
});

export { Home };
