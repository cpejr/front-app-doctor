import React from "react";
import logoGuilherme from "./../../assets/logoGuilherme.png";
import Botao from "../../styles/Botao";
import ConteudoBotao from "../../styles/ConteudoBotao";
import Input from "../../styles/Input";
import {
  Body,
  CaixaTitulo,
  Logo,
  Titulo,
  CaixaInputs,
  CaixaInputsMesmaLinha,
  CaixaBotoes,
} from "./Styles";

function Cadastro() {
  return (
    <Body>
      <CaixaTitulo>
        <Logo source={logoGuilherme} />
        <Titulo>Faça seu Cadastro</Titulo>
      </CaixaTitulo>

      <CaixaInputs>
        <Input placeholder="Nome Completo" keyboardType="default" />
        <CaixaInputsMesmaLinha>
          <Input placeholder="Telefone" keyboardType="numeric" />
          <Input placeholder="Data de Nascimento" keyboardType="numeric" />
        </CaixaInputsMesmaLinha>
      </CaixaInputs>

      <CaixaBotoes>
        <Botao
          width="42%"
          height="50px"
          backgroundColor="#ffffff"
          borderRadius="3"
          borderColor="rgba(255, 0, 0, 0.25)"
          borderWidth="1"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.3)"
        >
          <ConteudoBotao fontSize="15px" color="#000000">
            CANCELAR
          </ConteudoBotao>
        </Botao>
        <Botao
          width="42%"
          height="50px"
          backgroundColor="#434B97"
          borderRadius="3"
          borderColor="#151B57"
          borderWidth="1"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.3)"
        >
          <ConteudoBotao fontSize="15px" color="#ffffff">
            CADASTRAR
          </ConteudoBotao>
        </Botao>
      </CaixaBotoes>
    </Body>
  );
}

export default Cadastro;
