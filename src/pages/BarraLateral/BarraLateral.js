import React, { useContext, useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  useWindowDimensions,
  TouchableHighlight,
} from "react-native";
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
  HeaderChat,
  PaginaCarregando,
  BolaAzul,
  UltimaMensagem,
  TextoBasico,
  ContainerIcone,
  CaixaModal,
  CaixaModalGrande,
  CaixaConteudoModal,
  CaixaFechar,
  CaixaTituloModal,
  TituloModal,
  CaixaExterna,
  PickerView,
  PickerSecretaria,
  CaixaInterna,
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
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/FontAwesome";
import { Alert } from "react-native";

const camposVaziosReferencia = {
  id_usuario: false,
};
const estadoIncial = {
  id_usuario: "",
};
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
  const [modalNovaMensagem, setModalNovaMensagem] = useState(false);
  const [tooltipVisivel, setTooltipVisivel] = useState(false);
  const [carregandoNovaConversa, setCarregandoNovaConversa] = useState(false)
  const [usuario, setUsuario] = useState([]);
  const [secretariaSelecionada, setSecretariaSelecionada] = useState("");
  const [nomeSecretariaSelecionada, setNomeSecretariaSelecionada] = useState();
  const [usuarios, setUsuarios] = useState([]);
  const [camposVazios, setCamposVazios] = useState({});
  const [estado, setEstado] = useState(estadoIncial);
  const [selecionaUsuarioId, setSelecionaUsuarioId] = useState("");
  const { usuarioId, conversas, setConversas, setConversaSelecionada } =
    useContext(ChatContext);

  const socket = useRef(null);
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;
  const alturaModal = width > height ? "70%" : "35%";
  const tamanhoIcone = width > 480 ? 35 : 25;
  const [campoVazioModal, setCampoVazioModal] = useState(false);

  const imagemPerfilPadrão = require("../../assets/logoGuilherme.png");

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

      for (var i = 0; i < resposta.length; i++) {
        if (resposta[i].conversaCom.avatar_url) {
          const imagem = await managerService.GetArquivoPorChave(
            resposta[i].conversaCom.avatar_url
          );
          resposta[i].conversaCom.imagem = imagem;
        }
      }
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

  // const MensagensFiltradas = vetorUsuariosMensagem.filter((msg) => {
  //   if (lowerBusca === "") return vetorUsuariosMensagem;
  //   else
  //     return (
  //       msg?.nome
  //         ?.toLowerCase()
  //         .normalize("NFD")
  //         .replace(/[\u0300-\u036f]/g, "")
  //         .includes(lowerBusca) || msg?.nome?.toLowerCase().includes(lowerBusca)
  //     );
  // });

  async function abrirMensagemClicada(conversa) {
    if (conversa.id) {
      navigation.push("ConversaAberta", {
        paramKey: conversa,
      });
    } else {
      Alert.alert("Erro ao abrir a conversa.");
    }
  }
  useEffect(() => {
    async function pegandoUsuarios() {
      if (!usuarioId) return;

      componenteEstaMontadoRef.current = true;

      const resposta = await managerService.GetTodosUsuarios();
      const pegaSecretaria = resposta.filter(
        (item) => item.tipo === "SECRETARIA(O)"
      );
      const conversasUsuariosIds = conversas.map(
        ({ conversaCom }) => conversaCom.id
      );
      setUsuario(pegaSecretaria);

      if (componenteEstaMontadoRef.current) {
        setUsuarios(usuarios);
        setCarregando(false);
      }
    }

    pegandoUsuarios();

    return () => (componenteEstaMontadoRef.current = false);
  }, [conversas, usuarioId]);


  function preenchendoDados(value) {
    setSelecionaUsuarioId(value);

    if (camposVazios.id_usuario) setCamposVazios({ id_usuario: false });

    setEstado({ id_usuario: value });
  }



  async function criarNovarConversa() {

    if(secretariaSelecionada === "")
    {
      setCampoVazioModal(true);
      Alert.alert("Erro!", "Selecione um usuário.");
    }
    else
    {
      setCarregandoNovaConversa(true);
      const dadosParaCriarNovaConversa = {
        id_criador: usuarioId,
        id_receptor: secretariaSelecionada.id,
        ativada: false,
      };
      const { id } = await managerService.CriandoConversa(
        dadosParaCriarNovaConversa
      );
      const novaConversa = {
        id,
        ativada: false,
        mensagensNaoVistas: 0,
        conversaCom: {
          id: secretariaSelecionada.id,
          nome: secretariaSelecionada.nome,
          avatar_url: secretariaSelecionada.avatar_url,
        },
      }

      Alert.alert("Sucesso!", "Conversa iniciada com sucesso.");
      setCarregandoNovaConversa(false);
      setModalNovaMensagem(false);
      setSecretariaSelecionada({});
      setConversaSelecionada(novaConversa);
      setConversas((conversasLista) => [novaConversa, ...conversasLista]);
      setCarregando(false);
      
    };


    
  }

  // useEffect(() => {
  //     pegandoUsuarios();
  // },[]);

  return (
    <Body>
      <HeaderChat>
        <BarraPesquisa>
          <InputPesquisa
            placeholder="Pesquisar no chat"
            onChangeText={onChangeBusca}
            value={busca}
          />
          <IconPesquisa source={searchIcon} />
        </BarraPesquisa>
      </HeaderChat>
      {carregando ? (
        <PaginaCarregando>
          <ActivityIndicator animating={true} color={Colors.black} />
        </PaginaCarregando>
      ) : (
        <ScrollView>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalNovaMensagem}
            destroyOnClose
          >
            <CaixaExterna width={width} height={height}>
              <CaixaModalGrande height={alturaModal}>
                <CaixaFechar>
                  <TouchableOpacity
                    onPress={() => {
                      setModalNovaMensagem(false);
                    }}
                  >
                    <Icon name="close" size={tamanhoIcone}></Icon>
                  </TouchableOpacity>
                </CaixaFechar>
                <CaixaInterna>
                  <CaixaTituloModal>
                    <TituloModal>Iniciar uma nova Conversa</TituloModal>
                  </CaixaTituloModal>
                  <PickerView camposVazios={campoVazioModal}>
                    <PickerSecretaria
                      selectedValue={nomeSecretariaSelecionada}
                      onValueChange={(itemValue, itemPosition) => {
                        setNomeSecretariaSelecionada(itemValue);
                        setCampoVazioModal(false);
                        setSecretariaSelecionada(usuario[itemPosition - 1]);
                      }}
                    >
                      <Picker.Item
                        style={{ fontSize: 15, color: "grey" }}
                        value={secretariaSelecionada}
                        label={"Selecione um(a) Secretário(a)"}
                        disable 
                      />

                      {usuario.map((value) => (
                        <Picker.Item
                          key={value.id}
                          style={{ fontSize: 15, color: "black" }}
                          value={value.nome}
                          label={value.nome}
                        />
                      ))}
                    </PickerSecretaria>
                  </PickerView>
                  <Botao
                    height="40px"
                    width="50%"
                    marginTop="0px"
                    backgroundColor={Cores.lilas[5]}
                    borderRadius="10px"
                    borderWidth="1px"
                    borderColor={Cores.azul}
                    onPress={() => criarNovarConversa()}
                  >
                 
                    {carregandoNovaConversa? 
                    <ActivityIndicator animating={true} color={Colors.black} />:  
                    <ConteudoBotao
                    fontSize="15px"
                    color={Cores.branco}
                    width="100%"
                    >
                      Confirmar
                    </ConteudoBotao>}
                  </Botao>
                </CaixaInterna>
              </CaixaModalGrande>
            </CaixaExterna>
          </Modal>
          {conversas.length === 0 ? (
            <View>
              <TextoBasico>
                Bem-vindo! Você ainda não tem nenhuma conversa.
              </TextoBasico>
            </View>
          ) : (
            <View>
              {ConversasFiltradas.map((conversa, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={cliqueNaConversa(conversa)}
                >
                  <CaixaUsuarioMensagem>
                    <CaixaImagem>
                      {conversa.conversaCom.imagem ? (
                        <ImagemUsuario
                          border-radius="3px"
                          source={{ uri: conversa.conversaCom.imagem }}
                        ></ImagemUsuario>
                      ) : (
                        <ImagemUsuario
                          border-radius="3px"
                          source={imagemPerfilPadrão}
                        ></ImagemUsuario>
                      )}
                    </CaixaImagem>
                    <CaixaTexto>
                      <TextoCaixa fontSize="17px">
                        {conversa.conversaCom.nome}
                      </TextoCaixa>
                      <UltimaMensagem>
                        <TextoCaixa
                          fontSize="13px"
                          naoVisto={conversa.mensagensNaoVistas}
                        >
                          {conversa?.ultima_mensagem?.pertenceAoUsuarioAtual &&
                            "Você: "}
                          {conversa?.ultima_mensagem?.conteudo}
                        </TextoCaixa>
                        {conversa.mensagensNaoVistas > 0 && (
                          <BolaAzul>{conversa.mensagensNaoVistas}</BolaAzul>
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
        backgroundColor={Cores.lilas[5]}
        borderRadius="10px"
        borderWidth="1px"
        borderColor={Cores.azul}
        marginTop="15px"
        onPress={() => setModalNovaMensagem(true)}
      >
        <ConteudoBotao fontSize="15px" color={Cores.branco} width="100%">
          Iniciar Nova Conversa
        </ConteudoBotao>
      </Botao>
    </Body>
  );
}

export default BarraLateral;
