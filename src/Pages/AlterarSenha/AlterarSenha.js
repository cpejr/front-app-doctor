import React, { useState } from "react";
import { Text, View } from "react-native";
import { Dimensions } from "react-native";

import {
  Body,
  CaixaBotao,
  CaixaInputs,
  CaixaTitulo,
  CaixaView,
  Titulo,
} from "./Styles";

import Input from "../../styles/Input/Input";
import Botao from "../../styles/Botao/Botao";
import ConteudoBotao from "../../styles/ConteudoBotao";

function AlterarSenha() {
  const heightTela = `${Dimensions.get("window").height}px`;

  const [confirmado, setConfirmado] = useState(true);

  return (
    <Body height={heightTela}>
      <CaixaView paddingLeft="0%" paddingRight="0%">
        <CaixaTitulo>
          <Titulo fontSize="25px">Alterar Senha:</Titulo>
        </CaixaTitulo>
        {confirmado ? (
          <CaixaInputs>
            <CaixaTitulo>
              <Titulo fontSize="15px">Comfirme sua senha atual:</Titulo>
            </CaixaTitulo>
            <Input placeholder="Senha Atual:"></Input>
            <CaixaBotao>
              <Botao
                width="42%"
                height="35px"
                backgroundColor="#ffffff"
                borderRadius="3"
                borderColor="#DD0D0D"
                borderWidth="1"
              >
                <ConteudoBotao width="100%" fontSize="15px" color="#000000">
                  CANCELAR
                </ConteudoBotao>
              </Botao>
              <Botao
                width="42%"
                height="35px"
                backgroundColor="#434B97"
                borderRadius="3"
                borderColor="#151B57"
                borderWidth="1"
              >
                <ConteudoBotao width="100%" fontSize="15px" color="#ffffff">
                  CONFIRMAR
                </ConteudoBotao>
              </Botao>
            </CaixaBotao>
          </CaixaInputs>
        ) : (
          <CaixaInputs></CaixaInputs>
        )}
      </CaixaView>
    </Body>
  );
}

export default AlterarSenha;
