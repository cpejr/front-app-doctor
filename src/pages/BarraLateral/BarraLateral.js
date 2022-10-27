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
  BolaAzul,
  UltimaMensagem,
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
  const componenteEstaMontadoRef = useRef(null);
  const [carregandoConversas, setCarregandoConversas] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    usuarioId,
    conversas,
    setConversas,
    setConversaSelecionada,
    imagemPerfilPadrão,
  } = useContext(ChatContext);

  useEffect(() => {
    if (!usuarioId) return;
    componenteEstaMontadoRef.current = true;

    async function getConversas() {
      setCarregandoConversas(true);
      const resposta = await managerService.GetConversasUsuario(usuarioId);
      if (componenteEstaMontadoRef.current) {
        setConversas(resposta);
        setCarregandoConversas(false);
      }
    }
    getConversas();
    return () => (componenteEstaMontadoRef.current = false);
  }, [usuarioId]);

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

      navigation.push("ConversaAberta", {
        paramKey: conversa,
      });
    };
  };

  const ConversasFiltradas = conversas.filter((c) => {
    if (lowerBusca === "") return conversas;
    else
      return (
        c?.conversaCom.nome
          ?.toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(lowerBusca) || c?.conversaCom.nome?.toLowerCase().includes(lowerBusca)
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
      {carregando ? (
        <PaginaCarregando>
          <ActivityIndicator animating={true} color={Colors.black} />
        </PaginaCarregando>
      ) : (
        <ScrollView>
          {ConversasFiltradas
            .map((c, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={cliqueNaConversa(c)}
              >
                <CaixaUsuarioMensagem>
                  <CaixaImagem>
                    <ImagemUsuario
                      border-radius="3px"
                      source={c.avatar_url || imagemPerfilPadrão}
                    ></ImagemUsuario>
                  </CaixaImagem>
                  <CaixaTexto>
                    <TextoCaixa fontSize="17px">
                      {c.conversaCom.nome}
                    </TextoCaixa>
                    <UltimaMensagem>
                      <TextoCaixa
                        fontSize="13px"
                        naoVisto={c.mensagensNaoVistas}
                      >
                        {c?.ultima_mensagem?.pertenceAoUsuarioAtual && "Você: "}
                        {c?.ultima_mensagem?.conteudo}
                      </TextoCaixa>
                      {c.mensagensNaoVistas > 0 && (
                        <BolaAzul>{c.mensagensNaoVistas}</BolaAzul>
                      )}
                    </UltimaMensagem>
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
