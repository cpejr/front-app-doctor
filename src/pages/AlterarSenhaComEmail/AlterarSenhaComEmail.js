import React, { useState } from "react";
import { Alert, ScrollView, useWindowDimensions  } from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";
import {
  Body,
  CaixaBotao,
  CaixaInputs,
  CaixaTitulo,
  CaixaView,
  CaixaLogo,
  Logo,
  Rotulo,
  TextoRotulo,
  ContainerBotao,
  Titulo,
  InputEmail,
} from "./Styles";
import Botao from "../../styles/Botao/Botao";
import ConteudoBotao from "../../styles/ConteudoBotao";
import logoGuilherme from "./../../assets/logoGuilherme.png";
import * as managerService from "../../services/ManagerService/managerService";

function AlterarSenhaComEmail({ navigation }) {
  const height = useWindowDimensions().height;
  const width = useWindowDimensions().width;

  const [erro, setErro] = useState(false);
  const [camposVazios, setCamposVazios] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [email, setEmail] = useState();

  function PreenchendoEmail(text) {
    setEmail(text);
    if (text.length > 0) {
      setCamposVazios(false);
    }
  }

  function verificandoCamposVazios() {
    setCarregando(true);
    Alert.alert("Aviso!", "Aguarde um pouco.");
    if (email === "" || email === null || email === undefined) {
      setCamposVazios(true);
      setCarregando(false);
    } else {
      setCamposVazios(false);
      alterarSenha();
    }
  }

  async function alterarSenha() {
    const resposta = await managerService.GetTodosUsuarios();
    let achei = 0;
    resposta.forEach((usuario) => {
      if (usuario.email === email) {
        achei++;
      }
    });
    if (achei) {
      const enviado = await managerService.EnviandoEmail(email);
      if (enviado) {
        setCarregando(false);
        Alert.alert(
          "Sucesso",
          "Um link foi enviado à sua caixa de email de modo que você consiga redefinir sua senha!"
        );
        navigation.navigate("Login");
      }
    } else {
      setCarregando(false);
      setErro(true);
      Alert.alert(
        "Erro",
        "Esse email não está cadastrado, digite um email válido"
      );
    }
    setCarregando(false);
  }

  return (
    <Body>
      { width < height ? (
      <CaixaLogo>
        <Logo source={logoGuilherme} />
      </CaixaLogo>
      ):(<></>)}
      <CaixaView>
        <CaixaTitulo>
          <Titulo fontSize="25px">Recupere sua conta do DoctorApp:</Titulo>
        </CaixaTitulo>
        <CaixaInputs>
          <CaixaTitulo>
            <Titulo fontSize="15px">Digite seu email cadastrado:</Titulo>
          </CaixaTitulo>
          <InputEmail
            placeholder="E-mail:"
            onChangeText={(text) => {
              PreenchendoEmail(text);
            }}
            erro={erro}
            camposVazios={camposVazios}
          ></InputEmail>
          {camposVazios ? (
                <Rotulo>
                  <TextoRotulo>Digite um email</TextoRotulo>
                </Rotulo>
              ) : (
                <></>
              )}
        </CaixaInputs>
      </CaixaView>
      <ContainerBotao>
        <CaixaBotao>
          <Botao
            width="42%"
            height="50px"
            backgroundColor="#ffffff"
            borderRadius="3px"
            borderColor="#DD0D0D"
            borderWidth="1px"
            onPress={() => navigation.navigate("Login")}
          >
            <ConteudoBotao width="100%" fontSize="15px" color="#000000">
              CANCELAR
            </ConteudoBotao>
          </Botao>
          <Botao
            width="42%"
            height="50px"
            backgroundColor="#434B97"
            borderRadius="3px"
            borderColor="#151B57"
            borderWidth="1px"
            onPress={verificandoCamposVazios}
          >
            {carregando ? (
              <ActivityIndicator animating={true} color={Colors.white} />
            ) : (
              <ConteudoBotao width="100%" fontSize="15px" color="#ffffff">
                CONFIRMAR
              </ConteudoBotao>
            )}
          </Botao>
        </CaixaBotao>
      </ContainerBotao>
    </Body>
    //</ScrollView>
  );
}

export default AlterarSenhaComEmail;
