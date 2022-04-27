import React from "react";
import { ScrollView } from "react-native";
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
import ConteudoBotao from "./../../styles/ConteudoBotao";
import botaoIcone from "./../../assets/botaoIcone.png";
import iconeAvaliDesabilitado from "./../../assets/iconeAvaliDesabilitado.png";
import iconeAvaliHabilitado from "./../../assets/iconeAvaliHabilitado.png";
import iconeLocal from "./../../assets/iconeLocal.png";

function Consultas({ navigation }) {
  return (
    <ScrollView>
      <Body>
        <CaixaTitulo>
          <Titulo>Consultas Marcadas</Titulo>
        </CaixaTitulo>
        <ViewConsultas>
          <CaixaConsulta>
            <CaixaData>
              <ConteudoCaixa>15-05-2002</ConteudoCaixa>
            </CaixaData>
            <CaixaNome>
              <Icone
                marginRight="4%"
                marginLeft="0"
                source={iconeAvaliDesabilitado}
              />
              <ConteudoCaixa>Consulta de Rotina</ConteudoCaixa>
              <Icone marginRight="0" marginLeft="4%" source={iconeLocal} />
            </CaixaNome>
            <CaixaHora>
              <ConteudoCaixa>20:20</ConteudoCaixa>
            </CaixaHora>
          </CaixaConsulta>

          <CaixaConsulta>
            <CaixaData>
              <ConteudoCaixa>15-05-2002</ConteudoCaixa>
            </CaixaData>
            <CaixaNome>
              <Icone
                marginRight="4%"
                marginLeft="0"
                source={iconeAvaliHabilitado}
              />
              <ConteudoCaixa>Consulta de Rotina</ConteudoCaixa>
              <Icone marginRight="0" marginLeft="4%" source={iconeLocal} />
            </CaixaNome>
            <CaixaHora>
              <ConteudoCaixa>20:20</ConteudoCaixa>
            </CaixaHora>
          </CaixaConsulta>
        </ViewConsultas>
        <ViewBotao>
          <CaixaBotao>
            <ConteudoBotao fontSize="12px" color="#151B57" width="90%">
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
