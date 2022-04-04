import React, {useState, useCallback} from "react";
import { ScrollView, Alert } from "react-native";
import Input from "../../styles/Input";
import Botao from "../../styles/Botao"
import ConteudoBotao from "../../styles/ConteudoBotao"
import logoGuilherme from "./../../assets/logoGuilherme.png";
import api from "../../services/api";
import {
  Body,
  CaixaTitulo,
  Logo,
  Titulo,
  CaixaInputs,
  CaixaInputsMesmaLinha,
  CaixaBotoes,
} from "./Styles";
import ComponenteInput from "../../components/ComponenteInput";

function Cadastro() {

  const [estado, setEstado] = useState({
    nome:'',
    telefone:'',
    data_nascimento:'',
    email:'',
    senha:'',
    senhaConfirmada:'',
    tipo:'PACIENTE'
  });
  const [endereco, setEndereco] = useState({
    cep:'',
    pais:'',
    estado:'',
    cidade:'',
    bairro:'',
    rua:'',
    numero:'',
    complemento:''
  });

  function requisicaoCadastro() {
    if (estado.senha === estado.senhaConfirmada) {
      console.warn("Entrou")
      // api
      //   .post("/enderecos", endereco).then(() => {
      //     console.warn("Postou endereco")
      //   })
      //   .then((res) => {
      //     api
      //       .post("/usuarios", { ...estado, id_endereco: res.data.id })
      //       .then(() => {
      //         Alert.alert("Usuário cadastrado com sucesso.");
      //         // navigation.navigate("Home");
      //         console.log(endereco)
      //         console.log(estado)
      //       })
      //       .catch((error) => {
      //         console.warn(error)
      //         // requisicaoErro(error, () => history.push("/cadastro"));
      //       });
      //   })
        .catch((error) => {
          // requisicaoErro(error, () => history.push("/cadastro"));
          console.warn(error)
        });
    } else {
      console.warn("As senhas digitadas são diferentes.");
    }
  }
  
  function preenchendoDados(inputIdentifier, enteredValue) {
    setEstado((curEstado) => {
      return {
        ...curEstado,
        [inputIdentifier]: enteredValue
      };
      
    });
  }
  
  function preenchendoEndereco(inputIdentifier, enteredValue) {
    setEndereco((curEndereco) => {
      return {
        ...curEndereco,
        [inputIdentifier]: enteredValue
      };
      
    });
  } 
  
  return (
    <ScrollView>
    <Body>
      
      <CaixaTitulo>
        <Logo 
        source={logoGuilherme}
        />
        <Titulo>
          Faça seu Cadastro
        </Titulo>
      </CaixaTitulo>

      <CaixaInputs>
        <Input 
        placeholder="Nome Completo:" 
        keyboardType="default"
        width="100%"
        label="Nome"
        onChangeText={preenchendoDados.bind(this, 'nome')}
        value={estado.nome}
         />
        <CaixaInputsMesmaLinha>
          <Input 
          placeholder="Telefone:" 
          keyboardType="numeric"
          width="48%"
          textContentType="telephoneNumber"
          dataDetectorTypes="phoneNumber"
          label="Telefone"
          onChangeText={preenchendoDados.bind(this, 'telefone')}
          value={estado.telefone}
          />
          <Input 
          placeholder="Data de Nascimento:" 
          keyboardType="numeric" 
          width="48%"
          maxLenght="10"
          label="data_nascimento"
          onChangeText={preenchendoDados.bind(this, 'data_nascimento')}
          value={estado.data_nascimento}
          />
        </CaixaInputsMesmaLinha>
         <Input 
        placeholder="Email:" 
        keyboardType="default"
        width="100%"
        label="email"
        onChangeText={preenchendoDados.bind(this, 'email')}
        value={estado.email}
        />
        <Input 
        placeholder="CEP:" 
        keyboardType="default"
        width="100%"
        label="CEP"
        onChangeText={preenchendoEndereco.bind(this, 'cep')}
        value={endereco.cep}
        />
        <Input 
        placeholder="País:" 
        keyboardType="default"
        width="100%"
        label="País"
        onChangeText={preenchendoEndereco.bind(this, 'pais')}
        value={endereco.pais}
        />
        <Input 
        placeholder="Estado:" 
        keyboardType="default" 
        width="100%"
        label="Estado"
        onChangeText={preenchendoEndereco.bind(this, 'estado')}
        value={endereco.estado}
        />
        <Input 
        placeholder="Cidade:" 
        keyboardType="default" 
        width="100%"
        label="Cidade"
        onChangeText={preenchendoEndereco.bind(this, 'cidade')}
        value={endereco.cidade}
        />
        <Input 
        placeholder="Bairro:" 
        keyboardType="default" 
        width="100%"
        label="Bairro"
        onChangeText={preenchendoEndereco.bind(this, 'bairro')}
        value={endereco.bairro}
        />
        <Input 
        placeholder="Rua:" 
        keyboardType="default" 
        width="100%"
        label="Rua"
        onChangeText={preenchendoEndereco.bind(this, 'rua')}
        value={endereco.rua}
        />
        <Input 
        placeholder="Número:" 
        keyboardType="default" 
        width="100%"
        label="Numero"
        onChangeText={preenchendoEndereco.bind(this, 'numero')}
        value={endereco.numero}
        />
        <Input 
        placeholder="Complemento:" 
        keyboardType="default" 
        width="100%"
        label="Complemento"
        onChangeText={preenchendoEndereco.bind(this, 'complemento')}
        value={endereco.complemento}
        />
        <Input 
        placeholder="Defina sua senha:" 
        keyboardType="default" 
        width="100%"
        id="senha"
        type="password"
        secureTextEntry 
        label="Senha"
        onChangeText={preenchendoDados.bind(this, 'senha')}
        value={estado.senha}
        />
        <Input 
        placeholder="Confirme sua senha:" 
        keyboardType="default"
        width="100%"
        id="senhaConfirmada"
        secureTextEntry 
        type="password"
        label="Senha Confirmada"
        onChangeText={preenchendoDados.bind(this, 'senhaConfirmada')}
        value={endereco.senhaConfirmada}
        /> 
      </CaixaInputs>

      <CaixaBotoes>
        <Botao
          width="42%"
          height="35px"
          backgroundColor="#ffffff"
          borderRadius="3px"
          borderColor="rgba(255, 0, 0, 0.25)"
          borderWidth="1px"
        >
          <ConteudoBotao fontSize="15px" color="#000000">
            CANCELAR
          </ConteudoBotao>
        </Botao>
        <Botao
          width="42%"
          height="35px"
          backgroundColor="#434B97"
          borderRadius="3px"
          borderColor="#151B57"
          borderWidth="1px"
          onPress={requisicaoCadastro}
        >
          <ConteudoBotao 
          fontSize="15px" 
          color="#ffffff">
            CADASTRAR
          </ConteudoBotao>
        </Botao>
  </CaixaBotoes>
    </Body>
    </ScrollView>
  );
}

export default Cadastro;
