import { registerRootComponent } from "expo";
import Routes from "./src/Routes";

export default function App() {
  return <Routes />;
}

registerRootComponent(App);
