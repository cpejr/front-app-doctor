import {registerRootComponent} from "expo";
import Routes from "./src/Routes";
import { ChatProvider } from './src/contexts/ChatContext/ChatContext';


export default function App() {
  return ( 
  <ChatProvider>
     <Routes /> 
  </ChatProvider> 
);
}



registerRootComponent(App);
