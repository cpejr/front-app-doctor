import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useDebugValue,
} from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  Modal,
} from "react-native";
import {
  Body,
  HeaderConversaAberta,
  FundoConversaAberta,
  FooterConversaAberta,
  BarraEnviarMensagemConversaAberta,
  TextoMensagem,
  MensagemEnviada,
  TextoMensagemEnviada,
  MensagemRecebida,
  HoraMensagem,
  ImagemUsuario,
  CaixaTexto,
  PaginaCarregando,
  CaixaExterna,
  CaixaFechar,
  CaixaModalUpdateFoto,
  CaixaTituloModal,
  TituloModal,
  ImagemModal,
  CaixaBotoesCancelarConfirmarModalExcluirFoto,
} from "./Styles";
//import { Tooltip } from 'react-native-elements';
import { Cores } from "../../variaveis";
import Mensagem from "../Mensagem/Mensagem";
import IconeMaterial from "react-native-vector-icons/MaterialIcons";
import IconeIon from "react-native-vector-icons/Ionicons";
import IconeFoundation from "react-native-vector-icons/Foundation";
import Icon from "react-native-vector-icons/Entypo";
import Icone from "react-native-vector-icons/AntDesign";
import {
  ActivityIndicator,
  Colors,
  Searchbar,
  Provider,
  Menu,
  Divider,
} from "react-native-paper";
import { ChatContext } from "../../contexts/ChatContext/ChatContext";
import objCopiaProfunda from "../../utils/objCopiaProfunda";
import * as managerService from "../../services/ManagerService/managerService";
import checarObjVazio from "../../utils/checarObjVazio";
import moverArray from "../../utils/moverArray";
import { sleep } from "../../utils/sleep";
import Botao from "../../styles/Botao";
import ConteudoBotao from "../../styles/ConteudoBotao";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

