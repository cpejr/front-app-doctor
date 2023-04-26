import { registerRootComponent } from "expo";
import Routes from "./Routes";
import { ChatProvider } from "./contexts/ChatContext/ChatContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

export default function App() {
  const [emailLogado, setEmailLogado] = useState(null);
  const [emailLogadoCarregado, setEmailLogadoCarregado] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("@AirBnbApp:email")
      .then((email) => {
        setEmailLogado(email);
        setEmailLogadoCarregado(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!emailLogadoCarregado) {
    return null; // ou outro componente de carregamento
  }

  return (
    <ChatProvider>
      <Routes emailLogado={emailLogado} />
    </ChatProvider>
  );
}

registerRootComponent(App);
