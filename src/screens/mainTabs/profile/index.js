import { useAccountInformation } from "../../../services/app/me";
import { ActivityIndicator, Text } from "react-native-paper";
import { sharedStyles } from "../../../shared/styles";
import { ProfileHeader } from "./ProfileHeader";
import { View } from "react-native";

function Profile() {
  const { data, error, isValidating } = useAccountInformation();

  if (isValidating) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error</Text>;
  }

  console.log("DATA", JSON.stringify(data, null, 2));

  return (
    <View style={sharedStyles.ph20}>
      <ProfileHeader {...data} />
    </View>
  );
}

export { Profile };
