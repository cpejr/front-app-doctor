import React, { createContext, useRef, useState, useEffect } from "react";
import * as managerService from "../../services/ManagerService/managerService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const imagemPerfilPadrão = require("../../assets/logoGuilherme.png");

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



  useEffect(() => {
    
    let isMounted = true;

    async function pegandoIdUsuario() {
      const email = await AsyncStorage.getItem("@AirBnbApp:email");;
      const {
        dadosUsuario: { id },
      } = await managerService.GetDadosUsuario(email);
      if (isMounted) setUsuarioId(id);
    }

    pegandoIdUsuario();


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
