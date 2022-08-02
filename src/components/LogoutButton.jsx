import { resetUserSession } from "../redux/states/userSession";
import { Button } from "react-native-paper";
import { useDispatch } from "react-redux";

function LogoutButton() {
  const dispatch = useDispatch();
  const onPressLogout = () => {
    dispatch(resetUserSession());
  };

  return (
    <Button mode="contained" onPress={onPressLogout}>
      Logout
    </Button>
  );
}

export { LogoutButton };
