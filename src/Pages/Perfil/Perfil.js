import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import Botao from "./../../styles/Botao";
import logoGuilherme from "./../../assets/logoGuilherme.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import AsyncStorage from "react-native";

import api from "../../services/api";

import {
  Body,
  CaixaBotao,
  ConteudoBotaoPerfil,
  CaixaViews,
  ViewFotoNome,
  Foto,
  Nome,
  CaixaDataCpf,
  CaixaNascidoData,
  TextNascido,
  TextData,
  Dados,
  ViewContatoEndereco,
  Titulo,
  CaixaBotoes,
  ExcluirConta,
} from "./Styles";

 function Perfil() {
  const [usuario, setUsuario] = useState({});
  const [endereco, setEndereco] = useState({});
  const [dataNascimento, setDataNascimento] = useState("");
  const [dataMasked, setDataMasked] = useState("");
  const [telefone, setTelefone] = useState("");
  const [telMasked, setTelMasked] = useState("");
  const [cpf, setCpf] = useState("");
  const [cpfMasked, setCpfMasked] = useState("")

async function getEmail(){
  await AsyncStorage.getItem("@AirBnbApp:email").then((res) => {
    
    api.get(`/usuarios/${res}`).then((res) => {
      setUsuario(res.data);
      setTelefone(res.data.telefone);
      setDataNascimento(res.data.data_nascimento);
      setCpf(res.data.cpf);
      api.get(`/enderecos/${res.data.id_endereco}`).then((res) => {
        setEndereco(res.data);
      });
    });
  });
}

  useEffect(() => {
    getEmail();
  }, []);

  useEffect(() => {
    setCpfMasked(
      cpf.slice(+0, -8) +
        "." +
        cpf.slice(+3, -5) +
        "." +
        cpf.slice(+6, -2) +
        "-" +
        cpf.slice(-2)
    );
  }, [cpf]);

  useEffect(() => {
    setTelMasked(
      "(" +
        telefone.slice(0, -9) +
        ") " +
        telefone.slice(2, -4) +
        "-" +
        telefone.slice(-4)
    );
  }, [telefone]);

  useEffect(() => {
    setDataMasked(
      dataNascimento.slice(8, -14) +
        "/" +
        dataNascimento.slice(5, -17) +
        "/" +
        dataNascimento.slice(0, -20)
    );
  }, [dataNascimento]);

  return (
    <ScrollView>
      <Body>
        <CaixaBotao>
          <Botao
            width="50%"
            height="30px"
            backgroundColor="#A7ADE8"
            borderRadius="3px"
            borderColor="#353964"
            borderWidth="2px"
            boxShadow="0px 4px 4px rgba(0, 0, 0, 0.2)"
          >
            <ConteudoBotaoPerfil>
              EMERGÊNCIA
            </ConteudoBotaoPerfil>
          </Botao>
        </CaixaBotao>
        <CaixaViews>
          <ViewFotoNome>
            <Foto source={logoGuilherme} />
            <Nome>{usuario.nome}</Nome>
            <CaixaDataCpf>
              <CaixaNascidoData>
                <TextNascido>Nascido em:</TextNascido>
                <TextData>{dataMasked}</TextData>
              </CaixaNascidoData>
            <Dados>{cpfMasked}</Dados>
            </CaixaDataCpf>
          </ViewFotoNome>
          <ViewContatoEndereco>
            <Titulo>Contato</Titulo>
            <Dados>{telMasked}</Dados>
            <Dados>{usuario.email}</Dados>
          </ViewContatoEndereco>
          <ViewContatoEndereco>
            <Titulo>Endereço</Titulo>
            <Dados>{endereco.pais}</Dados>
            <Dados>{endereco.estado}</Dados>
            <Dados>{endereco.cidade}</Dados>
            <Dados>{endereco.cep}</Dados>
            <Dados>{endereco.rua}, {endereco.numero}</Dados>
            <Dados>{endereco.complemento}</Dados>
          </ViewContatoEndereco>
          <CaixaBotoes>
            <Botao
              width="50%"
              height="30px"
              backgroundColor="#A7ADE8"
              borderRadius="3px"
              borderColor="#353964"
              borderWidth="2px"
              boxShadow="0px 4px 4px rgba(0, 0, 0, 0.2)"
            >
              <ConteudoBotaoPerfil>
                ALTERAR DADOS
              </ConteudoBotaoPerfil>
            </Botao>
            <Botao
              width="50%"
              height="30px"
              backgroundColor="#A7ADE8"
              borderRadius="3px"
              borderColor="#353964"
              borderWidth="2px"
              boxShadow="0px 4px 4px rgba(0, 0, 0, 0.2)"
            >
              <ConteudoBotaoPerfil>
                ALTERAR SENHA
              </ConteudoBotaoPerfil>
            </Botao>
            <ExcluirConta>Excluir conta</ExcluirConta>
          </CaixaBotoes>
        </CaixaViews>
      </Body>
    </ScrollView>
  );
  }


export default Perfil;

