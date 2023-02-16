import React, { useState, useEffect } from "react";
import { useWindowDimensions, ScrollView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, Colors } from "react-native-paper";
import {
  Body,
  PaginaCarregando,
  CaixaTitulo,
  Logo,
  CaixaInputs,
  SenhaCadastro,
  TituloInput,
  AnimacaoCarregando,
  Rotulo,
} from "./Styles";
import { Cores } from "../../variaveis";
import { sleep } from "../../utils/sleep";
import Botao from "./../../styles/Botao";
import ConteudoBotao from "./../../styles/ConteudoBotao";
import Input from "./../../styles/Input";
import logoGuilherme from "./../../assets/logoGuilherme.png";
import * as managerService from "../../services/ManagerService/managerService";
import _ from "lodash";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(false);
  const [camposVazios, setCamposVazios] = useState({
    email: false,
    senha: false,
  });
  const { width, height } = useWindowDimensions();
  const [carregandoPagina, setCarregandoPagina] = useState(true);
  const [carregando, setCarregando] = useState();
  const [estado, setEstado] = useState({
    email: "",
    senha: "",
  });


  const errors = {};
  const teste = {
    email: false,
    senha: false,
  };


  async function verificandoErros() {
    if (!estado.email) errors.email = true;
    if (!estado.senha) errors.senha = true;
    if (erro.email === true) errors.email = true;
    if (erro.senha === true) errors.senha = true;

    for (const propriedade_errors in errors) {
      if (errors[propriedade_errors] === true) {
        for (const propriedade_campos in camposVazios) {
          if (propriedade_campos === propriedade_errors) {
            camposVazios[propriedade_campos] = true;
          }
        }
      }
    }

    if (_.isEqual(camposVazios, teste)) {
      requisicaoLogin();
    } else {
      Alert.alert(
        "Erro",
        "Preencha todos os campos obrigatórios corretamente!"
      );
      await sleep(1500);
      setCarregando(false);
    }
  }

  function setandoCamposNulos(inputIdentifier, enteredValue) {
    if (
      enteredValue === "" ||
      enteredValue === undefined ||
      enteredValue === null
    ) {
      setCamposVazios({ ...camposVazios, [inputIdentifier]: true });
    } else {
      setCamposVazios({ ...camposVazios, [inputIdentifier]: false });
    }
  }

  function preenchendoSenha(inputIdentifier, enteredValue) {
    if (inputIdentifier === "senha" && enteredValue.length < 8) {
      setErro({ ...erro, [inputIdentifier]: true });
    } else {
      setErro({ ...erro, [inputIdentifier]: false });
    }

    setandoCamposNulos(inputIdentifier, enteredValue);

    setEstado((curEstado) => {
      return {
        ...curEstado,
        [inputIdentifier]: enteredValue,
      };
    });
  }

  function preenchendoEmail(inputIdentifier, enteredValue) {
    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    if (inputIdentifier === "email") {
      if (!regEx.test(enteredValue)) {
        setErro({ ...erro, [inputIdentifier]: true });
      } else {
        setErro({ ...erro, [inputIdentifier]: false });
      }
    }

    setandoCamposNulos(inputIdentifier, enteredValue);

    setEstado((curEstado) => {
      return {
        ...curEstado,
        [inputIdentifier]: enteredValue,
      };
    });
  }

  async function registrandoNotificacoes(id){
    if (!Device.isDevice){
      return null;
    }
    const {status} = await Notifications.requestPermissionsAsync();
    if(status !== "granted"){
      return null;
    }
    if (Platform.OS == "android"){
      Notifications.setNotificationChannelAsync("default", {
        
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
      });
    }
    const tokenNotificacoes = await Notifications.getExpoPushTokenAsync();
    await managerService.requisicaoToken(id,(tokenNotificacoes.type +'/'+ tokenNotificacoes.data))
  }

  async function requisicaoLogin() {
    setCarregando(true);
    const email = estado.email;
    const senha = estado.senha;
    const resposta = await managerService.requisicaoLogin(email, senha);
    const verificaTipo = await managerService.GetDadosUsuario(email);

    if (resposta === true && verificaTipo.dadosUsuario.tipo === "PACIENTE") {
      Alert.alert("Bem vindo!", "Login efetuado com sucesso");
      navigation.navigate("Tabs");
      setCarregando(false);
      registrandoNotificacoes(verificaTipo.dadosUsuario.id);
    } else {
      if (resposta === true && verificaTipo.dadosUsuario.tipo !== "PACIENTE") {
        setEmail(null);
        setSenha(null);
        Alert.alert("Erro", "Usuário não permitido no sistema!");
      }

      if (resposta === false) {
        setEmail(null);
        setSenha(null);
      }
      setCarregando(false);
    }
  }

  async function verificacaoLogado() {
    const email = await AsyncStorage.getItem("@AirBnbApp:email");
    if (email !== undefined && email !== null) {
      navigation.push("Tabs");
    }
    await sleep(1500);
    setCarregandoPagina(false);
  }

  useEffect(() => {
    setCarregandoPagina(true);
    verificacaoLogado();
  }, []);

  const margemSuperior = height < 200 ? "5px" : "100px";
  const alturaBotao = height > 400 ? "40px" : "55px";
  const tamanhoFonte = width > 500 ? "17px" : "11px";
  const larguraConteudoBotaoEntrar = width > 480 ? "35%" : "40%";

  return (
    <>
      <ScrollView>
        <Body>
          {carregandoPagina ? (
            <>
              <PaginaCarregando>
                <ActivityIndicator animating={true} color={Colors.black} />
              </PaginaCarregando>
            </>
          ) : (
            <>
              <CaixaTitulo marginTop={margemSuperior}>
                <Logo source={logoGuilherme} />
              </CaixaTitulo>

              <CaixaInputs>
                <TituloInput>Email:</TituloInput>
                <Input
                  placeholder="Email"
                  keyboardType="web-search"
                  label="email"
                  onChangeText={(text) => {
                    preenchendoEmail("email", text);
                  }}
                  value={estado.email}
                  erro={erro.email}
                  camposVazios={camposVazios.email}
                />
                {erro.email && (
                  <Rotulo>Digite um email no formato email@email.com</Rotulo>
                )}

                <TituloInput>Senha:</TituloInput>
                <Input
                  placeholder="Senha"
                  keyboardType="web-search"
                  secureTextEntry
                  label="Senha"
                  onChangeText={(text) => {
                    preenchendoSenha("senha", text);
                  }}
                  value={estado.senha}
                  camposVazios={camposVazios.senha}
                  erro={erro.senha}
                />
                {erro.senha && (
                  <Rotulo>Digite uma senha com no minimo 8 digitos</Rotulo>
                )}
              </CaixaInputs>

              <Botao
                width="32%"
                height="40px"
                backgroundColor={Cores.lilas[1]}
                borderRadius="3px"
                borderColor={Cores.azul}
                borderWidth="3px"
                boxShadow="none"
                onPress={() => verificandoErros()}
              >
                <ConteudoBotao
                  width={larguraConteudoBotaoEntrar}
                  fontSize={tamanhoFonte}
                  color={Cores.branco}
                >
                  {carregando ? (
                    <AnimacaoCarregando>
                      <ActivityIndicator
                        animating={true}
                        color={Cores.branco}
                      />
                    </AnimacaoCarregando>
                  ) : (
                    <>ENTRAR</>
                  )}
                </ConteudoBotao>
              </Botao>

              <SenhaCadastro>
                <Botao
                  backgroundColor="transparent"
                  borderColor="transparent"
                  width="100%"
                  height={alturaBotao}
                  borderRadius="3px"
                  borderWidth="3px"
                  boxShadow="none"
                  flexDirection="column"
                  onPress={() => navigation.push("AlterarSenhaComEmail")}
                >
                  <ConteudoBotao
                    width="100%"
                    fontSize={tamanhoFonte}
                    color={Cores.preto}
                  >
                    Esqueceu a senha?
                  </ConteudoBotao>
                  <ConteudoBotao
                    width="100%"
                    fontSize={tamanhoFonte}
                    color={Cores.preto}
                    textDecoration="underline"
                  >
                    Clique aqui para recuperá-la
                  </ConteudoBotao>
                </Botao>
                <Botao
                  backgroundColor="transparent"
                  borderColor="transparent"
                  width="100%"
                  height="40px"
                  marginTop="15px"
                  borderRadius="3px"
                  borderWidth="3px"
                  boxShadow="none"
                  onPress={() => navigation.push("Cadastro")}
                >
                  <ConteudoBotao
                    width="100%"
                    fontSize={tamanhoFonte}
                    color="#000000"
                    textDecoration="underline"
                  >
                    Cadastre-se
                  </ConteudoBotao>
                </Botao>
              </SenhaCadastro>
          
            </>
          )}
        </Body>
      </ScrollView>
    </>
  );
}

export default Login;