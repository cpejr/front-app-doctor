import React, { useContext, useState, useEffect, useRef } from 'react';
import { Text, View, ScrollView, Image } from "react-native";
import {
  BarraPesquisa,
  Body,
  InputPesquisa,
  IconPesquisa,
  ImagemUsuario,
  CaixaTexto,
  CaixaImagem,
  HeaderChat,
  TextoCaixa,
  CaixaUsuarioMensagem,
} from "./Styles";
import searchIcon from "../../../assets/searchIcon.png";
import * as managerService from "../../../services/ManagerService/managerService";
import Botao from "../../../styles/Botao";
import ConteudoBotao from "../../../styles/ConteudoBotao";
import { Cores } from "../../../variaveis";
//import { ChatContext } from "../../../contexts/ChatContext/";

function BarraLateral() {
  const [busca, setBusca] = useState("");
  const lowerBusca = busca.toLowerCase();
  const onChangeBusca = (busca) => setBusca(busca);
  {/*{const {
    usuarioId,
    conversas,
    setConversas,
    setConversaSelecionada,
    imagemPerfilPadrão,
  } = useContext(ChatContext);

  const cliqueNaConversa = (conversa) => {
    return async (e) => {
      e.preventDefault();

      const index = conversas.findIndex(({ id }) => id === conversa.id);
      const copiaConversas = objCopiaProfunda(conversas);

      const conversaNaLista = copiaConversas[index];

      if (conversaNaLista.mensagensNaoVistas) {
        conversaNaLista.mensagensNaoVistas = 0;
        await managerService.UpdateMensagensVisualizadas(
          usuarioId,
          conversa.id
        );
      }
      setConversaSelecionada(conversaNaLista);
      setConversas(copiaConversas);
      navigation.navigate("ConversaAberta");
    };
  };*/}

  const vetorUsuariosMensagem = [
    {
      id: "41b266f8-5bcd-4e74-94b0-465aefb0f9da",
      nome: "Matheus",
      ultimaMensagem: "teste Mensagem",
      //simagemPerfilPadrão: "avatar_url",
    },
    {
      id: "41b266f8-5bcd-4e74-94b0-465aefb0f9da",
      nome: "Matheus Dois",
      ultimaMensagem: "teste Mensagem dois",
      //imagemPerfilPadrão: "avatar_url",
    },
    {
      id: "41b266f8-5bcd-4e74-94b0-465aefb0f9da",
      nome: "Matheus Três",
      ultimaMensagem: "teste Mensagem três",
      //imagemPerfilPadrão: "avatar_url",
    },
]

const MensagensFiltradas = vetorUsuariosMensagem.filter((msg) => {
  if (lowerBusca === "") return vetorUsuariosMensagem;
  else
    return (
      msg?.nome
        ?.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(lowerBusca) ||
      msg?.nome?.toLowerCase().includes(lowerBusca)
    );
});

  return (
    <Body>

      <BarraPesquisa>
        <InputPesquisa
          placeholder="Pesquisar no chat"
          onChangeText={onChangeBusca}
          value={busca}
        />
        <IconPesquisa source={searchIcon} />
      </BarraPesquisa>

        <ScrollView>
          
          {MensagensFiltradas?.map((value, index) => (

            <CaixaUsuarioMensagem>
              <CaixaImagem>
                <ImagemUsuario
                  border-radius='3px'
                  source={require('../../../assets/logoGuilherme.png')}> 
                </ImagemUsuario>
              </CaixaImagem>
              <CaixaTexto>
                <TextoCaixa fontSize = "17px" >{value.nome} </TextoCaixa>
                <TextoCaixa fontSize = "13px">Última Mensagem: {value.ultimaMensagem} </TextoCaixa>
              </CaixaTexto>
            </CaixaUsuarioMensagem>

        ))}
            
      </ScrollView>

      <Botao
        height="40px"
        width="70%"
        backgroundColor={"green"}
        borderRadius="10px"
        borderWidth="1px"
        borderColor={"green"}
      >
        <ConteudoBotao fontSize="15px" color={Cores.branco} width="100%">
          Iniciar Nova Conversa
        </ConteudoBotao>
      </Botao>

    </Body>
  );
}

export default BarraLateral;
