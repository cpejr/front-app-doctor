import React, { useState } from "react";
import api from "../../services/api";
import logoGuilherme from "./../../assets/logoGuilherme.png";
import Icon from "react-native-vector-icons/FontAwesome";
import Botao from "./../../styles/Botao";
import ConteudoBotao from "./../../styles/ConteudoBotao";
import Input from "./../../styles/Input";
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

function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function requisicaoLogin() {
    console.log(email, senha)
    if (email.length === 0 || senha.length === 0) {
      alert("Preencha os campos email e senha!");
    } else {
      try {
        const resposta = await api.post("/login", {
          email,
          senha,
        });
        alert("Bem vindo");
        login(resposta.data.token);
        navigation.navigate("Home");
      } catch (error) {
        setEmail("");
        setSenha("");
        requisicaoErro(error, () => navigation.navigate("Login"));
        alert(email, senha);
      }
    }
  }
  return (
    <Body>
      <CaixaTitulo>
        <Logo source={logoGuilherme} />
      </CaixaTitulo>

      <CaixaInputs>
        <Input
          placeholder="Email"
          keyboardType="default"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Senha"
          keyboardType="default"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
      </CaixaInputs>

      <Botao
        width="32%"
        height="40px"
        backgroundColor="#434B97"
        borderRadius="3"
        borderColor="#151B57"
        borderWidth="1"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.3)"
        onPress={() => requisicaoLogin()}
      >
        <ConteudoBotao fontSize="15px" color="#ffffff">
          ENTRAR
        </ConteudoBotao>
      </Botao>

      <SenhaCadastro>
        <Botao
          backgroundColor="transparent"
          borderRadius="3"
          borderWidth="1"
          borderColor="transparent"
          color="#151B57"
          fontSize="1em"
          textDecoration="underline"
          boxShadow="none"
        >
          <ConteudoBotao fontSize="15px" color="#000000">
            Esqueceu a senha?
          </ConteudoBotao>
        </Botao>
        <Botao
          backgroundColor="transparent"
          borderRadius="3"
          borderWidth="1"
          borderColor="transparent"
          color="#434B97"
          fontSize="1em"
          textDecoration="underline"
          boxShadow="none"
          onPress={() => navigation.navigate("Cadastro")}
        >
          <ConteudoBotao fontSize="15px" color="#000000">
            Cadastre-se
          </ConteudoBotao>
        </Botao>
      </SenhaCadastro>
      <BarraEstetica />

      <BotoesAlternativos>
        <Botao
          width="100%"
          height="40px"
          backgroundColor="#ffffff"
          borderRadius="3"
          borderColor="#434B97"
          borderWidth="3"
          boxShadow="none"
        >
          <ConteudoIcone>
            <Icone>
              <Icon name="google" size={18} color="#000000" />
            </Icone>
            <ConteudoBotao width="80%" fontSize="15px" color="#000000">
              Continuar com o Google
            </ConteudoBotao>
          </ConteudoIcone>
        </Botao>
        <Botao
          width="100%"
          height="40px"
          backgroundColor="#ffffff"
          borderRadius="3"
          borderColor="#434B97"
          borderWidth="3"
          boxShadow="none"
        >
          <ConteudoIcone>
            <Icone>
              <Icon name="facebook-square" size={18} color="#3b5998" />
            </Icone>
            <ConteudoBotao width="80%" fontSize="15px" color="#000000">
              Continuar com o Facebook
            </ConteudoBotao>
          </ConteudoIcone>
        </Botao>
      </BotoesAlternativos>
    </Body>
  );
}

export default Login;
