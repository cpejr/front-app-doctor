import React, {useState, useCallback, useRef} from "react";
import { ScrollView, Alert, useWindowDimensions } from "react-native";
import Input from "../../styles/Input";
import Botao from "../../styles/Botao"
import ConteudoBotao from "../../styles/ConteudoBotao"
import logoGuilherme from "./../../assets/logoGuilherme.png";
import {
  Body,
  CaixaTitulo,
  Logo,
  Titulo,
  CaixaInputs,
  MensagemErro,
  CaixaInputsMesmaLinha,
  CaixaBotoes,
} from "./Styles";
import InputMask from "../../styles/InputMask/InputMask";
import { brParaPadrao } from "../../utils/date";

function Cadastro() {

  const [estado, setEstado] = useState({
    nome:'',
    telefone:'',
    data_nascimento:'',
    cpf:'',
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
  const [errorMessage, setErrorMessage] = useState(null);

  const { width, height } = useWindowDimensions();


  function requisicaoCadastro() {

    
       setErrorMessage("Campo Obrigatório!")

    if (estado.senha === estado.senhaConfirmada) {
      const aux = teste()
      estado.data_nascimento = aux

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
        // .catch((error) => {
        //   // requisicaoErro(error, () => history.push("/cadastro"));
        //   console.warn(error)
        // });
    } else {
      console.warn("As senhas digitadas são diferentes.");
    }
  }
  
  function preenchendoDados(   inputIdentifier, enteredValue) {
      setEstado((curEstado) => {
        console.log(inputIdentifier, enteredValue)
        return {
          ...curEstado,
          [inputIdentifier]: enteredValue
        };
        
      });
    
  }

  function teste (){
    try {
      const response = brParaPadrao(estado.data_nascimento)
      return response     
    } catch {
      console.log("Data inválida.")
    }
  }
  
  function preenchendoEndereco(inputIdentifier, enteredValue) {
    setEndereco((curEndereco) => {
      return {
        ...curEndereco,
        [inputIdentifier]: enteredValue
      };
      
    });
  }

  const tamanhoInputs = width < 400 ?  "85%" : "80%";
  const fontSizeConteudoBotao = width < 400 ?  "13px" : "15px";

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

      <CaixaInputs
      width={tamanhoInputs}
      >
        <Input 
        placeholder="Nome Completo:" 
        keyboardType="default"
        width="100%"
        label="Nome"
        onChangeText={(text) => {preenchendoDados('nome', text)}}
        value={estado.nome}
         />
        {errorMessage && <MensagemErro>{errorMessage}</MensagemErro>}
        
        <CaixaInputsMesmaLinha>
          <InputMask
          placeholder="Telefone:" 
          keyboardType="numeric"
          width="48%"
          type={'cel-phone'}
          options={{
            maskType:'BRL',
            withDDD: true,
            dddMask:'(99) '
          }}
          textContentType="telephoneNumber"
          dataDetectorTypes="phoneNumber"
          label="Telefone"
          includeRawValueInChangeText={true}
          onChangeText={(maskedText, rawText) => {
            preenchendoDados('telefone', rawText)}}
          
          value={estado.telefone}
          />
          <InputMask
          placeholder="Data de Nascimento:" 
          keyboardType="numeric"
          type={'datetime'}
          options={{
            format: 'DD-MM-YYYY'
          }}
          width="48%"
          maxLenght="10"
          label="data_nascimento"
          includeRawValueInChangeText={true}
          onChangeText={(text) => {preenchendoDados('data_nascimento', text)}
            }
          value={estado.data_nascimento}
          />
          
        </CaixaInputsMesmaLinha>
        {errorMessage && <MensagemErro>{errorMessage}</MensagemErro>}
        <Input 
        placeholder="CPF:" 
        keyboardType="default"
        width="100%"
        label="cpf"
        onChangeText={(text) => {preenchendoDados('cpf', text)}}
        value={estado.cpf}
        />
        {errorMessage && <MensagemErro>{errorMessage}</MensagemErro>}
         <Input 
        placeholder="Email:" 
        keyboardType="default"
        width="100%"
        label="email"
        onChangeText={(text) => {preenchendoDados('email', text)}}
        value={estado.email}
        />
        {errorMessage && <MensagemErro>{errorMessage}</MensagemErro>}
        <InputMask
        placeholder="CEP:" 
        keyboardType="default"
        type={'custom'}
          options={{
            mask: '99.999-999'
          }}
        width="100%"
        label="CEP"
        includeRawValueInChangeText={true}
        onChangeText={(maskedText, rawText) => {
          preenchendoEndereco('cep', rawText)}}
        value={endereco.cep}
        />
        {errorMessage && <MensagemErro>{errorMessage}</MensagemErro>}
        <Input 
        placeholder="País:" 
        keyboardType="default"
        width="100%"
        label="País"
        onChangeText={(text) => {preenchendoEndereco('pais', text)}}
        value={endereco.pais}
        />
        {errorMessage && <MensagemErro>{errorMessage}</MensagemErro>}
        <Input 
        placeholder="Estado:" 
        keyboardType="default" 
        width="100%"
        label="Estado"
        onChangeText={(text) => {preenchendoEndereco('estado', text)}}
        value={endereco.estado}
        />
        {errorMessage && <MensagemErro>{errorMessage}</MensagemErro>}
        <Input 
        placeholder="Cidade:" 
        keyboardType="default" 
        width="100%"
        label="Cidade"
        onChangeText={(text) => {preenchendoEndereco('cidade', text)}}
        value={endereco.cidade}
        />
        {errorMessage && <MensagemErro>{errorMessage}</MensagemErro>}
        <Input 
        placeholder="Bairro:" 
        keyboardType="default" 
        width="100%"
        label="Bairro"
        onChangeText={(text) => {preenchendoEndereco('bairro', text)}}
        value={endereco.bairro}
        />
        {errorMessage && <MensagemErro>{errorMessage}</MensagemErro>}
        <Input 
        placeholder="Rua:" 
        keyboardType="default" 
        width="100%"
        label="Rua"
        onChangeText={(text) => {preenchendoEndereco('rua', text)}}
        value={endereco.rua}
        />
        {errorMessage && <MensagemErro>{errorMessage}</MensagemErro>}
        <Input 
        placeholder="Número:" 
        keyboardType="default" 
        width="100%"
        label="Numero"
        onChangeText={(text) => {preenchendoEndereco('numero', text)}}
        value={endereco.numero}
        />
        {errorMessage && <MensagemErro>{errorMessage}</MensagemErro>}
        <Input 
        placeholder="Complemento:" 
        keyboardType="default" 
        width="100%"
        label="Complemento"
        onChangeText={(text) => {preenchendoEndereco( 'complemento', text)}}
        value={endereco.complemento}
        />
        {errorMessage && <MensagemErro>{errorMessage}</MensagemErro>}
        <Input 
        placeholder="Defina sua senha:" 
        keyboardType="default" 
        width="100%"
        id="senha"
        type="password"
        secureTextEntry 
        label="Senha"
        onChangeText={(text) => {preenchendoDados('senha', text)}}
        value={estado.senha}
        />
        {errorMessage && <MensagemErro>{errorMessage}</MensagemErro>}
        <Input 
        placeholder="Confirme sua senha:" 
        keyboardType="default"
        width="100%"
        id="senhaConfirmada"
        secureTextEntry 
        type="password"
        label="Senha Confirmada"
        onChangeText={(text) => {preenchendoDados('senhaConfirmada', text)}}
        value={endereco.senhaConfirmada}
        /> 
        {errorMessage && <MensagemErro>{errorMessage}</MensagemErro>}
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
          <ConteudoBotao fontSize={fontSizeConteudoBotao} color="#000000">
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
          fontSize={fontSizeConteudoBotao} 
          color="#ffffff"
          >
            CADASTRAR
          </ConteudoBotao>
        </Botao>
  </CaixaBotoes>
    </Body>
    </ScrollView>
  );
}

export default Cadastro;
