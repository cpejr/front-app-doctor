import React from "react";
import { useCallback, useState, useEffect } from "react";
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

function SolicitarExame({route, navigation}) {

  const { width } = useWindowDimensions();
  const tamanhoIcone = width > 900 ? 48 : 48;
  const larguraBotoesMaior = width < 600 ? "60%" : "50%";
  const larguraBotoes = width < 330 ? "60%" : larguraBotoesMaior;

  const [usuario, setUsuario] = useState({});
  const [nomeUsuario, setNomeUsuario] = useState();
  const exameEspecifico = route.params.paramKey;

  const mensagemPadrao = `Ola, meu nome e: ${nomeusuarioo} e gostaria de realizar um agendamento para o exame: ${exameEspecifico.titulo}`;
  const telefoneContato = "5579981375018";
  const [urlWhatsApp, setUrlWhatsApp] = useState(
    `https://api.whatsapp.com/send?phone=${telefoneContato}&text=${mensagemPadrao}`
  );

  const nomeusuarioo = JSON.stringify(nomeUsuario);

  async function pegandoDadosUsuarioLogado() {
    const resposta = await managerService.GetDadosUsuario();
    setUsuario(resposta.dadosUsuario);
    setNomeUsuario(resposta.dadosUsuario.nome);
  }

  useEffect(() => {
    pegandoDadosUsuarioLogado();
  }, [usuario]);
  
   useEffect(() => {
    setUrlWhatsApp(encodeURI(urlWhatsApp));
  }, []);

  const renderizarUrl = useCallback(async () => {
    const checarUrl = await Linking.canOpenURL(urlWhatsApp);
    if (checarUrl) {
      await Linking.openURL(urlWhatsApp);
    } else {
      Alert.alert(`Não foi possível abrir a URL: ${urlWhatsApp}`);
    }
  }, [urlWhatsApp]);


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
              backgroundColor="green"
              //backgroundColor={Cores.cinza[11]}
              borderRadius="3px"
              borderColor={Cores.azul}
              borderWidth="2px"
              boxShadow="0px 4px 4px rgba(0, 0, 0, 0.2)"
            >
              <TextoBotao>Agendar Exame{exameEspecifico.titulo}</TextoBotao>
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
              backgroundColor={Cores.cinza[11]}
              borderRadius="3px"
              borderColor={Cores.azul}
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
