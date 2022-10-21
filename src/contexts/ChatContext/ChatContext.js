import React, { createContext, useRef, useState, useEffect } from "react";
import * as managerService from "../../services/ManagerService/managerService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const imagemPerfilPadrão =
  "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";

export const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [conversas, setConversas] = useState([]);
  const [usuarioId, setUsuarioId] = useState('');
  const [conversaSelecionada, setConversaSelecionada] = useState({});
  const [mensagens, setMensagens] = useState([]);
  const inputMensagemRef = useRef(null);

  // async function pegandoIdUsuario() {
  //   let isMounted = true;
  //   const resposta = await managerService.GetDadosUsuario();
  //   setUsuarioId(resposta.dadosUsuario.id);

  //   return () => (isMounted = false);
  // }

  async function getEmailUsuario() {
    await AsyncStorage.getItem("@AirBnbApp:email");
  }

  useEffect(() => {
    console.log("entrou")
    let isMounted = true;

    async function pegandoIdUsuario() {
      const {
        dadosUsuario: { id },
      } = await managerService.GetDadosUsuario(getEmailUsuario());
      if (isMounted) setUsuarioId(id);
    }

    pegandoIdUsuario();
    console.log(usuarioId)

    return () => (isMounted = false);
  }, []);

  return (
      <ChatContext.Provider
        value={{
          usuarioId,
          conversaSelecionada,
          setConversaSelecionada,
          conversas,
          setConversas,
          mensagens,
          setMensagens,
          imagemPerfilPadrão,
          inputMensagemRef,
        }}
      >
        {children}
      </ChatContext.Provider>
  );
}
