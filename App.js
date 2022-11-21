import "expo-dev-client";
import { Provider as ReduxProvider } from "react-redux";
import { reduxStore } from "./src/redux/store";
import { Main } from "./src/Main";
import "./src/locales/i18n";

export default function App() {
  return (
    <ReduxProvider store={reduxStore}>
      <Main />
    </ReduxProvider>
  );
}
