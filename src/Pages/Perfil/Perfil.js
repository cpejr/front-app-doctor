import React, { useState, useEffect } from "react";
import { useWindowDimensions, ScrollView, Alert } from "react-native";
import Botao from "../../styles/Botao";
import logoGuilherme from "./../../assets/logoGuilherme.png";

import * as managerService from "../../services/ManagerService/managerService";

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
import { Cores } from "../../variaveis";

function Perfil({ navigation }) {
  const [usuario, setUsuario] = useState({});
  const [endereco, setEndereco] = useState({});
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");

  const [cpfMasked, setCpfMasked] = useState("");
  const [dataMasked, setDataMasked] = useState("");
  const [telMasked, setTelMasked] = useState("");

  const { width, height, fontSize } = useWindowDimensions();

  async function pegandoDados() {
    const resposta = await managerService.GetDadosUsuario();
    setUsuario(resposta.dadosUsuario);
    setTelefone(resposta.dadosUsuario.telefone);
    setCpf(resposta.dadosUsuario.cpf);
    setDataNascimento(resposta.dadosUsuario.data_nascimento);
    setEndereco(resposta.dadosEndereco);
  }

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

  useEffect(() => {
    pegandoDados();
  }, []);

  const confirmacaoExcluir = () =>
    Alert.alert(
      "",
      "Tem certeza que quer excluir sua conta?",
      [
        {
          text: "Não",
          style: "cancel"
        },
        { text: "Confirmar", onPress: () => deletarUsuario() }
      ]
    );

  async function deletarUsuario() {
    await managerService.DeletarUsuario(usuario.id);
    navigation.navigate("Login");
  }

  const larguraBotoesMaior = width < 600 ? "60%" : "35%";
  const larguraBotoes = width < 330 ? "60%" : larguraBotoesMaior;
  const paddingBody = width < 330 ? "5%" : "10%";
  const fontSizeTitulos = fontSize < 1080 ? "20px" : "23px";
  const fontSizeDados = fontSize < 1080 ? "15px" : "18px";
  const fontSizeNascido = fontSize < 1080 ? "12px" : "14px";
  const larguraViews = width < 750 ? "100%" : "70%";

  return (
    <ScrollView>
      <Body paddingLeft={paddingBody} paddingRight={paddingBody}>
        <CaixaBotao>
          <Botao
            width={larguraBotoes}
            height="30px"
            //backgroundColor={Cores.lilas[3]} -- Estatico
            backgroundColor="green"
            borderRadius="3px"
            borderColor={Cores.lilas[2]}
            borderWidth="2px"
            boxShadow="0px 4px 4px rgba(0, 0, 0, 0.2)"
            onPress={() => navigation.navigate("Emergencia")}
          >
            <ConteudoBotaoPerfil fontSize={fontSizeDados}>
              EMERGÊNCIA
            </ConteudoBotaoPerfil>
          </Botao>
        </CaixaBotao>
        <CaixaViews>
          <ViewFotoNome width={larguraViews}>
            <Foto />
            <Nome fontSize={fontSizeTitulos}>{usuario.nome}</Nome>
            <CaixaDataCpf>
              <CaixaNascidoData>
                <TextNascido fontSize={fontSizeNascido}>
                  Nascido em:
                </TextNascido>
                <TextData fontSize={fontSizeDados}>{dataMasked}</TextData>
              </CaixaNascidoData>
              <CaixaNascidoData>
              <TextNascido fontSize={fontSizeNascido}>
                  CPF:
                </TextNascido>
              <Dados fontSize={fontSizeDados}>{cpfMasked}</Dados>
              </CaixaNascidoData>
            </CaixaDataCpf>
          </ViewFotoNome>
          <ViewContatoEndereco paddingRight={paddingBody} width={larguraViews}>
            <Titulo fontSize={fontSizeTitulos}>Contato</Titulo>
            <Dados fontSize={fontSizeDados}>{telMasked}</Dados>
            <Dados fontSize={fontSizeDados}>{usuario.email}</Dados>
          </ViewContatoEndereco>
          <ViewContatoEndereco paddingRight={paddingBody} width={larguraViews}>
            <Titulo fontSize={fontSizeTitulos}>Endereço</Titulo>
            <Dados fontSize={fontSizeDados}>País:  {endereco.pais}</Dados>
            <Dados fontSize={fontSizeDados}>Estado: {endereco.estado}</Dados>
            <Dados fontSize={fontSizeDados}>Cidade:  {endereco.cidade}</Dados>
            <Dados fontSize={fontSizeDados}>CEP:  {endereco.cep}</Dados>
            <Dados fontSize={fontSizeDados}>
              Rua: {endereco.rua}, {endereco.numero}
            </Dados>
            <Dados fontSize={fontSizeDados}>Complemento: {endereco.complemento}</Dados>
          </ViewContatoEndereco>
          <CaixaBotoes>
            <Botao
              width={larguraBotoes}
              height="35px"
              backgroundColor={Cores.lilas[3]}
              borderRadius="3px"
              borderColor={Cores.lilas[2]}
              borderWidth="2px"
              boxShadow="0px 4px 4px rgba(0, 0, 0, 0.2)"
              onPress={() => navigation.navigate("AlterarDados")}
            >
              <ConteudoBotaoPerfil fontSize={fontSizeDados}>
                ALTERAR DADOS
              </ConteudoBotaoPerfil>
            </Botao>
            <Botao
              width={larguraBotoes}
              height="35px"
              backgroundColor={Cores.lilas[3]}
              borderRadius="3px"
              borderColor={Cores.lilas[2]}
              borderWidth="2px"
              boxShadow="0px 4px 4px rgba(0, 0, 0, 0.2)"
              onPress={() => navigation.navigate("AlterarSenha")}
            >
              <ConteudoBotaoPerfil fontSize={fontSizeDados}>
                ALTERAR SENHA
              </ConteudoBotaoPerfil>
            </Botao>
            <Botao
            width={larguraBotoes}
            height="35px"
            backgroundColor={Cores.branco}
            borderRadius="3px"
            borderColor={Cores.branco}
            borderWidth="2px"
            boxShadow="0px 4px 4px rgba(0, 0, 0, 0.2)"
            onPress={() => confirmacaoExcluir()}
            >
            <ExcluirConta onPress={() => confirmacaoExcluir()}>Excluir conta</ExcluirConta>
            </Botao>
          </CaixaBotoes>
        </CaixaViews>
      </Body>
    </ScrollView>
  );
}

export default Perfil;