function ConversaAberta({ navigation, route, socket }) {
  const [usuarioAtual, setUsuarioAtual] = useState({});
  const [conversinha, setConversinha] = useState({});
  const [inputMensagemConteudo, setInputMensagemConteudo] = useState("");
  const [carregandoConversa, setCarregandoConversa] = useState(true);
  const [carregandoEnvioMensagem, setCarregandoEnvioMensagem] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [modalAdicionarFoto, setModalAdicionarFoto] = useState(false);
  const [modalAdicionarDocumento, setModalAdicionarDocumento] = useState(false);
  const { width, height } = useWindowDimensions();
  const [heightModalUpdateFoto, setHeightModalUpdateFoto] = useState();
  const [marginTopModais, setMarginTopModais] = useState();
  const [imagem64, setImagem64] = useState(null);
  const [imagem, setImagem] = useState(null);
  const [arquivo, setArquivo] = useState(null);
  const tamanhoIcone = width > 480 ? 20 : 25;
  const tamanhoImagem = width > 2000 ? "400" : "180";
  const tamanhoImagemModal = width > 2000 ? "400px" : "180px";
  const [carregandoDeletarFoto, setCarregandoDeletarFoto] = useState(false);
  const [visivel, setVisivel] = React.useState(false);
  const [permissaoParaAbrirAGaleria, setPermissaoParaAbrirAGaleria] =
    useState(null);

  const openMenu = () => setVisivel(true);

  const closeMenu = () => setVisivel(false);

  function deixandoModaisResponsivos() {
    if (width > height) {
      setHeightModalUpdateFoto("85%");
      setMarginTopModais("0%");
    } else {
      setHeightModalUpdateFoto("60%");
      setMarginTopModais("0%");
    }
  }

  useEffect(() => {
    deixandoModaisResponsivos();
  }, [width, height]);

  useEffect(() => {
    (async () => {
      const StatusDaGaleria =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setPermissaoParaAbrirAGaleria(StatusDaGaleria.status === "granted");
    })();
  }, []);

  const selecionaImagem = async () => {
    let resultado = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!resultado.cancelled) {
      setImagem(resultado);
      setImagem64(`data:image/png;base64,${resultado.base64}`);
    }

    if (permissaoParaAbrirAGaleria === false) {
      Alert.alert("Erro", "Sem permissão de acesso à galeria");
    }
  };

  const selecionaDocumento = async () => {
    let resultado = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
    });

    // FileSystem.readAsStringAsync(resultado.uri, {
    //   encoding: FileSystem.EncodingType.Base64,
    // });
    // console.log(FileSystem.getContentUriAsync(resultado.uri));

    try {
      const response = await FileSystem.uploadAsync(`http://localhost:3333/arquivofile`, resultado.uri, {
        fieldName: 'file',
        httpMethod: 'POST',
      });
      console.log(JSON.stringify(response, null, 4));
    } catch (error) {
      console.log(error);
    }
  };

  function fechandoModalEditarFoto() {
    setModalAdicionarFoto(false);
    setImagem(null);
    setImagem64(null);
  }

  function fechandoModalDocumento() {
    setModalAdicionarDocumento(false);
    setArquivo(null);
  }

  const {
    usuarioId,
    conversaSelecionada,
    setConversaSelecionada,
    imagemPerfilPadrão,
    conversas,
    setConversas,
    mensagens,
    setMensagens,
  } = useContext(ChatContext);
  const componenteEstaMontadoRef = useRef(null);
  const scrollRef = useRef(null);
  const inputMensagemConteudoRef = useRef(null);

  async function getDadosUsuarioAtual(componenteEstaMontadoRef) {
    const { dadosUsuario } = await managerService.GetDadosUsuario();

    if (componenteEstaMontadoRef) {
      setUsuarioAtual(dadosUsuario);
      setCarregandoConversa(false);
    }

    getDadosUsuarioAtual(componenteEstaMontadoRef);
  }
  useEffect(() => {
    componenteEstaMontadoRef.current = true;

    getDadosUsuarioAtual(componenteEstaMontadoRef.current);

    return () => (componenteEstaMontadoRef.current = false);
  }, []);

  async function getMensagens(componenteEstaMontadoRef) {
    if (checarObjVazio(conversaSelecionada) || !usuarioId) return;

    const resposta = await managerService.GetMensagensPorConversaUsuario(
      usuarioId,
      conversaSelecionada.id
    );

    if (componenteEstaMontadoRef) {
      setMensagens(resposta);
      await managerService.UpdateMensagensVisualizadas(
        usuarioId,
        conversaSelecionada.id
      );
    }
  }
  var frequencia;

  function startTemporizador() {
    frequencia = setInterval(function () {
      getMensagens();
    }, 5000);
  }
  useEffect(() => {
    startTemporizador();
  }, []);
  useEffect(() => {
    componenteEstaMontadoRef.current = true;

    getMensagens(componenteEstaMontadoRef.current);

    return () => (componenteEstaMontadoRef.current = false);
  }, [conversaSelecionada, usuarioId]);

  useEffect(() => {
    inputMensagemConteudoRef?.current?.focus();
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  const atualizarBarraLateral = (novaMensagem) => {
    const id_conversa = novaMensagem.id_conversa;

    const index = conversas.findIndex(({ id }) => id === id_conversa);
    const copiaConversas = objCopiaProfunda(conversas);
    const conversaNaLista = copiaConversas[index];

    conversaNaLista.ultima_mensagem = novaMensagem;

    setConversas(moverArray(copiaConversas, index, 0));
  };

  const enviarConversa = async (ultima_mensagem) => {
    const index = conversas.findIndex(
      ({ id }) => id === conversaSelecionada.id
    );
    const copiaConversas = objCopiaProfunda(conversas);
    const conversaNaLista = copiaConversas[index];

    conversaNaLista.ativada = true;

    setConversaSelecionada(conversaNaLista);
    setConversas(copiaConversas);

    await managerService.UpdateConversaAtiva(conversaSelecionada.id);

    const {
      id,
      conversaCom: { id: receptorId },
    } = copiaConversas[index];

    const conversaParaEnvio = {
      id,
      ativada: true,
      mensagensNaoVistas: 1,
      ultima_mensagem: {
        ...ultima_mensagem,
        pertenceAoUsuarioAtual: false,
      },
      conversaCom: {
        id: usuarioAtual?.id,
        nome: usuarioAtual?.nome,
        avatar_url: usuarioAtual?.avatar_url,
      },
    };

    socket.emit("enviarConversa", {
      novaConversa: conversaParaEnvio,
      receptorId,
    });
  };

  async function enviarMensagemComImagem() {
    setCarregandoDeletarFoto(true);

    let urlS3 = await managerService.enviarImagemMensagem(imagem64);

    console.log(urlS3);

    const horaAtual = new Date().getHours();
    const horarioComercial = horaAtual >= 7 && horaAtual < 21 ? true : false;

    const remetente =
      conversas[conversas.findIndex(({ id }) => id === conversaSelecionada.id)]
        .conversaCom;

    let texto = "Imagem";

    if (!horarioComercial) {
      id_remetente = remetente.id;
      texto =
        "Obrigado pela sua mensagem!\n" +
        "Estarei fora do consultório de 19h até 7h e não poderei responder durante esse período.\n" +
        "Se tiver um assunto urgente favor responder ao formulário de Emergência.";
    }

    const dadosParaCriarNovaMensagem = {
      id_conversa: conversaSelecionada.id,
      id_usuario: usuarioId,
      media_url: urlS3,
      foi_visualizado: false,
      conteudo: texto,
    };

    const { data_cricao, data_atualizacao, media_url, ...dados } =
      await managerService.CriandoMensagem(dadosParaCriarNovaMensagem);

    const novaMensagem = {
      ...dados,
      pertenceAoUsuarioAtual: horarioComercial,
    };

    if (conversaSelecionada.ativada) {
      // socket.emit("enviarMensagem", {
      //   novaMensagem,
      //   receptorId: conversaSelecionada.conversaCom.id,
      // });
    } else {
      enviarConversa(novaMensagem);
    }

    atualizarBarraLateral(novaMensagem);

    setMensagens((mensagensLista) => [...mensagensLista, novaMensagem]);

    setCarregandoDeletarFoto(false);
  }

  const enviarMensagem = async (e) => {
    e.preventDefault();

    if (!inputMensagemConteudo) return;

    const horaAtual = new Date().getHours();
    const horarioComercial = horaAtual >= 7 && horaAtual < 21 ? true : false;

    const remetente =
      conversas[conversas.findIndex(({ id }) => id === conversaSelecionada.id)]
        .conversaCom;

    let id_remetente = usuarioId;
    let texto = inputMensagemConteudo;

    if (!horarioComercial) {
      id_remetente = remetente.id;
      texto =
        "Obrigado pela sua mensagem!\n" +
        "Estarei fora do consultório de 19h até 7h e não poderei responder durante esse período.\n" +
        "Se tiver um assunto urgente favor responder ao formulário de Emergência.";
    }

    setCarregandoEnvioMensagem(true);
    const dadosParaCriarNovaMensagem = {
      id_conversa: conversaSelecionada.id,
      id_usuario: id_remetente,
      media_url: media_url,
      foi_visualizado: false,
      conteudo: texto,
    };

    if (horarioComercial) {
      setInputMensagemConteudo("");
    }

    const { data_cricao, data_atualizacao, media_url, ...dados } =
      await managerService.CriandoMensagem(dadosParaCriarNovaMensagem);

    const novaMensagem = {
      ...dados,
      pertenceAoUsuarioAtual: horarioComercial,
    };

    if (conversaSelecionada.ativada) {
      // socket.emit("enviarMensagem", {
      //   novaMensagem,
      //   receptorId: conversaSelecionada.conversaCom.id,
      // });
    } else {
      enviarConversa(novaMensagem);
    }

    atualizarBarraLateral(novaMensagem);

    setMensagens((mensagensLista) => [...mensagensLista, novaMensagem]);

    setCarregandoEnvioMensagem(false);
  };
  return (
    <Provider>
      <Body>
        <HeaderConversaAberta>
          <Icon
            name="arrow-left"
            size={32}
            color={Cores.azul}
            onPress={() => navigation.push("BarraLateral")}
          />
          {conversaSelecionada.conversaCom.imagem ? (
            <ImagemUsuario
              border-radius="3px"
              source={{ uri: conversaSelecionada.conversaCom.imagem }}
            ></ImagemUsuario>
          ) : (
            <ImagemUsuario
              border-radius="3px"
              source={imagemPerfilPadrão}
            ></ImagemUsuario>
          )}
          <CaixaTexto>
            <TextoMensagem color={Cores.azul} fontSize="20px" fontWeight="bold">
              {conversaSelecionada.conversaCom.nome}
            </TextoMensagem>
          </CaixaTexto>
        </HeaderConversaAberta>

        <FundoConversaAberta>
          {carregandoConversa ? (
            <PaginaCarregando>
              <ActivityIndicator animating={true} color={Colors.black} />
            </PaginaCarregando>
          ) : (
            <ScrollView
              ref={(ref) => {
                this.scrollView = ref;
              }}
              onContentSizeChange={() =>
                this.scrollView.scrollToEnd({ animated: true })
              }
            >
              {mensagens?.map((mensagem, idx) => (
                <Mensagem
                  key={idx}
                  pertenceAoUsuarioAtual={mensagem.pertenceAoUsuarioAtual}
                  conteudo={mensagem.conteudo}
                  data_criacao={mensagem.data_criacao}
                  media_url={mensagem.media_url}
                />
              ))}
            </ScrollView>
          )}
        </FundoConversaAberta>

        <FooterConversaAberta>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              elevation: 0,
            }}
          >
            <Menu
              style={{
                top: 510,
                left: 10,
                position: "absolute",
                zIndex: 100,
                elevation: 100,
              }}
              visible={visivel}
              onDismiss={closeMenu}
              anchorPosition="top"
              anchor={
                <TouchableOpacity onPress={openMenu}>
                  <IconeFoundation
                    name="paperclip"
                    size={33}
                    color={Cores.azulEscuro}
                  />
                </TouchableOpacity>
              }
            >
              <Menu.Item
                onPress={() => {
                  setModalAdicionarDocumento(true);
                }}
                title="Enviar Documento"
              />
              <Divider />
              <Menu.Item
                onPress={() => {
                  setModalAdicionarFoto(true);
                }}
                title="Enviar Imagem"
              />
            </Menu>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalAdicionarFoto}
          >
            <CaixaExterna height={height} width={width}>
              <CaixaModalUpdateFoto
                height={heightModalUpdateFoto}
                marginTop={marginTopModais}
              >
                <CaixaFechar>
                  <TouchableOpacity
                    onPress={() => {
                      fechandoModalEditarFoto();
                    }}
                  >
                    <Icone name="close" size={tamanhoIcone}></Icone>
                  </TouchableOpacity>
                </CaixaFechar>
                <CaixaTituloModal>
                  <TituloModal>Selecione uma imagem para enviar:</TituloModal>
                  {imagem === null ? (
                    <Botao
                      width={tamanhoImagemModal}
                      height={tamanhoImagemModal}
                      backgroundColor={Cores.cinza[11]}
                      borderRadius="3px"
                      borderColor={Cores.cinza[9]}
                      borderWidth="3px"
                      boxShadow="none"
                      onPress={() => selecionaImagem()}
                    >
                      <ConteudoBotao
                        width="90px"
                        fontSize="20px"
                        color={Cores.azul}
                      >
                        +
                      </ConteudoBotao>
                    </Botao>
                  ) : (
                    <ImagemModal
                      width={tamanhoImagem}
                      height={tamanhoImagem}
                      source={imagem}
                    ></ImagemModal>
                  )}
                  <CaixaBotoesCancelarConfirmarModalExcluirFoto>
                    <Botao
                      width="40%"
                      height="35px"
                      backgroundColor={Cores.branco}
                      borderRadius="3px"
                      borderColor="rgba(255, 0, 0, 0.25)"
                      borderWidth="3px"
                      boxShadow="none"
                      onPress={() => fechandoModalEditarFoto()}
                    >
                      <ConteudoBotao
                        width="100%"
                        fontSize="12px"
                        color={Cores.preto}
                      >
                        CANCELAR
                      </ConteudoBotao>
                    </Botao>
                    <Botao
                      width="40%"
                      height="35px"
                      backgroundColor={Cores.lilas[1]}
                      borderRadius="4px"
                      borderColor={Cores.azul}
                      borderWidth="3px"
                      boxShadow="none"
                      onPress={() => enviarMensagemComImagem()}
                    >
                      {carregandoDeletarFoto ? (
                        <ActivityIndicator
                          animating={true}
                          color={Cores.branco}
                        />
                      ) : (
                        <ConteudoBotao
                          width="100%"
                          fontSize="12px"
                          color={Cores.branco}
                        >
                          CONFIRMAR
                        </ConteudoBotao>
                      )}
                    </Botao>
                  </CaixaBotoesCancelarConfirmarModalExcluirFoto>
                </CaixaTituloModal>
              </CaixaModalUpdateFoto>
            </CaixaExterna>
          </Modal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalAdicionarDocumento}
          >
            <CaixaExterna height={height} width={width}>
              <CaixaModalUpdateFoto
                height={heightModalUpdateFoto}
                marginTop={marginTopModais}
              >
                <CaixaFechar>
                  <TouchableOpacity
                    onPress={() => {
                      fechandoModalDocumento();
                    }}
                  >
                    <Icone name="close" size={tamanhoIcone}></Icone>
                  </TouchableOpacity>
                </CaixaFechar>
                <CaixaTituloModal>
                  <TituloModal>
                    Selecione um Arquivo PDF para enviar:
                  </TituloModal>
                  {arquivo === null ? (
                    <Botao
                      width="170px"
                      height="170px"
                      backgroundColor={Cores.cinza[11]}
                      borderRadius="3px"
                      borderColor={Cores.cinza[9]}
                      borderWidth="3px"
                      boxShadow="none"
                      onPress={() => selecionaDocumento()}
                    >
                      <ConteudoBotao
                        width="160px"
                        fontSize="20px"
                        color={Cores.azul}
                      >
                        Selecionar Arquivo
                      </ConteudoBotao>
                    </Botao>
                  ) : (
                    <Text>Selecionado</Text>
                  )}
                  <CaixaBotoesCancelarConfirmarModalExcluirFoto>
                    <Botao
                      width="40%"
                      height="35px"
                      backgroundColor={Cores.branco}
                      borderRadius="3px"
                      borderColor="rgba(255, 0, 0, 0.25)"
                      borderWidth="3px"
                      boxShadow="none"
                      onPress={() => fechandoModalDocumento()}
                    >
                      <ConteudoBotao
                        width="100%"
                        fontSize="12px"
                        color={Cores.preto}
                      >
                        CANCELAR
                      </ConteudoBotao>
                    </Botao>
                    <Botao
                      width="40%"
                      height="35px"
                      backgroundColor={Cores.lilas[1]}
                      borderRadius="4px"
                      borderColor={Cores.azul}
                      borderWidth="3px"
                      boxShadow="none"
                      /* onPress={() => updateFoto()} */
                    >
                      {carregandoDeletarFoto ? (
                        <ActivityIndicator
                          animating={true}
                          color={Cores.branco}
                        />
                      ) : (
                        <ConteudoBotao
                          width="100%"
                          fontSize="12px"
                          color={Cores.branco}
                        >
                          CONFIRMAR
                        </ConteudoBotao>
                      )}
                    </Botao>
                  </CaixaBotoesCancelarConfirmarModalExcluirFoto>
                </CaixaTituloModal>
              </CaixaModalUpdateFoto>
            </CaixaExterna>
          </Modal>
          <BarraEnviarMensagemConversaAberta
            placeholder="Mensagem"
            onChangeText={(e) => setInputMensagemConteudo(e)}
            value={inputMensagemConteudo}
            ref={inputMensagemConteudoRef}
          ></BarraEnviarMensagemConversaAberta>
          <IconeMaterial
            name="send"
            size={30}
            color={Cores.azulEscuro}
            onPress={enviarMensagem}
          />
        </FooterConversaAberta>
      </Body>
    </Provider>
  );
}

export default ConversaAberta;
