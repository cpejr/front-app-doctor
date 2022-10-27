import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useDebugValue,
} from "react";
import { Text, View, ScrollView, Image } from "react-native";
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
import { Cores } from "../../variaveis";
import IconeMaterial from "react-native-vector-icons/MaterialIcons";
import IconeIon from "react-native-vector-icons/Ionicons";
import IconeFoundation from "react-native-vector-icons/Foundation";
import Icon from "react-native-vector-icons/Entypo";
import { ActivityIndicator, Colors, Searchbar } from "react-native-paper";
import { ChatContext } from "../../contexts/ChatContext/ChatContext";
import objCopiaProfunda from "../../utils/objCopiaProfunda";
import * as managerService from "../../services/ManagerService/managerService";
import checarObjVazio from "../../utils/checarObjVazio";

function ConversaAberta({ navigation, route }) {
  const conversaClicada = route.params.paramKey;
  const [usuarioAtual, setUsuarioAtual] = useState({});
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

  useEffect(() => {
    componenteEstaMontadoRef.current = true;

    async function getDadosUsuarioAtual() {
      const { dadosUsuario } = await managerService.GetDadosUsuario();

      if (componenteEstaMontadoRef.current) {
        setUsuarioAtual(dadosUsuario);
        setCarregandoConversa(false);
      }
    }

    getDadosUsuarioAtual();

    return () => (componenteEstaMontadoRef.current = false);
  }, []);

  useEffect(() => {
    componenteEstaMontadoRef.current = true;

    async function getMensagens() {
      if (checarObjVazio(conversaSelecionada) || !usuarioId) return;

      const resposta = await managerService.GetMensagensPorConversaUsuario(
        usuarioId,
        conversaSelecionada.id
      );
      if (componenteEstaMontadoRef.current) setMensagens(resposta);
    }

    getMensagens();

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

    const horaAtual = moment().hours();
    const horarioComercial = horaAtual >= 7 && horaAtual < 19 ? true : false;

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
      socket.emit("enviarMensagem", {
        novaMensagem,
        receptorId: conversaSelecionada.conversaCom.id,
      });
    } else {
      enviarConversa(novaMensagem);
    }

    atualizarBarraLateral(novaMensagem);

    setMensagens((mensagensLista) => [...mensagensLista, novaMensagem]);

    setCarregandoEnvioMensagem(false);
  };

  const verificarEnter = (e) => {
    if (e.key === "Enter" && inputMensagemConteudo) {
      enviarMensagem(e);
    }
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
        <ImagemUsuario source={conversaClicada.imagemPerfil} />
        <CaixaTexto>
        <TextoMensagem color={Cores.azul} fontSize="20px" fontWeight="bold">
          {conversaClicada.nome}
        </TextoMensagem>
        </CaixaTexto>
      </HeaderConversaAberta>

      <FundoConversaAberta>
      {carregando ? 
        <PaginaCarregando>
          <ActivityIndicator animating={true} color={Colors.black} />
        </PaginaCarregando> :
        <ScrollView>
        <MensagemEnviada>
          <TextoMensagemEnviada>
            Lorem ipsum dolor sit amet. Eos eaque minima qui aliquid tempora non
            fuga omnis.
          </TextoMensagemEnviada>
          <HoraMensagem>11:00</HoraMensagem>
        </MensagemEnviada>
        <MensagemEnviada>
          <TextoMensagemEnviada>
            oi.
          </TextoMensagemEnviada>
          <HoraMensagem>11:02</HoraMensagem>
        </MensagemEnviada>
        <MensagemRecebida>
          <TextoMensagemEnviada>
            Lorem ipsum dolor sit amet. Non officiis deserunt ex delectus animi
            non exercitationem eius aut dolores facere? Qui saepe possimus non
            earum architecto vel autem nihil ut veniam quos nam fuga odio. Eos
            eaque minima qui aliquid tempora non fuga omnis.
          </TextoMensagemEnviada>
          <HoraMensagem>11:04</HoraMensagem>
        </MensagemRecebida>
        <MensagemRecebida>
          <TextoMensagemEnviada>
            Lorem ipsum dolor sit amet. 
          </TextoMensagemEnviada>
          <HoraMensagem>11:08</HoraMensagem>
        </MensagemRecebida>
        <MensagemRecebida>
          <TextoMensagemEnviada>
            Lorem ipsum dolor sit amet. 
          </TextoMensagemEnviada>
          <HoraMensagem>11:08</HoraMensagem>
        </MensagemRecebida>
        <MensagemRecebida>
          <TextoMensagemEnviada>
            Lorem ipsum dolor sit amet. 
          </TextoMensagemEnviada>
          <HoraMensagem>11:08</HoraMensagem>
        </MensagemRecebida>
        <MensagemRecebida>
          <TextoMensagemEnviada>
            Lorem ipsum dolor sit amet. 
          </TextoMensagemEnviada>
          <HoraMensagem>11:08</HoraMensagem>
        </MensagemRecebida>
        <MensagemRecebida>
          <TextoMensagemEnviada>
            Lorem ipsum dolor sit amet. 
          </TextoMensagemEnviada>
          <HoraMensagem>11:08</HoraMensagem>
        </MensagemRecebida>
        <MensagemRecebida>
          <TextoMensagemEnviada>
            Lorem ipsum dolor sit amet. 
          </TextoMensagemEnviada>
          <HoraMensagem>11:08</HoraMensagem>
        </MensagemRecebida>
        </ScrollView>}
      </FundoConversaAberta>

      <FooterConversaAberta>
        <IconeFoundation name="paperclip" size={33} color={Cores.azulEscuro} />
        <BarraEnviarMensagemConversaAberta
        placeholder="Mensagem">
        </BarraEnviarMensagemConversaAberta>
        <IconeMaterial name="send" size={30} color={Cores.azulEscuro} />
      </FooterConversaAberta>
    </Body>
  );
}

export default ConversaAberta;
