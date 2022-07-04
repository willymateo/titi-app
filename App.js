import { Provider as ReduxProvider } from "react-redux";
import { storeConfiguration } from "./src/redux/store";
import { Main } from "./src/Main";

export default function App() {
  return (
    <ReduxProvider store={storeConfiguration}>
      <Main />
    </ReduxProvider>
  );
}
