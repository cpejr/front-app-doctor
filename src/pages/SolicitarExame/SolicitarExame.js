import React from "react";
import { useCallback, useState, useEffect, useContext, } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
  Linking,

} from "react-native";
import {
  Body,
  CaixaSeta,
  CaixaTitulo,
  Titulo,
  CaixaScroll,
  CaixaDescricao,
  CaixaBotao,
  CaixaCentro,
  Descricao,
  TextoBotao,
} from "./Styles";
import Icon from "react-native-vector-icons/Entypo";
import { Cores } from "../../variaveis";
import * as managerService from "../../services/ManagerService/managerService";
import Botao from "../../styles/Botao";
import { sleep } from "../../utils/sleep";
import { ChatContext } from "../../contexts/ChatContext/ChatContext";
import objCopiaProfunda from "../../utils/objCopiaProfunda";

function SolicitarExame({ route, navigation }) {

  const exameEspecifico = route.params.paramKey;

  const { width } = useWindowDimensions();
  const tamanhoIcone = width > 900 ? 48 : 48;
  const larguraBotoesMaior = width < 600 ? "60%" : "50%";
  const larguraBotoes = width < 330 ? "60%" : larguraBotoesMaior;

  const [usuario, setUsuario] = useState({});

  const mensagemPadrao = `Olá!, meu nome e: ${usuario?.nome} e gostaria de realizar um agendamento para o exame: ${exameEspecifico.titulo}`;
  const telefoneContato = "5579981375018";
  const urlWhatsApp = encodeURI(`https://api.whatsapp.com/send?phone=${telefoneContato}&text=${mensagemPadrao}`);

  const { usuarioId, conversas, setConversas, setConversaSelecionada } =
    useContext(ChatContext);

  async function pegandoDadosUsuarioLogado() {
    const resposta = await managerService.GetDadosUsuario();
    setUsuario(resposta.dadosUsuario);
  }

  useEffect(() => {
    pegandoDadosUsuarioLogado();
  }, []);

  const renderizarUrl = useCallback(async () => {
    const checarUrl = await Linking.canOpenURL(urlWhatsApp);
    if (checarUrl) {
      await Linking.openURL(urlWhatsApp);
    } else {
      Alert.alert(`Não foi possível abrir a URL: ${urlWhatsApp}`);
    }
  }, [urlWhatsApp]);

  async function CriandoChatparaExame() {
         const conversa = {
          id_criador: usuario.id,
          id_receptor: "e7d239d1-26be-45ad-a53c-c42d4e3ce543",
          ativada: false,
          tipo: String(exameEspecifico.titulo).toUpperCase()
        }
        const dadosConversaCriada = await managerService.CriandoConversa(conversa);
    
        const Mensagem = {
          id_conversa: dadosConversaCriada.id,
          id_usuario: usuario.id,
          media_url: "media_url",
          foi_visualizado: false,
          conteudo: mensagemPadrao,
        }
        await managerService.CriandoMensagem(Mensagem);
    const dadosConversa = {
      ativada: false,
      conversaCom: {
        avatar_url: null,
        id: dadosConversaCriada.id_receptor,
        nome: "Agendamento de Exame de "  + String(exameEspecifico.titulo).toUpperCase(),
      },
      data_criacao: dadosConversaCriada.data_criacao,
      finalizada: false,
      id: dadosConversaCriada.id,
      mensagensNaoVistas: 0,
      tipo: String(exameEspecifico.titulo).toUpperCase(),
      ultima_mensagem: {
        conteudo: mensagemPadrao,
        data_criacao: dadosConversaCriada.data_criacao,
        foi_visualizado: false,
        id_conversa: dadosConversaCriada.id,
        id_usuario: usuario.id,
        pertenceAoUsuarioAtual: true,
    }}
    const conversaselecionada = {
      id: dadosConversaCriada.id,
      ativada: true,
      mensagensNaoVistas: 0,
      conversaCom: {
        id: "e7d239d1-26be-45ad-a53c-c42d4e3ce543",
        nome: "Agendamento de Exame de "  + String(exameEspecifico.titulo).toUpperCase(),
        avatar_url: null,
      },
    }
    setConversaSelecionada(conversaselecionada)
    navigation.navigate("ConversaAberta", {
      paramKey: dadosConversa,
    });
  }



  return (
    <Body>
      <CaixaSeta>
        <TouchableOpacity>
          <Icon
            name="arrow-left"
            size={tamanhoIcone}
            color={Cores.azul} /*color="green"*/
            onPress={() => navigation.push("ListaExames")}
          />
        </TouchableOpacity>
      </CaixaSeta>
      <CaixaTitulo>
        <Titulo>Exame {exameEspecifico.titulo}</Titulo>
      </CaixaTitulo>
      <CaixaCentro>
        <CaixaScroll>
          <CaixaDescricao>
            <ScrollView>
              <Descricao>
                {exameEspecifico.texto}
              </Descricao>
            </ScrollView>
          </CaixaDescricao>
        </CaixaScroll>
      </CaixaCentro>
      {(exameEspecifico.titulo === "Actigrafia" || exameEspecifico.titulo === "Biologix") ? (
        <>
          <CaixaBotao>
            <Botao
              width={larguraBotoes}
              height="40px"
              marginTop="0%"
              backgroundColor="CFD3F8"
              //backgroundColor={Cores.cinza[11]}
              borderRadius="3px"
              borderColor={Cores.azul}
              borderWidth="2px"
              boxShadow="0px 4px 4px rgba(0, 0, 0, 0.2)"
              onPress={() => CriandoChatparaExame()}
            >
              <TextoBotao>Agendar Exame {exameEspecifico.titulo}</TextoBotao>
            </Botao>
          </CaixaBotao>
        </>
      ) : (
        <>
          <CaixaBotao>
            <Botao
              width={larguraBotoes}
              height="52px"
              marginTop="0%"
              backgroundColor={Cores.lilas[3]}
              borderRadius="3px"
              borderColor={Cores.lilas[2]}
              borderWidth="2px"
              boxShadow="0px 4px 4px rgba(0, 0, 0, 0.2)"
              onPress={renderizarUrl}
            >
              <TextoBotao>Agendar Exame {exameEspecifico.titulo}</TextoBotao>
            </Botao>
          </CaixaBotao>
        </>
      )
      }
    </Body>
  );
}

export default SolicitarExame;
