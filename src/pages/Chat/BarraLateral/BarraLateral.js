import React, { useContext, useState, useEffect, useRef } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity} from "react-native";
import {
  BarraPesquisa,
  Body,
  InputPesquisa,
  IconPesquisa,
  ImagemUsuario,
  CaixaTexto,
  CaixaImagem,
  TextoCaixa,
  CaixaUsuarioMensagem,
} from "./Styles";
import searchIcon from "../../../assets/searchIcon.png";
import * as managerService from "../../../services/ManagerService/managerService";
import Botao from "../../../styles/Botao";
import ConteudoBotao from "../../../styles/ConteudoBotao";
import { Cores } from "../../../variaveis";

function BarraLateral({navigation}) {
  const [busca, setBusca] = useState("");
  const lowerBusca = busca.toLowerCase();
  const onChangeBusca = (busca) => setBusca(busca);

  const imagemPerfilPadrão = require('../../../assets/logoGuilherme.png');

  const vetorUsuariosMensagem = [
    {
      id: "41b266f8-5bcd-4e74-94b0-465aefb0f9dab",
      nome: "Matheus",
      ultimaMensagem: "teste Mensagem",
      imagemPerfil: imagemPerfilPadrão,
    },
    {
      id: "41b266f8-5bcd-4e74-94b0-465aefb0f9dac",
      nome: "Adrianus",
      ultimaMensagem: "teste Mensagem dois",
      imagemPerfil: imagemPerfilPadrão,
    },
    {
      id: "41b266f8-5bcd-4e74-94b0-465aefb0f9da",
      nome: "Laura",
      ultimaMensagem: "teste Mensagem três",
      imagemPerfil: imagemPerfilPadrão,
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

async function abrirMensagemClicada(conversa) {
  if(conversa.id)
  {
    navigation.push("ConversaAberta", {
      paramKey: conversa,
    });
  }
  else{
    Alert.alert("Erro ao abrir a conversa.");
  }
}

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

          {MensagensFiltradas?.map((value) => (
            <TouchableOpacity onPress={() => {abrirMensagemClicada(value)}}>
              <CaixaUsuarioMensagem>
                <CaixaImagem>
                  <ImagemUsuario
                    border-radius='3px'
                    source={value.imagemPerfil}> 
                  </ImagemUsuario>
                </CaixaImagem>
                <CaixaTexto>
                  <TextoCaixa fontSize = "17px" >{value.nome} </TextoCaixa>
                  <TextoCaixa fontSize = "13px">Última Mensagem: {value.ultimaMensagem} </TextoCaixa>
                </CaixaTexto>
                
              </CaixaUsuarioMensagem>
              </TouchableOpacity>
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
