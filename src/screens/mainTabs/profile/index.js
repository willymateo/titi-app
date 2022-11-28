import { useAccountInformation } from "../../../services/app/me";
import { ActivityIndicator, Text } from "react-native-paper";
import { ProfileHeader } from "./ProfileHeader";

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
    <>
      <ProfileHeader {...data} />
    </>
  );
}

export { Profile };
