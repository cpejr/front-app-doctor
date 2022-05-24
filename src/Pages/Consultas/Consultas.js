import React from "react";
import { useWindowDimensions, ScrollView } from "react-native";
import {
  Body,
  CaixaTitulo,
  Titulo,
  ViewConsultas,
  CaixaConsulta,
  CaixaData,
  CaixaNome,
  CaixaHora,
  ConteudoCaixa,
  Icone,
  ViewBotao,
  CaixaBotao,
  IconeBotao,
} from "./Styles";
import ViewPadrao from "../../styles/ViewPadrao";
import ConteudoBotao from "./../../styles/ConteudoBotao";
import botaoIcone from "./../../assets/botaoIcone.png";
import iconeAvaliDesabilitado from "./../../assets/iconeAvaliDesabilitado.png";
import iconeAvaliHabilitado from "./../../assets/iconeAvaliHabilitado.png";
import iconeLocal from "./../../assets/iconeLocal.png";
import { Cores } from "../../variaveis";

import { Dimensions } from "react-native";

function Consultas({ navigation }) {
  const { width } = useWindowDimensions();

  //responsividade paisagem
  const paddingBodyMaior = width < 600 ? "5%" : "10%";
  const larguraBotaoMaior = width < 600 ? "50%" : "40%";
  const fontSizeMaior = width < 600 ? "12px" : "15px";
  //responsividade aparelhos
  const paddingBody = width < 330 ? "1.5%" : paddingBodyMaior;
  const larguraBotao = width < 330 ? "60%" : larguraBotaoMaior;
  const borderWidthCaixaNome = width < 330 ? "0px" : "2.5px";
  const fontSizeConteudo = width < 330 ? "11px" : fontSizeMaior;

  const heightTela = `${Dimensions.get("window").height}px`;

  return (
    <ScrollView>
      <Body
        paddingLeft={paddingBody}
        paddingRight={paddingBody}
        height={heightTela}
      >
        <CaixaTitulo>
          <Titulo>Consultas Marcadas</Titulo>
        </CaixaTitulo>
        <ViewPadrao paddingLeft="10px" paddingRight="10px">
          <CaixaConsulta>
            <CaixaData>
              <ConteudoCaixa fontSize={fontSizeConteudo}>
                15-05-2002
              </ConteudoCaixa>
            </CaixaData>
            <CaixaNome
              borderRightWidth={borderWidthCaixaNome}
              borderLeftWidth={borderWidthCaixaNome}
            >
              <Icone
                marginRight="4%"
                marginLeft="0"
                source={iconeAvaliDesabilitado}
              />
              <ConteudoCaixa fontSize={fontSizeConteudo}>
                Consulta de Rotina
              </ConteudoCaixa>
              <Icone marginRight="0" marginLeft="4%" source={iconeLocal} />
            </CaixaNome>
            <CaixaHora>
              <ConteudoCaixa fontSize={fontSizeConteudo}>20:20</ConteudoCaixa>
            </CaixaHora>
          </CaixaConsulta>

          <CaixaConsulta>
            <CaixaData>
              <ConteudoCaixa fontSize={fontSizeConteudo}>
                15-05-2002
              </ConteudoCaixa>
            </CaixaData>
            <CaixaNome
              borderRightWidth={borderWidthCaixaNome}
              borderLeftWidth={borderWidthCaixaNome}
            >
              <Icone
                marginRight="4%"
                marginLeft="0"
                source={iconeAvaliHabilitado}
              />
              <ConteudoCaixa fontSize={fontSizeConteudo}>
                Consulta de Rotina
              </ConteudoCaixa>
              <Icone marginRight="0" marginLeft="4%" source={iconeLocal} />
            </CaixaNome>
            <CaixaHora>
              <ConteudoCaixa fontSize={fontSizeConteudo}>20:20</ConteudoCaixa>
            </CaixaHora>
          </CaixaConsulta>
        </ViewPadrao>
        <ViewBotao>
          <CaixaBotao
            width={larguraBotao}
            onPress={() => navigation.navigate("SolicitarConsulta")}
          >
            <ConteudoBotao
              fontSize={fontSizeConteudo}
              color={Cores.azul}
              width="90%"
            >
              Marcar Nova Consulta
            </ConteudoBotao>
            <IconeBotao source={botaoIcone} />
          </CaixaBotao>
        </ViewBotao>
      </Body>
    </ScrollView>
  );
}

export default Consultas;
