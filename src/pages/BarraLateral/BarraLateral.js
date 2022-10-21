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
  PaginaCarregando,
} from "./Styles";
import searchIcon from "../../assets/searchIcon.png";
import * as managerService from "../../services/ManagerService/managerService";
import Botao from "../../styles/Botao";
import ConteudoBotao from "../../styles/ConteudoBotao";
import { Cores } from "../../variaveis";
import { ActivityIndicator, Colors, Searchbar } from "react-native-paper";
import { ChatContext } from "../../contexts/ChatContext/ChatContext";
import objCopiaProfunda from "../../utils/objCopiaProfunda";

function BarraLateral({ navigation }) {
  const [busca, setBusca] = useState("");
  const lowerBusca = busca.toLowerCase();
  const onChangeBusca = (busca) => setBusca(busca);
  const [carregando, setCarregando] = useState(false);

  const {
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
    };
  };

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

  // async function abrirMensagemClicada(conversa) {
  //   if (conversa.id) {
  //     navigation.push("ConversaAberta", {
  //       paramKey: conversa,
  //     });
  //   } else {
  //     Alert.alert("Erro ao abrir a conversa.");
  //   }
  // }

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
          {conversas?.map((value, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => {
                cliqueNaConversa(value);
              }}
            >
              <CaixaUsuarioMensagem>
                <CaixaImagem>
                  <ImagemUsuario
                    border-radius="3px"
                    source={value.conversaCom.imagemPerfil}
                  ></ImagemUsuario>
                </CaixaImagem>
                <CaixaTexto>
                  <TextoCaixa fontSize="17px">
                    {value.conversaCom.nome}
                  </TextoCaixa>
                  <TextoCaixa
                    fontSize="13px"
                    naoVisto={value.mensagensNaoVistas}
                  >
                    {value?.ultima_mensagem?.pertenceAoUsuarioAtual && "Você: "}
                    {value?.ultima_mensagem?.conteudo}
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
