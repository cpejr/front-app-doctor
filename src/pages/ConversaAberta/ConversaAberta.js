import { Text, View, ScrollView, Image, TouchableOpacity, KeyboardAvoidingView, ToastAndroid } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Modal,
} from "react-native";
import {
  ArquivoSelecionado,
  BarraEnviarMensagemConversaAberta,
  Body,
  BotaoRodaPe,
  CaixaBotoesCancelarConfirmarModalExcluirFoto,
  CaixaExterna,
  CaixaFechar,
  CaixaModalUpdateFoto,
  CaixaTexto,
  CaixaTituloModal,
  FooterConversaAberta,
  FundoConversaAberta,
  HeaderConversaAberta,
  ImagemModal,
  ImagemUsuario,
  PaginaCarregando,
  ScrollMensagemTablet,
  TextoMensagem,
  TituloModal,
} from "./Styles";
//import { Tooltip } from 'react-native-elements';
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import {
  ActivityIndicator,
  Colors,
  Divider,
  Menu,
  Provider,
} from "react-native-paper";
import Icone from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/Entypo";
import IconeFoundation from "react-native-vector-icons/Foundation";
import IconeMaterial from "react-native-vector-icons/MaterialIcons";
import { ChatContext } from "../../contexts/ChatContext/ChatContext";
import * as managerService from "../../services/ManagerService/managerService";
import Botao from "../../styles/Botao";
import ConteudoBotao from "../../styles/ConteudoBotao";
import checarObjVazio from "../../utils/checarObjVazio";
import moverArray from "../../utils/moverArray";
import objCopiaProfunda from "../../utils/objCopiaProfunda";
import { Cores } from "../../variaveis";
import Mensagem from "../Mensagem/Mensagem";
import {useWindowDimensions} from 'react-native';

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
  const [tablet, setTablet] = useState(false);
  const [imagem64, setImagem64] = useState(null);
  const [imagem, setImagem] = useState(null);
  const [arquivo, setArquivo] = useState(null);
  const [tamanhoArquivo, setTamanhoArquivo] = useState();
  const tamanhoIcone = width > 480 ? 20 : 25;
  const tamanhoImagem = width > 2000 ? "400" : "180";
  const tamanhoImagemModal = width > 2000 ? "400px" : "180px";
  const [carregandoArquivo, setCarregandoarquivo] = useState(false);
  const [visivel, setVisivel] = React.useState(false);
  const [permissaoParaAbrirAGaleria, setPermissaoParaAbrirAGaleria] =
    useState(null);

  const [nomeArquivo, setNomeArquivo] = useState("");

  const openMenu = () => setVisivel(true);

  const closeMenu = () => setVisivel(false);

  function deixandoModaisResponsivos() {
    if (width > height) {
      setHeightModalUpdateFoto("85%");
      setMarginTopModais("0%");
      setTablet(true);
    } else {
      setHeightModalUpdateFoto("60%");
      setMarginTopModais("0%");
      setTablet(false);
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
      quality: 1,
      //ImagePickerAsset: {fileSize}
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
      type: "application/pdf",
    });

    const file64 = await FileSystem.readAsStringAsync(resultado.uri, {
      encoding: "base64",
    });

    // var tamanho;
    // if (resultado.size < 1000000 ){
    //   tamanho = resultado.size/1000;
    //   tamanho = tamanho.toFixed(2);
    //   setTamanhoArquivo(tamanho + "KB");
    // } else {
    //   tamanho = resultado.size/1000000;
    //   tamanho = tamanho.toFixed(2);
    //   setTamanhoArquivo(tamanho + "MB");
    // }

    setArquivo(`data:application/pdf;base64,${file64}`);

    setNomeArquivo(resultado.name);
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
      getMensagens(true);
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

  async function enviarMensagemComMidia(Mediatype) {
    if (arquivo === null && imagem64 === null) {
      Alert.alert("Erro", "Selecione um arquivo para enviar!");
      return;
    }

    setCarregandoarquivo(true);

    let urlS3;
    let texto;

    if (Mediatype === "Imagem") {
      urlS3 = await managerService.enviarImagemMensagem(imagem64);
      texto = "Imagem";
    } else if (Mediatype === "ArquivoPDF") {
      urlS3 = await managerService.enviarArquivoMensagem(arquivo);
      texto = "Arquivo PDF";
    } else return;

    closeMenu();
    fechandoModalEditarFoto();
    fechandoModalDocumento();

    const horaAtual = new Date().getHours();
    const horarioComercial = horaAtual >= 7 && horaAtual < 21 ? true : false;

    const remetente =
      conversas[conversas.findIndex(({ id }) => id === conversaSelecionada.id)]
        .conversaCom;

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

    setCarregandoarquivo(false);
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
      media_url: "media_url",
      foi_visualizado: false,
      conteudo: texto,
    };

    if (horarioComercial) {
      setInputMensagemConteudo("");
    }

    let { data_cricao, data_atualizacao, media_url, ...dados } =
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
          onPress={() => navigation.navigate("BarraLateral")}
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
      <KeyboardAvoidingView style={{ flex: 1}} behavior="padding" enabled   keyboardVerticalOffset={-121}>
      <FundoConversaAberta>
         {carregandoConversa ? (
            <PaginaCarregando>
              <ActivityIndicator animating={true} color={Colors.black} />
            </PaginaCarregando>
          ) : (
            <>
              {tablet ? (
                <ScrollMensagemTablet
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
                      //tamanho_arquivo={0}
                    />
                  ))}
                </ScrollMensagemTablet>
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
                      tamanho_arquivo={0}
                    />
                  ))}
                </ScrollView>
              )}
            </>
          )}
        </FundoConversaAberta>

        <FooterConversaAberta>
          {tablet == true ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                elevation: 0,
              }}
            >
              <Menu
                style={{
                  top: 155,
                  left: 10,
                  position: "absolute",
                  zIndex: 100,
                  elevation: 100,
                }}
                visible={visivel}
                onDismiss={closeMenu}
                anchorPosition="top"
                anchor={
                  <BotaoRodaPe onPress={openMenu} paddingLeft="18px">
                    <IconeFoundation
                      name="paperclip"
                      size={33}
                      color={Cores.azulEscuro}
                    />
                  </BotaoRodaPe>
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
          ) : (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                elevation: 0,
              }}
            >
              <Menu
                style={{
                  top: 465,
                  left: 10,
                  position: "absolute",
                  zIndex: 100,
                  elevation: 100,
                }}
                visible={visivel}
                onDismiss={closeMenu}
                anchorPosition="top"
                anchor={
                  <BotaoRodaPe onPress={openMenu} paddingRight="12px">
                    <IconeFoundation
                      name="paperclip"
                      size={33}
                      color={Cores.azulEscuro}
                    />
                  </BotaoRodaPe>
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
          )}
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
                      onPress={() => enviarMensagemComMidia("Imagem")}
                    >
                      {carregandoArquivo ? (
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
                      width="auto"
                      height="auto"
                      backgroundColor={Cores.cinza[11]}
                      borderRadius="3px"
                      borderColor={Cores.cinza[9]}
                      borderWidth="3px"
                      boxShadow="none"
                      padding="8px;"
                      onPress={() => selecionaDocumento()}
                    >
                      <Icone
                        name="folderopen"
                        size={25}
                        color={Cores.azul}
                        style={{ marginRight: 10 }}
                      />
                      <ConteudoBotao
                        width="auto"
                        fontSize="20px"
                        color={Cores.azul}
                      >
                        Selecionar
                      </ConteudoBotao>
                    </Botao>
                  ) : (
                    <ArquivoSelecionado>
                      <Icone
                        name="pdffile1"
                        size={25}
                        color={Cores.azul}
                        style={{ marginRight: 5 }}
                      />
                      <ConteudoBotao
                        width="auto"
                        fontSize="20px"
                        color={Cores.azul}
                      >
                        {nomeArquivo}
                      </ConteudoBotao>
                    </ArquivoSelecionado>
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
                      onPress={() => enviarMensagemComMidia("ArquivoPDF")}
                    >
                      {carregandoArquivo ? (
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
        </FooterConversaAberta></ KeyboardAvoidingView>
      </Body>
    </Provider>
  );
}

export default ConversaAberta;
