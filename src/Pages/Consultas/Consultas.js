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
  BotaoView,
  BotaoIcone,
  BotaoCaixa,
} from "./Styles";
import ConteudoBotao from "./../../styles/ConteudoBotao";
import botaoIcone from "./../../assets/botaoIcone.png";
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
              <Icone source={botaoIcone} />
              <ConteudoCaixa>Consulta de Rotina</ConteudoCaixa>
              <Icone source={botaoIcone} />
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
              <Icone source={botaoIcone} />
              <ConteudoCaixa>Consulta de Rotina</ConteudoCaixa>
              <Icone source={botaoIcone} />
            </CaixaNome>
            <CaixaHora>
              <ConteudoCaixa>20:20</ConteudoCaixa>
            </CaixaHora>
          </CaixaConsulta>
        </ViewConsultas>
        <BotaoView>
          <BotaoCaixa
            width="45%"
            height="40px"
            backgroundColor="#E9EBFC"
            borderRadius="3px"
            borderColor="#000000"
            borderWidth="1px"
            boxShadow="0px 4px 4px rgba(0, 0, 0, 0.3)"
          >
            <ConteudoBotao fontSize="12px" color="#151B57" width="90%">
              Marcar Nova Consulta
            </ConteudoBotao>
            <BotaoIcone source={botaoIcone} />
          </BotaoCaixa>
        </BotaoView>
      </Body>
    </ScrollView>
  );
}

export default Consultas;
