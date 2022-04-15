import React, { useState } from "react";
import api from "../../services/api";
import logoGuilherme from "./../../assets/logoGuilherme.png";
import Icon from "react-native-vector-icons/FontAwesome";
import Botao from "./../../styles/Botao";
import ConteudoBotao from "./../../styles/ConteudoBotao";
import Input from "./../../styles/Input";
import AsyncStorage from '@react-native-async-storage/async-storage';
import requisicaoErro from "../../utils/HttpErros";
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

function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const { width, height } = useWindowDimensions();

  async function requisicaoLogin() {
    if (email?.length === 0 || senha?.length === 0) {
      alert("Preencha os campos email e senha!");
    } else {
      
        api.post("/login", {
          email,
          senha
        }).then((res) => {
        AsyncStorage.setItem("@AirBnbApp:token", res.data.token);
        AsyncStorage.setItem("@AirBnbApp:email", res.data.email);
        alert("Bem vindo!")
        navigation.navigate("Home");
        }
        ).catch((error) => {
          setEmail(null);
          setSenha(null)
          requisicaoErro(error, () => navigation.navigate("Home"))
        });
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
          backgroundColor="#434B97"
          borderRadius="3px"
          borderColor="#151B57"
          borderWidth="3px"
          boxShadow="none"
          onPress={() => requisicaoLogin()}
        >
          <ConteudoBotao
            width={larguraConteudoBotaoEntrar}
            fontSize={tamanhoFonte}
            color="#ffffff"
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
            <ConteudoBotao width="100%" fontSize={tamanhoFonte} color="#000000">
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
            onPress={() => navigation.navigate("Cadastro")}
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
            backgroundColor="#ffffff"
            borderRadius="3px"
            borderColor="#434B97"
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
                color="#000000"
              >
                Continuar com o Google
              </ConteudoBotao>
            </ConteudoIcone>
          </Botao>
          <Botao
            width={larguraBotaoAlternativo}
            height="40px"
            backgroundColor="#ffffff"
            borderRadius="3px"
            borderColor="#434B97"
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
                color="#000000"
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
