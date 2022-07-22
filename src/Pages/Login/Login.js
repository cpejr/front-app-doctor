import React, { useState } from "react";
import api from "../../services/api";
import logoGuilherme from "./../../assets/logoGuilherme.png";
import Icon from "react-native-vector-icons/FontAwesome";
import Botao from "./../../styles/Botao";
import ConteudoBotao from "./../../styles/ConteudoBotao";
import Input from "./../../styles/Input";
import * as managerService from "../../services/ManagerService/managerService";
import { useWindowDimensions, ScrollView } from "react-native";
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

function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const { width, height } = useWindowDimensions();

  async function requisicaoLogin() {
    if (email?.length === 0 || senha?.length === 0) {
      alert("Preencha os campos email e senha!");
    } else {
      const resposta = await managerService.requisicaoLogin(email, senha);
      if (resposta) {
        alert("Bem vindo!");
        navigation.navigate("Home");
      } else {
        setEmail(null);
        setSenha(null);
        alert("Erro ao realizar Login!")
        navigation.push("Login");
      }
    }
  }

  const margemSuperior = height < 200 ? "5px" : "100px";
  const tamanhoFonte = width > 500 ? "18px" : "11px";
  const tamanhoIcone = width > 480 ? 20 : 18;
  const larguraConteudoBotaoEntrar = width > 480 ? "35%" : "40%";
  const larguraBotaoAlternativo = width > 480 ? "90%" : "100%";

  return (
    <ScrollView>
      <Body>
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
            <ConteudoBotao width="100%" fontSize={tamanhoFonte} color="#000000">
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
      </Body>
    </ScrollView>
  );
}

export default Login;
