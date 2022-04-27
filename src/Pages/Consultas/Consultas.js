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
} from "./Styles";
import { Botao, ConteudoBotao } from "../../styles/Botao";

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
              <Icone></Icone>
              <ConteudoCaixa>Consulta de Rotina</ConteudoCaixa>
              <Icone></Icone>
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
              <Icone></Icone>
              <ConteudoCaixa>Consulta de Rotina</ConteudoCaixa>
              <Icone></Icone>
            </CaixaNome>
            <CaixaHora>
              <ConteudoCaixa>20:20</ConteudoCaixa>
            </CaixaHora>
          </CaixaConsulta>
        </ViewConsultas>
        <Botao
          width="42%"
          height="50px"
          backgroundColor="#E9EBFC"
          borderRadius="3px"
          borderColor="#151B57"
          borderWidth="1px"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.3)"
        >
          <ConteudoBotao fontSize="15px" color="#ffffff">
            Marcar Nova Consulta
          </ConteudoBotao>
        </Botao>
      </Body>
    </ScrollView>
  );
}

export default Consultas;
