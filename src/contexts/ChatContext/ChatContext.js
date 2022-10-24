import React, { createContext, useRef, useState, useEffect } from 'react';
import * as managerService from "../../services/ManagerService/managerService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const imagemPerfilPadrão =
  'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg';

export const ChatContext = createContext();

export function ChatProvider({ children }) {

  const [conversas, setConversas] = useState([]);
  const [usuarioId, setUsuarioId] = useState([]);
  const [conversaSelecionada, setConversaSelecionada] = useState({});
  const [mensagens, setMensagens] = useState([]);
  const inputMensagemRef = useRef(null);

  async function pegandoIdUsuario() {
     await AsyncStorage.getItem("@AirBnbApp:email")
    .then((res) => {
      managerService.GetDadosUsuario(res).then((resposta) => {
        setUsuarioId(resposta.dadosUsuario.id);
      });
    })
    .catch((error) => alert(error));
  }
  
  useEffect(() => {
    pegandoIdUsuario();
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
