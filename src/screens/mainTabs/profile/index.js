import { useAccountInformation } from "../../../services/app/me";
import { ActivityIndicator, Text } from "react-native-paper";
import { ProfileTop } from "./ProfileTop";

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
      <ProfileTop {...data} />
    </>
  );
}

export { Profile };
