import React, { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { Dimensions } from "react-native";

import * as managerService from "../../services/ManagerService/managerService";

import { ActivityIndicator, Colors } from "react-native-paper";

import {
  Body,
  CaixaBotao,
  CaixaInputs,
  CaixaTitulo,
  CaixaView,
  Rotulo,
  TextoRotulo,
  Titulo,
  InputNovaSenha,
  InputConfirmacaoNovaSenha,
} from "./Styles";

import Input from "../../styles/Input/Input";
import Botao from "../../styles/Botao/Botao";
import ConteudoBotao from "../../styles/ConteudoBotao";

function AlterarSenha({ navigation }) {
  const heightTela = `${Dimensions.get("window").height}px`;

  const [confirmado, setConfirmado] = useState(true);
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function requisicaoVerificarSenha() {
    if (!senhaAtual) {
      Alert.alert("ATENÇÃO","Preencha os campos corretamente!");
    } else {
      setCarregando(true);
      const resposta = await managerService.requisicaoVerificarSenha(
        senhaAtual
      );
      if (resposta) {
        setConfirmado(false);
      } else {
        navigation.push("AlterarSenha");
      }
      setCarregando(false);
    }
  }
  async function requisicaoAlterarSenha() {

    if(novaSenha.length < 8){
      Alert.alert("ATENÇÃO","Preencha os campos corretamente!");
      return
    }
    if (!novaSenha || !confirmarNovaSenha) {
      Alert.alert("ATENÇÃO","Preencha os campos corretamente!");
    } else {
      if (novaSenha == confirmarNovaSenha) {
        setCarregando(true);
        await managerService.requisicaoAlterarSenha(novaSenha);
        setCarregando(false);
        Alert.alert("PARABÉNS", "Senha atualizada com sucesso!");
        navigation.navigate("Perfil");
        setConfirmado(true);
      } else {
        Alert.alert("ATENÇÃO", "As senhas não conferem!");
      }
    }
  }

  function cancelaAlterarSenha(){
    navigation.navigate("Perfil");
  }

  return (
    <ScrollView>
      <Body height={heightTela}>
        <CaixaView paddingLeft="0%" paddingRight="0%">
          <CaixaTitulo>
            <Titulo fontSize="25px">Alterar Senha:</Titulo>
          </CaixaTitulo>
          {confirmado ? (
            <CaixaInputs>
              <CaixaTitulo>
                <Titulo fontSize="15px">Confirme sua senha atual:</Titulo>
              </CaixaTitulo>
              <Input
                placeholder="Senha Atual:"
                onChangeText={setSenhaAtual}
                type="password"
                secureTextEntry
              ></Input>
              <CaixaBotao>
                <Botao
                  width="42%"
                  height="35px"
                  backgroundColor="#ffffff"
                  borderRadius="3"
                  borderColor="#DD0D0D"
                  borderWidth="1px"
                  onPress={() => navigation.navigate("Perfil")}
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
                  borderWidth="1px"
                  onPress={requisicaoVerificarSenha}
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
            </CaixaInputs>
          ) : (
            <CaixaInputs>
              <CaixaTitulo>
                <Titulo fontSize="15px">Digite sua nova senha:</Titulo>
              </CaixaTitulo>
              <InputNovaSenha
                placeholder="Nova senha:"
                onChangeText={setNovaSenha}
                novaSenha = {novaSenha}
                type="password"
                secureTextEntry
              ></InputNovaSenha>
              {novaSenha.length > 0 && novaSenha.length < 8  ? (
                <Rotulo>
                  <TextoRotulo>Digite no mínimo 8 caractéres.</TextoRotulo> 
                </Rotulo>
              ) : (

                <></>
              )}
              <CaixaTitulo>
                <Titulo fontSize="15px">Confirme sua nova senha:</Titulo>
              </CaixaTitulo>
              <InputConfirmacaoNovaSenha
                placeholder="Confirmando sua nova senha:"
                onChangeText={setConfirmarNovaSenha}
                confirmarNovaSenha = {confirmarNovaSenha}
                type="password"
                secureTextEntry
              ></InputConfirmacaoNovaSenha>
               {confirmarNovaSenha.length > 0 && confirmarNovaSenha.length < 8  ? (
                <Rotulo>
                  <TextoRotulo>Digite no mínimo 8 caractéres.</TextoRotulo> 
                </Rotulo>
              ) : (

                <></>
              )}
              <CaixaBotao>
                <Botao
                  width="42%"
                  height="35px"
                  backgroundColor="#ffffff"
                  borderRadius="3"
                  borderColor="#DD0D0D"
                  borderWidth="1px"
                  onPress={() => cancelaAlterarSenha()}
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
                  borderWidth="1px"
                  onPress={requisicaoAlterarSenha}
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
            </CaixaInputs>
          )}
        </CaixaView>
      </Body>
    </ScrollView>
  );
}

export default AlterarSenha;
