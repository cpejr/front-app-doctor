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
  Dados,
  ViewContatoEndereco,
  Titulo,
  CaixaBotoes,
  ExcluirConta,
} from "./Styles";

 function Perfil() {
  const [usuario, setUsuario] = useState({});
  const [endereco, setEndereco] = useState({});
  const [telefone, setTelefone] = useState("");

async function getEmail(){
  await AsyncStorage.getItem("@AirBnbApp:email").then((res) => {
    
    api.get(`/usuarios/${res}`).then((res) => {
      setUsuario(res.data);
      setTelefone(res.data.telefone);
      api.get(`/enderecos/${res.data.id_endereco}`).then((res) => {
        setEndereco(res.data);
      });
    });
  });
}

  useEffect(() => {
    getEmail();
  }, []);

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
            <Dados>Nascido em {usuario.data_nascimento}</Dados>
          </ViewFotoNome>
          <ViewContatoEndereco>
            <Titulo>Contato</Titulo>
            <Dados>{usuario.telefone}</Dados>
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

