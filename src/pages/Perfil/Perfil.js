import React, { useState, useEffect } from "react";
import Icon from 'react-native-vector-icons/AntDesign';
import { useWindowDimensions, ScrollView, Alert, View, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, Colors } from "react-native-paper";
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
  CaixaBotoesAlterar,
  ExcluirConta,
  CaixaBotoesExcluirESair,
  Sair,
  AnimacaoCarregando,
  AnimacaoCarregandoViewNome,
  ScrollViewBranco,
} from "./Styles";
import { Cores } from "../../variaveis";
import  {sleep} from "../../utils/sleep";
import * as Notifications from 'expo-notifications';

function Perfil({ navigation }) {
  const [usuario, setUsuario] = useState({});
  const [endereco, setEndereco] = useState({});
  const [telefone, setTelefone] = useState("");
  const [telefoneCuidador, setTelefoneCuidador] = useState("");
  const [cpf, setCpf] = useState("");
  const [cep, setCep] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [fotoDePerfil, setFotoDePerfil] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [carregandoFoto, setCarregandoFoto] = useState(true);
  const [cpfMasked, setCpfMasked] = useState("");
  const [cepMasked, setCepMasked] = useState("");
  const [dataMasked, setDataMasked] = useState("");
  const [telMasked, setTelMasked] = useState("");
  const [telCuidadorMasked, setTelCuidadorMasked] = useState("");

  const { width, height, fontSize } = useWindowDimensions();

  async function pegandoDados() {
    setCarregando(true);
    const resposta = await managerService.GetDadosUsuario();
    setUsuario(resposta.dadosUsuario);
    setTelefone(resposta.dadosUsuario.telefone);
    setCpf(resposta.dadosUsuario.cpf);
    setDataNascimento(resposta.dadosUsuario.data_nascimento);
    setEndereco(resposta.dadosEndereco);
    setCep(resposta.dadosEndereco.cep);
    setTelefoneCuidador(resposta.dadosUsuario.telefone_cuidador);
    setCarregando(false);
  }

  async function handleLogout() {
    try {
      const token = await Notifications.getExpoPushTokenAsync()
      await managerService.DeletarTokenDispositivo(token.type + "/" + token.data)
      AsyncStorage.removeItem("@AirBnbApp:token");
      AsyncStorage.removeItem("@AirBnbApp:email");
      new Alert.alert("", "Usuário deslogado com sucesso!");
      navigation.reset({
        index:0,
        routes: [{name: "Login"}]
      })
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    if (cpf != null && cpf != undefined) {
      setCpfMasked(
        cpf.slice(+0, -8) +
          "." +
          cpf.slice(+3, -5) +
          "." +
          cpf.slice(+6, -2) +
          "-" +
          cpf.slice(-2)
      );
    }
  }, [cpf]);

  useEffect(() => {
    if (cep != null && cep != undefined) {
      setCepMasked(cep.slice(0, 5) + "-" + cep.slice(5, 8));
    }
  }, [cep]);

  useEffect(() => {
    if (telefone != null && telefone != undefined) {
      setTelMasked(
        "(" +
          telefone.slice(0, -9) +
          ")" +
          telefone.slice(2, -4) +
          "-" +
          telefone.slice(-4)
      );
    }
  }, [telefone]);

  useEffect(() => {
    if (telefoneCuidador != null && telefoneCuidador != undefined) {
      setTelCuidadorMasked(
        "(" +
          telefoneCuidador.slice(0, -9) +
          ")" +
          telefoneCuidador.slice(2, -4) +
          "-" +
          telefoneCuidador.slice(-4)
      );
    }
  }, [telefoneCuidador]);

  useEffect(() => {
    if (dataNascimento != null && dataNascimento != undefined) {
      setDataMasked(
        dataNascimento.slice(8, -14) +
          "/" +
          dataNascimento.slice(5, -17) +
          "/" +
          dataNascimento.slice(0, -20)
      );
    }
  }, [dataNascimento]);

  useEffect(() => {
    pegandoDados();
  }, [usuario]);

  const confirmacaoExcluir = () =>
    Alert.alert("", "Tem certeza que quer excluir sua conta?", [
      {
        text: "Não",
        style: "cancel",
      },
      { text: "Confirmar", onPress: () => deletarEnderecoEUsuario() },
    ]);

  async function deletarEnderecoEUsuario() {
    await managerService.DeletarEnderecoEUsuario(usuario.id_endereco);
    navigation.push("Login");
  }

  async function setandoFotoDePerfil() {
    const chave = usuario.avatar_url;
    
    if (chave === null || chave === "" || chave === undefined)
    {
      await sleep(1500);
      setCarregandoFoto(false);
      return false;
    }

    setCarregandoFoto(true);
    const arquivo = await managerService.GetArquivoPorChave(chave);
    setFotoDePerfil(arquivo);
    await sleep(1500);
    setCarregandoFoto(false);
  }

  useEffect(() => {
    setandoFotoDePerfil();
  }, [usuario.avatar_url]);

  const larguraBotoesMaior = width < 600 ? "50%" : "35%";
  const larguraBotoes = width < 330 ? "60%" : larguraBotoesMaior;
  const paddingBody = width < 330 ? "5%" : "10%";
  const fontSizeTitulos = fontSize < 1080 ? "20px" : "23px";
  const fontSizeDados = fontSize < 1080 ? "14px" : "16px";
  const fontSizeNascido = fontSize < 1080 ? "12px" : "14px";
  const larguraViews = width < 750 ? "100%" : "70%";

  return (
    <ScrollViewBranco>
      <Body paddingLeft={paddingBody} paddingRight={paddingBody}>
        <CaixaBotao>
          <Botao
            width={larguraBotoes}
            height="30px"
            backgroundColor={Cores.lilas[3]}
            borderRadius="3px"
            borderColor={Cores.lilas[2]}
            borderWidth="2px"
            boxShadow="0px 4px 4px rgba(0, 0, 0, 0.2)"
            onPress={() => navigation.navigate("FormularioEmergencia")}
          >
            <ConteudoBotaoPerfil fontSize={fontSizeDados}>
              EMERGÊNCIA
            </ConteudoBotaoPerfil>
          </Botao>
        </CaixaBotao>
        <CaixaViews>
          <ViewFotoNome width={larguraViews}>
            {carregando ? (
              <AnimacaoCarregandoViewNome>
                <ActivityIndicator animating={true} color={Colors.blue900} />
              </AnimacaoCarregandoViewNome>
            ) : (
              <>
              {usuario.avatar_url === null || usuario.avatar_url === "" || usuario.avatar_url === undefined ? (
              <Foto>
              {carregandoFoto ? (
              <AnimacaoCarregandoViewNome>
                <ActivityIndicator animating={true} color={Colors.blue900}/>
              </AnimacaoCarregandoViewNome>
              ) : (
                <>
                <Icon name="user" size={80} color={Cores.preto}/> 
                </>
              )}
              </Foto>
            ) : (
              <Foto>
              {carregandoFoto ? (
              <AnimacaoCarregandoViewNome>
                <ActivityIndicator animating={true} color={Colors.blue900}/>
              </AnimacaoCarregandoViewNome>
              ) : (
                <>
                  <Image
                    source={{uri:(fotoDePerfil)}}
                    style={{
                    height:"100%",
                    width:"100%"}}
                  ></Image>
                </>
              )}
              </Foto>
              )}
              <Nome fontSize={fontSizeTitulos}>{usuario.nome}</Nome>
              <CaixaDataCpf>
                <CaixaNascidoData>
                  <TextNascido fontSize={fontSizeNascido}>
                    Nascido em:
                  </TextNascido>
                  <TextData fontSize={fontSizeDados}>{dataMasked}</TextData>
                </CaixaNascidoData>
                <Dados fontSize={fontSizeDados}>{cpfMasked}</Dados>
              </CaixaDataCpf>
             </>
            )}
          </ViewFotoNome>
          <ViewContatoEndereco width={larguraViews}>
            {carregando ? (
              <AnimacaoCarregando>
                <ActivityIndicator animating={true} color={Colors.blue900} />
              </AnimacaoCarregando>
            ) : (
              <>
                <Titulo fontSize={fontSizeTitulos}>Contato</Titulo>
                <Dados fontSize={fontSizeDados}>{telMasked}</Dados>
                <Dados fontSize={fontSizeDados}>{usuario.email}</Dados>
                {usuario.nome_cuidador != null ? (
                  <View style={{ paddingRight: "6%" }}>
                    <Dados fontSize={fontSizeDados}>
                      Nome do cuidador: {usuario.nome_cuidador}
                    </Dados>
                    <Dados fontSize={fontSizeDados}>
                      Telefone do cuidador: {telCuidadorMasked}
                    </Dados>
                  </View>
                ) : (
                  <></>
                )}
                {usuario.convenio != null ? (
                  <>
                    <Dados fontSize={fontSizeDados}>
                      Convênio: {usuario.convenio}
                    </Dados>
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
          </ViewContatoEndereco>
          <ViewContatoEndereco width={larguraViews}>
            {carregando ? (
              <AnimacaoCarregando>
                <ActivityIndicator animating={true} color={Colors.blue900} />
              </AnimacaoCarregando>
            ) : (
              <>
                <Titulo fontSize={fontSizeTitulos}>Endereço</Titulo>
                <Dados fontSize={fontSizeDados}>País: {endereco.pais}</Dados>
                <Dados fontSize={fontSizeDados}>Estado: {endereco.estado}</Dados>
                <Dados fontSize={fontSizeDados}>Cidade: {endereco.cidade}</Dados>
                <Dados fontSize={fontSizeDados}>CEP: {cepMasked}</Dados>
                <Dados fontSize={fontSizeDados}>
                  Rua: {endereco.rua}, {endereco.numero}
                </Dados>
                <Dados fontSize={fontSizeDados}>Complemento: {endereco.complemento}</Dados>
              </>
            )}
          </ViewContatoEndereco>
          <CaixaBotoesAlterar>
            <Botao
              width={larguraBotoes}
              height="40px"
              backgroundColor={Cores.lilas[3]}
              borderRadius="3px"
              borderColor={Cores.lilas[2]}
              borderWidth="2px"
              boxShadow="0px 4px 4px rgba(0, 0, 0, 0.2)"
              onPress={() => navigation.push("AlterarDados")}
            >
              <ConteudoBotaoPerfil fontSize={fontSizeDados}>
                ALTERAR DADOS
              </ConteudoBotaoPerfil>
            </Botao>
            <Botao
              width={larguraBotoes}
              height="40px"
              marginTop="3%"
              padding="5px"
              backgroundColor={Cores.lilas[3]}
              borderRadius="3px"
              borderColor={Cores.lilas[2]}
              borderWidth="2px"
              boxShadow="0px 4px 4px rgba(0, 0, 0, 0.2)"
              onPress={() => navigation.push("AlterarSenha")}
            >
              <ConteudoBotaoPerfil fontSize={fontSizeDados}>
                ALTERAR SENHA
              </ConteudoBotaoPerfil>
            </Botao>
          </CaixaBotoesAlterar>

          <Botao
            width={larguraBotoes}
            height="35px"
            padding="5px"
            backgroundColor={Cores.branco}
            borderRadius="3px"
            borderColor={Cores.branco}
            borderWidth="2px"
            boxShadow="0px 4px 4px rgba(0, 0, 0, 0.2)"
            onPress={() => confirmacaoExcluir()}
          >
            <ExcluirConta onPress={() => confirmacaoExcluir()}>
              Excluir conta
            </ExcluirConta>
          </Botao>
          <Botao
            width="30px"
            height="30px"
            backgroundColor="white"
            borderRadius="0px"
            borderColor="white"
            borderWidth="0px"
            onPress={() =>
              Alert.alert("", "Tem certeza que quer sair da sua conta?", [
                {
                  text: "Não",
                  style: "cancel",
                },
                {
                  text: "Confirmar",
                  onPress: () => handleLogout(),
                },
              ])
            }
          >
            <Sair>Sair</Sair>
          </Botao>
        </CaixaViews>
      </Body>
    </ScrollViewBranco>
  );
}

export default Perfil;
