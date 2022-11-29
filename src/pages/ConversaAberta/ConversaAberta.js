import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useDebugValue,
} from "react";
import { Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
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
} from "./Styles";
//import { Tooltip } from 'react-native-elements';
import { Cores } from "../../variaveis";
import Mensagem from "../Mensagem/Mensagem";
import IconeMaterial from "react-native-vector-icons/MaterialIcons";
import IconeIon from "react-native-vector-icons/Ionicons";
import IconeFoundation from "react-native-vector-icons/Foundation";
import Icon from "react-native-vector-icons/Entypo";
import { ActivityIndicator, Colors, Searchbar } from "react-native-paper";
import { ChatContext } from "../../contexts/ChatContext/ChatContext";
import objCopiaProfunda from "../../utils/objCopiaProfunda";
import * as managerService from "../../services/ManagerService/managerService";
import checarObjVazio from "../../utils/checarObjVazio";
import moverArray from "../../utils/moverArray";
import { sleep } from "../../utils/sleep";

function ConversaAberta({ navigation, route, socket }) {
  const [usuarioAtual, setUsuarioAtual] = useState({});
  const [conversinha, setConversinha] = useState({});
  const [inputMensagemConteudo, setInputMensagemConteudo] = useState("");
  const [carregandoConversa, setCarregandoConversa] = useState(true);
  const [carregandoEnvioMensagem, setCarregandoEnvioMensagem] = useState(false);
  const [carregando, setCarregando] = useState(false);

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
      media_url: "nenhuma", // Futuramente permitir a opção de mandar mídias
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
              />
            ))}
          </ScrollView>
        )}
      </FundoConversaAberta>

      <FooterConversaAberta>
        <IconeFoundation name="paperclip" size={33} color={Cores.azulEscuro} />
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
  );
}

export default ConversaAberta;
