import React, { useContext, useState, useEffect, useRef } from "react";
import { Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
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
  PaginaCarregando
} from "./Styles";
import searchIcon from "../../../assets/searchIcon.png";
import * as managerService from "../../../services/ManagerService/managerService";
import Botao from "../../../styles/Botao";
import ConteudoBotao from "../../../styles/ConteudoBotao";
import { Cores } from "../../../variaveis";
import { ActivityIndicator, Colors, Searchbar } from "react-native-paper";

function BarraLateral({ navigation }) {
  const [busca, setBusca] = useState("");
  const lowerBusca = busca.toLowerCase();
  const onChangeBusca = (busca) => setBusca(busca);
  const [carregando, setCarregando] = useState(false);

  const imagemPerfilPadrão = require("../../../assets/logoGuilherme.png");

  const vetorUsuariosMensagem = [
    {
      id: "41b266f8-5bcd-4e74-94b0-465aefb0f9dab",
      nome: "Matheus",
      ultimaMensagem: "teste Mensagem",
      imagemPerfil: imagemPerfilPadrão,
    },
    {
      id: "41b266f8-5bcd-4e74-94b0-4d6aefb0f9dab",
      nome: "Matheus",
      ultimaMensagem: "teste Mensagem",
      imagemPerfil: imagemPerfilPadrão,
    },
    {
      id: "41b266f8-5bcd-4e74-94b0-g65aefb0f9dab",
      nome: "Matheus",
      ultimaMensagem: "teste Mensagem",
      imagemPerfil: imagemPerfilPadrão,
    },
    {
      id: "41f266f8-5bcd-4e74-94b0-465aefb0f9dab",
      nome: "Matheus",
      ultimaMensagem: "teste Mensagem",
      imagemPerfil: imagemPerfilPadrão,
    },
    {
      id: "41b266g8-5bcd-4e74-94b0-465aefb0f9dab",
      nome: "Matheus",
      ultimaMensagem: "teste Mensagem",
      imagemPerfil: imagemPerfilPadrão,
    },
    {
      id: "41b266f8b5bcd-4e74-94b0-465aefb0f9dac",
      nome: "Adrianus",
      ultimaMensagem: "teste Mensagem dois",
      imagemPerfil: imagemPerfilPadrão,
    },
    {
      id: "41b266f865bcd-4e74-94b0-465aefb0f9da",
      nome: "Laura Maria da Silva Carvalho Alexander Pardini Prado Neto ",
      ultimaMensagem:
        "teste Mensagem três agora com uma mensagem grnade muiti aaaa huttryturjfb ssss sss sss s sss sss sss s ss ss s s s ss ss ss ss s sss ",
      imagemPerfil: imagemPerfilPadrão,
    },
  ];

  const MensagensFiltradas = vetorUsuariosMensagem.filter((msg) => {
    if (lowerBusca === "") return vetorUsuariosMensagem;
    else
      return (
        msg?.nome
          ?.toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(lowerBusca) || msg?.nome?.toLowerCase().includes(lowerBusca)
      );
  });

  async function abrirMensagemClicada(conversa) {
    if (conversa.id) {
      navigation.push("ConversaAberta", {
        paramKey: conversa,
      });
    } else {
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
      {carregando ? (
        <PaginaCarregando>
          <ActivityIndicator animating={true} color={Colors.black} />
        </PaginaCarregando>
      ) : (
        <ScrollView>
          {MensagensFiltradas?.map((value) => (
            <TouchableOpacity
              onPress={() => {
                abrirMensagemClicada(value);
              }}
            >
              <CaixaUsuarioMensagem>
                <CaixaImagem>
                  <ImagemUsuario
                    border-radius="3px"
                    source={value.imagemPerfil}
                  ></ImagemUsuario>
                </CaixaImagem>
                <CaixaTexto>
                  <TextoCaixa fontSize="17px">{value.nome} </TextoCaixa>
                  <TextoCaixa fontSize="13px">
                    Última Mensagem: {value.ultimaMensagem}{" "}
                  </TextoCaixa>
                </CaixaTexto>
              </CaixaUsuarioMensagem>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

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
