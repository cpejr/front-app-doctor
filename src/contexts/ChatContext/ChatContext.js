import React, { createContext, useRef, useState, useEffect } from 'react';
import * as managerService from "../../services/ManagerService/managerService";

const imagemPerfilPadrão =
  'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg';

export const ChatContext = createContext();

export function ChatProvider({ children }) {

  async function pegandoDados() {
    const resposta = await managerService.GetDadosUsuario();
    setUsuarioId(resposta.dadosUsuario.id)
  }
  useEffect(() => {
    pegandoDados();
  }, []);

  //const usuarioId = recebeUsuarioId();
  const [conversas, setConversas] = useState([]);
  const [usuarioId, setUsuarioId] = useState([]);
  const [conversaSelecionada, setConversaSelecionada] = useState({});
  const [mensagens, setMensagens] = useState([]);
  const inputMensagemRef = useRef(null);


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
