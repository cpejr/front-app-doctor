import {registerRootComponent} from "expo";
import Routes from "./Routes";
import { ChatProvider } from './contexts/ChatContext/ChatContext';


export default function App() {
  return ( 
  <ChatProvider>
     <Routes /> 
  </ChatProvider> 
);
}



registerRootComponent(App);