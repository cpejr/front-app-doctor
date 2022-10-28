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
//import { Tooltip } from 'react-native-elements';
import { Cores } from "../../variaveis";
import  Mensagem  from '../Mensagem/Mensagem';
import IconeMaterial from "react-native-vector-icons/MaterialIcons";
import IconeIon from "react-native-vector-icons/Ionicons";
import IconeFoundation from "react-native-vector-icons/Foundation";
import Icon from "react-native-vector-icons/Entypo";
import { ActivityIndicator, Colors, Searchbar } from "react-native-paper";
import { ChatContext } from "../../contexts/ChatContext/ChatContext";
import objCopiaProfunda from "../../utils/objCopiaProfunda";
import * as managerService from "../../services/ManagerService/managerService";
import checarObjVazio from "../../utils/checarObjVazio";
import moverArray from '../../utils/moverArray';

function ConversaAberta({ navigation, route, socket }) {
 // const conversaSelecionada = route.params.paramKey;
  //console.log("cv clicada:", conversaClicada);
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
    console.log("nova mensagem:, ", novaConversa)
  };
  const enviarMensagem = async (e) => {
    
    e.preventDefault();

    if (!inputMensagemConteudo) return;

    const horaAtual = new Date().getHours();
    const horarioComercial = horaAtual >= 7 && horaAtual < 21 ? true : false;

    const remetente =
      conversas[conversas.findIndex(({ id }) => id === conversaSelecionada.id)].conversaCom;

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
  // const verificarEnter = (e) => {
  //   console.log("testando enter:", e)
  //   if (e.key === "Enter" && inputMensagemConteudo) {
  //     enviarMensagem(e);
  //   }
  // };

  return (
    <Body>
      <HeaderConversaAberta>
        <Icon
          name="arrow-left"
          size={32}
          color={Cores.azul}
          onPress={() => navigation.navigate("BarraLateral")}
        />
        <ImagemUsuario source={conversaSelecionada?.conversaCom?.avatar_url || imagemPerfilPadrão} />
        <CaixaTexto>
        <TextoMensagem color={Cores.azul} fontSize="20px" fontWeight="bold">
          {conversaSelecionada.conversaCom.nome}
        </TextoMensagem>
        </CaixaTexto>
      </HeaderConversaAberta>

      <FundoConversaAberta>
      <ScrollView>
      {carregandoConversa?( 
        <PaginaCarregando>
          <ActivityIndicator animating={true} color={Colors.black} />
        </PaginaCarregando>) : (
          mensagens?.map((m, idx) => (
            <Mensagem
              key={idx}
              pertenceAoUsuarioAtual={m.pertenceAoUsuarioAtual}
              conteudo={m.conteudo}
              scrollRef={mensagens?.length - 1 === idx ? scrollRef : null}
              data_criacao={m.data_criacao}
            />
          ))
        )}
        </ScrollView>
      </FundoConversaAberta>

      <FooterConversaAberta>
        <IconeFoundation name="paperclip" size={33} color={Cores.azulEscuro} />
        <BarraEnviarMensagemConversaAberta
          placeholder="Mensagem" onChangeText={(e) => setInputMensagemConteudo(e)}
          value={inputMensagemConteudo}
          ref={inputMensagemConteudoRef}>
        </BarraEnviarMensagemConversaAberta>
        <IconeMaterial name="send" size={30} color={Cores.azulEscuro} onPress={enviarMensagem}/>
      </FooterConversaAberta>
    </Body>
  );
}

export default ConversaAberta;
