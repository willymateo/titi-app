import { AdventureScrollCards } from "../../../components/AdventureScrollCards";
import { setUserSession } from "../../../redux/states/userSession";
import { useAccountInformation } from "../../../services/app/me";
import { ActivityIndicator, Text } from "react-native-paper";
import { sharedStyles } from "../../../shared/styles";
import { useDispatch } from "react-redux";
import { View } from "react-native";
import { Header } from "./Header";
import { useEffect } from "react";

function Profile() {
  const { data: accountInformation, error, isValidating } = useAccountInformation();
  const dispatch = useDispatch();

  // TODO: search better aproach: only save the data when !isValidating and !error
  useEffect(() => {
    if (!isValidating && !error) {
      const {
        location: { latitude, longitude },
        gender: { id: idGender },
        firstNames,
        lastNames,
        biography,
        username,
        photoUrl,
        bornDate,
        email,
      } = accountInformation;

      dispatch(
        setUserSession({
          location: {
            longitude,
            latitude,
          },
          firstNames,
          lastNames,
          biography,
          bornDate,
          username,
          photoUrl,
          idGender,
          email,
        })
      );
    }
  }, [accountInformation]);

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
