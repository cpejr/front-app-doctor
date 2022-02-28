import {registerRootComponent} from "expo";
import Routes from "./Routes";

export default function App() {
  return <Routes />
}



registerRootComponent(App);