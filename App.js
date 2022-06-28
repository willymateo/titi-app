import { Provider as PaperProvider } from "react-native-paper";
import { Main } from "./components/Main";
import { theme } from "./theme/theme";

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <Main />
    </PaperProvider>
  );
}
