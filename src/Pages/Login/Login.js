import React, { useState, useEffect } from "react";
import api from "../../services/api";
import logoGuilherme from "./../../assets/logoGuilherme.png";
import Icon from "react-native-vector-icons/FontAwesome";
import Botao from "./../../styles/Botao";
import ConteudoBotao from "./../../styles/ConteudoBotao";
import Input from "./../../styles/Input";
import * as managerService from "../../services/ManagerService/managerService";
import { useWindowDimensions, ScrollView, Alert } from "react-native";
import {
  Body,
  CaixaTitulo,
  Logo,
  CaixaInputs,
  SenhaCadastro,
  BarraEstetica,
  BotoesAlternativos,
  ConteudoIcone,
  Icone,
} from "./Styles";
import { Cores } from "../../variaveis";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, Colors } from "react-native-paper";
import { sleep } from "../../utils/sleep";

function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const { width, height } = useWindowDimensions();

  const [carregando, setCarregando] = useState();

  async function requisicaoLogin() {
    if (
      email?.length === 0 ||
      senha?.length === 0 ||
      email === null ||
      senha === null
    ) {
      Alert.alert("Erro", "Preencha os campos email e senha!");
    } else {
      const resposta = await managerService.requisicaoLogin(email, senha);
      const verificaTipo = await managerService.GetDadosUsuario(email);
      if (resposta === true && verificaTipo.dadosUsuario.tipo === "PACIENTE") {
        Alert.alert("Bem vindo!", "Login efetuado com sucesso");
        navigation.navigate("Tabs");
      } else {
        if (verificaTipo.dadosUsuario.tipo !== "PACIENTE") {
          setEmail(null);
          setSenha(null);
          Alert.alert("Erro", "Usuário não permitido no sistema!");
        }

        if (resposta === false) {
          setEmail(null);
          setSenha(null);
        }
      }
    }
  }

  async function verificacaoLogado() {
    const email = await AsyncStorage.getItem("@AirBnbApp:email");
    if (email !== undefined && email !== null) {
      navigation.push("Tabs");
    }
    await sleep(1500);
    setCarregando(false);
  }
  useEffect(() => {
    setCarregando(true);
    verificacaoLogado();
  }, []);

  const margemSuperior = height < 200 ? "5px" : "100px";
  const tamanhoFonte = width > 500 ? "18px" : "11px";
  const tamanhoIcone = width > 480 ? 20 : 18;
  const larguraConteudoBotaoEntrar = width > 480 ? "35%" : "40%";
  const larguraBotaoAlternativo = width > 480 ? "90%" : "100%";

  return (
    <>
      <ScrollView>
        <Body>
          {carregando ? (
            <>
            <ActivityIndicator animating={true} color={Colors.black} />
            </>
            ) : (
            <>
              <CaixaTitulo marginTop={margemSuperior}>
                <Logo source={logoGuilherme} />
              </CaixaTitulo>

              <CaixaInputs>
                <Input
                  placeholder="Email"
                  keyboardType="web-search"
                  onChangeText={(e) => setEmail(e)}
                  value={email}
                />
                <Input
                  placeholder="Senha"
                  keyboardType="web-search"
                  secureTextEntry
                  onChangeText={(e) => setSenha(e)}
                  value={senha}
                />
              </CaixaInputs>

              <Botao
                width="32%"
                height="40px"
                backgroundColor={Cores.lilas[1]}
                borderRadius="3px"
                borderColor={Cores.azul}
                borderWidth="3px"
                boxShadow="none"
                onPress={() => requisicaoLogin()}
              >
                <ConteudoBotao
                  width={larguraConteudoBotaoEntrar}
                  fontSize={tamanhoFonte}
                  color={Cores.branco}
                >
                  ENTRAR
                </ConteudoBotao>
              </Botao>

              <SenhaCadastro>
                <Botao
                  backgroundColor="transparent"
                  borderColor="transparent"
                  width="50%"
                  height="40px"
                  borderRadius="3px"
                  borderWidth="3px"
                  boxShadow="none"
                >
                  <ConteudoBotao
                    width="100%"
                    fontSize={tamanhoFonte}
                    color={Cores.preto}
                  >
                    Esqueceu a senha?
                  </ConteudoBotao>
                </Botao>
                <Botao
                  backgroundColor="transparent"
                  borderColor="transparent"
                  width="35%"
                  height="40px"
                  borderRadius="3px"
                  borderWidth="3px"
                  boxShadow="none"
                  onPress={() => navigation.push("Cadastro")}
                >
                  <ConteudoBotao
                    width="100%"
                    fontSize={tamanhoFonte}
                    color="#000000"
                  >
                    Cadastre-se
                  </ConteudoBotao>
                </Botao>
              </SenhaCadastro>
              <BarraEstetica />

              <BotoesAlternativos>
                <Botao
                  width={larguraBotaoAlternativo}
                  height="40px"
                  backgroundColor={Cores.branco}
                  borderRadius="3px"
                  borderColor={Cores.lilas[1]}
                  borderWidth="3px"
                  boxShadow="none"
                >
                  <ConteudoIcone>
                    <Icone>
                      <Icon name="google" size={tamanhoIcone} />
                    </Icone>
                    <ConteudoBotao
                      width="80%"
                      fontSize={tamanhoFonte}
                      color={Cores.preto}
                    >
                      Continuar com o Google
                    </ConteudoBotao>
                  </ConteudoIcone>
                </Botao>
                <Botao
                  width={larguraBotaoAlternativo}
                  height="40px"
                  backgroundColor={Cores.branco}
                  borderRadius="3px"
                  borderColor={Cores.lilas[1]}
                  borderWidth="3px"
                  boxShadow="none"
                >
                  <ConteudoIcone>
                    <Icone>
                      <Icon name="facebook-square" size={tamanhoIcone} />
                    </Icone>
                    <ConteudoBotao
                      width="80%"
                      fontSize={tamanhoFonte}
                      color={Cores.preto}
                    >
                      Continuar com o Facebook
                    </ConteudoBotao>
                  </ConteudoIcone>
                </Botao>
              </BotoesAlternativos>
            </>
          )}
        </Body>
      </ScrollView>
    </>
  );
}

export default Login;
