import { AdventureScrollCards } from "../../../components/AdventureScrollCards";
import { useAccountInformation } from "../../../services/app/me";
import { ActivityIndicator, Text } from "react-native-paper";
import { sharedStyles } from "../../../shared/styles";
import { View } from "react-native";
import { Header } from "./Header";

function Profile() {
  const { data: accountInformation, error, isValidating } = useAccountInformation();

  if (isValidating) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error</Text>;
  }

  console.log("ACCOUNT INFORMATION", JSON.stringify(accountInformation, null, 2));

  return (
    <View style={sharedStyles.mh20}>
      <Header {...accountInformation} />
      <AdventureScrollCards />
    </View>
  );
}

export { Profile };
