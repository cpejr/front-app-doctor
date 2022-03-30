import React from "react";
import { Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import logoGuilherme from "./../../assets/logoGuilherme.png";
import {
  Body,
  CaixaTitulo,
  Logo,
  Titulo,
  CaixaInputs,
  StyledTextInput,
  CaixaInputsMesmaLinha,
  CaixaBotoes,
  Botao
} from "./Styles"

function Cadastro() {
  return (
    <Body>
      <CaixaTitulo>
        <Logo
        source={logoGuilherme}
        />
        <Titulo>
          Faça seu Cadastro
        </Titulo>
      </CaixaTitulo>

      <CaixaInputs>
        <StyledTextInput
        placeholder="Nome Completo"
        keyboardType="default"
        />
        <CaixaInputsMesmaLinha>
          <StyledTextInput
          placeholder="Telefone"
          keyboardType="numeric"
          />
          <StyledTextInput
          placeholder="Data de Nascimento"
          keyboardType="numeric"
          />
        </CaixaInputsMesmaLinha>
      </CaixaInputs>
      
      <CaixaBotoes>
        <Botao
        title="CANCELAR"
        />
        <Botao
        title="CADASTRAR"
        />
      </CaixaBotoes>

    </Body>
  );
}

export default Cadastro;
