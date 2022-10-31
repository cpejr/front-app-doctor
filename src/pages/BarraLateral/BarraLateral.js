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
  TextoBasico
} from "./Styles";
import searchIcon from "../../assets/searchIcon.png";
import * as managerService from "../../services/ManagerService/managerService";
import Botao from "../../styles/Botao";
import ConteudoBotao from "../../styles/ConteudoBotao";
import { Cores } from "../../variaveis";
import { ActivityIndicator, Colors, Searchbar } from "react-native-paper";
import { ChatContext } from "../../contexts/ChatContext/ChatContext";
import objCopiaProfunda from "../../utils/objCopiaProfunda";
import io from "socket.io-client";
import checarObjVazio from "../../utils/checarObjVazio";

const BACK_END_URL = "http://127.0.0.1:3333";

function BarraLateral({ navigation }) {
  const [busca, setBusca] = useState("");
  const lowerBusca = busca.toLowerCase();
  const onChangeBusca = (busca) => setBusca(busca);
  const [carregando, setCarregando] = useState(false);
  const componenteEstaMontadoRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [mensagemRecebida, setMensagemRecebida] = useState({});
  const [conversaRecebida, setConversaRecebida] = useState({});
  const [carregandoConversas, setCarregandoConversas] = useState(true);

  const {
    usuarioId,
    conversas,
    setConversas,
    setConversaSelecionada,
    imagemPerfilPadrão,
  } = useContext(ChatContext);
  const socket = useRef(null);

  useEffect(() => {
    if (!usuarioId) return;

    componenteEstaMontadoRef.current = true;

    async function getConversas() {
      setCarregandoConversas(true);

      await managerService.deletarConversasInativas(usuarioId);
      const resposta = await managerService.GetConversasUsuario(usuarioId);

      if (componenteEstaMontadoRef.current) {
        setConversas(resposta);
        setCarregandoConversas(false);
      }
    }

    getConversas();

    return () => (componenteEstaMontadoRef.current = false);
  }, [usuarioId]);

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

  useEffect(() => {
    if (!usuarioId) return;

    socket.current = io(BACK_END_URL);

    socket.current.emit("adicionarUsuario", usuarioId);

    socket.current.on("mensagemRecebida", (novaMensagem) => {
      setMensagemRecebida(novaMensagem);
    });

    socket.current.on("conversaRecebida", (novaConversa) => {
      setConversaRecebida(novaConversa);
    });

    return () => {
      socket.current.off();
      socket.current.close();
    };
  }, [usuarioId]);

  useEffect(() => {
    if (checarObjVazio(mensagemRecebida) || !usuarioId) return;

    componenteEstaMontadoRef.current = true;

    async function atualizarBarraLateralNovaMensagem(novaMensagem) {
      const index = conversas?.findIndex(
        ({ id }) => id === novaMensagem.id_conversa
      );
      const copiaConversas = objCopiaProfunda(conversas);
      const conversaNaLista = copiaConversas[index];

      novaMensagem.pertenceAoUsuarioAtual = false;
      if (novaMensagem.id_conversa === conversaSelecionada.id) {
        setMensagens((mensagensLista) => [...mensagensLista, novaMensagem]);
        await managerService.UpdateMensagemVisualizada(novaMensagem.id, {
          foi_visualizado: true,
        });
      } else {
        conversaNaLista.mensagensNaoVistas++;
      }

      conversaNaLista.ultima_mensagem = novaMensagem;
      if (componenteEstaMontadoRef.current) {
        setConversas(moverArray(copiaConversas, index, 0));
      }
    }

    atualizarBarraLateralNovaMensagem(mensagemRecebida);
    setMensagemRecebida({});

    return () => (componenteEstaMontadoRef.current = false);
  }, [mensagemRecebida, usuarioId]);

  useEffect(() => {
    if (checarObjVazio(conversaRecebida)) return;

    function atualizarBarraLateralNovaConversa(novaConversa) {
      const index = conversas?.findIndex(
        (conversa) => conversa.id === novaConversa.id
      );

      if (index === -1) {
        return setConversas((conversasLista) => [
          novaConversa,
          ...conversasLista,
        ]);
      }

      const copiaConversas = objCopiaProfunda(conversas);
      copiaConversas[index] = novaConversa;

      setConversas(copiaConversas);
    }

    atualizarBarraLateralNovaConversa(conversaRecebida);
    setConversaRecebida({});
  }, [conversaRecebida, usuarioId]);

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

      navigation.navigate("ConversaAberta", {
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
          .includes(lowerBusca) ||
        c?.conversaCom.nome?.toLowerCase().includes(lowerBusca)
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
          {conversas.length === 0 ? (
            <View>
              <TextoBasico>Bem-vindo! Você ainda não tem nenhuma conversa.</TextoBasico>
            </View>
          ) : (
            <View>
              {ConversasFiltradas.map((c, idx) => (
                <TouchableOpacity key={idx} onPress={cliqueNaConversa(c)}>
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
                          {c?.ultima_mensagem?.pertenceAoUsuarioAtual &&
                            "Você: "}
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
            </View>
          )}
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
