import React, { useState, useCallback, useRef } from "react";
import { ScrollView, Alert, useWindowDimensions } from "react-native";
import Input from "../../styles/Input";
import Botao from "../../styles/Botao";
import ConteudoBotao from "../../styles/ConteudoBotao";
import logoGuilherme from "./../../assets/logoGuilherme.png";
import requisicaoErro from "../../utils/HttpErros";
import { Picker } from "@react-native-picker/picker";
import { ActivityIndicator, Colors } from "react-native-paper";
import {
  Body,
  CaixaTitulo,
  Logo,
  Titulo,
  CaixaInputs,
  PickerView,
  PickerEstado,
  MensagemErro,
  CaixaInputsMesmaLinha,
  CaixaBotoes,
} from "./Styles";
import InputMask from "../../styles/InputMask/InputMask";
import { brParaPadrao } from "../../utils/date";
import api from "../../services/api";

function Cadastro({ navigation }) {
  const [estado, setEstado] = useState({
    nome: "",
    telefone: "",
    data_nascimento: "",
    cpf: "",
    email: "",
    senha: "",
    senhaConfirmada: "",
    tipo: "PACIENTE",
  });
  const [endereco, setEndereco] = useState({
    cep: "",
    pais: "",
    estado: "",
    cidade: "",
    bairro: "",
    rua: "",
    numero: "",
    complemento: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [estadoSelecionado, setEstadoSelecionado] = useState();
  const [carregando, setCarregando] = useState(false);

  const { width, height } = useWindowDimensions();

  async function requisicaoCadastro() {
    //setErrorMessage("Campo Obrigatório!")
    setCarregando(true);
    if (estado.senha === estado.senhaConfirmada) {
      const dataFormatada = formatacaoData();
      estado.data_nascimento = dataFormatada;

      try {
        await api.post("/enderecos", endereco).then((res) => {
          api
            .post("/usuarios", { ...estado, id_endereco: res.data.id })
            .then(() => {
              alert("Usuário cadastrado com sucesso.");
              navigation.navigate("Home");
            })
            .catch((error) => {
              requisicaoErro(error, () => navigation.push("Cadastro"));
            });
        });
      } catch (error) {
        requisicaoErro(error, () => navigation.push("Cadastro"));
      }
    } else {
      alert("As senhas digitadas são diferentes.");
    }
    setCarregando(false);
  }

  function preenchendoDados(inputIdentifier, enteredValue) {
    setEstado((curEstado) => {
      return {
        ...curEstado,
        [inputIdentifier]: enteredValue,
      };
    });
  }

  function formatacaoData() {
    try {
      const response = brParaPadrao(estado.data_nascimento);
      return response;
    } catch {
      alert("Data inválida.");
    }
  }

  function preenchendoEndereco(inputIdentifier, enteredValue) {
    setEndereco((curEndereco) => {
      return {
        ...curEndereco,
        [inputIdentifier]: enteredValue,
      };
    });
  }
  //responsividade paisagem
  const larguraCaixaTituloMaior = width < 600 ? "50%" : "60%";
  const larguraTituloMaior = width < 600 ? "50%" : "60%";
  //responsividade aparelhos
  const tamanhoInputs = width < 400 ? "85%" : "80%";
  const fontSizeConteudoBotao = width < 400 ? "13px" : "15px";
  const larguraCaixaTitulo = width < 400 ? "70%" : "50%";
  const larguraTitulo = width < 300 ? "45%" : "50%";

  return (
    <ScrollView>
      <Body>
        <CaixaTitulo width={larguraCaixaTitulo}>
          <Logo source={logoGuilherme} />
          <Titulo width={larguraTitulo}>Faça seu Cadastro</Titulo>
        </CaixaTitulo>

        <CaixaInputs width={tamanhoInputs}>
          <Input
            placeholder="Nome Completo:"
            keyboardType="default"
            width="100%"
            label="Nome"
            onChangeText={(text) => {
              preenchendoDados("nome", text);
            }}
            value={estado.nome}
          />
          {errorMessage && <MensagemErro>{errorMessage}</MensagemErro>}

          <CaixaInputsMesmaLinha>
            <InputMask
              placeholder="Telefone:"
              keyboardType="numeric"
              width="48%"
              type={"cel-phone"}
              options={{
                maskType: "BRL",
                withDDD: true,
                dddMask: "(99) ",
              }}
              textContentType="telephoneNumber"
              dataDetectorTypes="phoneNumber"
              label="Telefone"
              includeRawValueInChangeText={true}
              onChangeText={(maskedText, rawText) => {
                preenchendoDados("telefone", rawText);
              }}
              value={estado.telefone}
            />
            <InputMask
              placeholder="Data de Nascimento:"
              keyboardType="numeric"
              type={"datetime"}
              options={{
                format: "DD-MM-YYYY",
              }}
              width="48%"
              maxLenght="10"
              label="data_nascimento"
              includeRawValueInChangeText={true}
              onChangeText={(text) => {
                preenchendoDados("data_nascimento", text);
              }}
              value={estado.data_nascimento}
            />
          </CaixaInputsMesmaLinha>
          {errorMessage && <MensagemErro>{errorMessage}</MensagemErro>}
          <Input
            placeholder="CPF:"
            keyboardType="default"
            width="100%"
            label="cpf"
            onChangeText={(text) => {
              preenchendoDados("cpf", text);
            }}
            value={estado.cpf}
          />
          {errorMessage && <MensagemErro>{errorMessage}</MensagemErro>}
          <Input
            placeholder="Email:"
            keyboardType="default"
            width="100%"
            label="email"
            onChangeText={(text) => {
              preenchendoDados("email", text);
            }}
            value={estado.email}
          />
          {errorMessage && <MensagemErro>{errorMessage}</MensagemErro>}
          {/* <InputMask
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
          console.log(rawText, maskedText)
          preenchendoEndereco('cep', rawText)}}
        value={endereco.cep}
        /> */}
          <Input
            placeholder="CEP:"
            keyboardType="default"
            width="100%"
            label="CEP"
            onChangeText={(text) => {
              preenchendoEndereco("cep", text);
            }}
            value={endereco.cep}
          />
          {errorMessage && <MensagemErro>{errorMessage}</MensagemErro>}
          <Input
            placeholder="País:"
            keyboardType="default"
            width="100%"
            label="País"
            onChangeText={(text) => {
              preenchendoEndereco("pais", text);
            }}
            value={endereco.pais}
          />
          {errorMessage && <MensagemErro>{errorMessage}</MensagemErro>}
          <PickerView>
            <PickerEstado
              selectedValue={estadoSelecionado}
              onValueChange={(itemValue, itemIndex) => {
                setEstadoSelecionado(itemValue);
                preenchendoEndereco("estado", itemValue);
              }}
              style={{ height: 40 }}
              itemStyle={{
                backgroundColor: "grey",
                color: "blue",
                fontSize: 17,
              }}
            >
              <Picker.Item value="" label="Selecione um Estado" />
              <Picker.Item value="AC" label="Acre" />
              <Picker.Item value="AL" label="Alagoas" />
              <Picker.Item value="AP" label="Amapá" />
              <Picker.Item value="AM" label="Amazonas" />
              <Picker.Item value="BA" label="Bahia" />
              <Picker.Item value="CE" label="Ceará" />
              <Picker.Item value="DF" label="Distrito Federal" />
              <Picker.Item value="ES" label="Espírito Santo" />
              <Picker.Item value="GO" label="Goiás" />
              <Picker.Item value="MA" label="Maranhão" />
              <Picker.Item value="MT" label="Mato Grosso" />
              <Picker.Item value="MS" label="Mato Grosso do Sul" />
              <Picker.Item value="MG" label="Minas Gerais" />
              <Picker.Item value="PA" label="Pará" />
              <Picker.Item value="PB" label="Paraíba" />
              <Picker.Item value="PR" label="Paraná" />
              <Picker.Item value="PE" label="Pernambuco" />
              <Picker.Item value="PI" label="Piauí" />
              <Picker.Item value="RJ" label="Rio de Janeiro" />
              <Picker.Item value="RN" label="Rio Grande do Norte" />
              <Picker.Item value="RS" label="Rio Grande do Sul" />
              <Picker.Item value="RO" label="Rondônia" />
              <Picker.Item value="RR" label="Roraima" />
              <Picker.Item value="SC" label="Santa Catarina" />
              <Picker.Item value="SP" label="São Paulo" />
              <Picker.Item value="SE" label="Sergipe" />
              <Picker.Item value="TO" label="Tocantins" />
              <Picker.Item value="EX" label="Estrangeiro" />
            </PickerEstado>
          </PickerView>
          {errorMessage && <MensagemErro>{errorMessage}</MensagemErro>}
          <Input
            placeholder="Cidade:"
            keyboardType="default"
            width="100%"
            label="Cidade"
            onChangeText={(text) => {
              preenchendoEndereco("cidade", text);
            }}
            value={endereco.cidade}
          />
          {errorMessage && <MensagemErro>{errorMessage}</MensagemErro>}
          <Input
            placeholder="Bairro:"
            keyboardType="default"
            width="100%"
            label="Bairro"
            onChangeText={(text) => {
              preenchendoEndereco("bairro", text);
            }}
            value={endereco.bairro}
          />
          {errorMessage && <MensagemErro>{errorMessage}</MensagemErro>}
          <Input
            placeholder="Rua:"
            keyboardType="default"
            width="100%"
            label="Rua"
            onChangeText={(text) => {
              preenchendoEndereco("rua", text);
            }}
            value={endereco.rua}
          />
          {errorMessage && <MensagemErro>{errorMessage}</MensagemErro>}
          <Input
            placeholder="Número:"
            keyboardType="default"
            width="100%"
            label="Numero"
            onChangeText={(text) => {
              preenchendoEndereco("numero", text);
            }}
            value={endereco.numero}
          />
          {errorMessage && <MensagemErro>{errorMessage}</MensagemErro>}
          <Input
            placeholder="Complemento:"
            keyboardType="default"
            width="100%"
            label="Complemento"
            onChangeText={(text) => {
              preenchendoEndereco("complemento", text);
            }}
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
            onChangeText={(text) => {
              preenchendoDados("senha", text);
            }}
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
            onChangeText={(text) => {
              preenchendoDados("senhaConfirmada", text);
            }}
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
            onPress={() => {
              navigation.navigate("Login");
            }}
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
            {carregando ? (
              <ActivityIndicator animating={true} color={Colors.white} />
            ) : (
              <ConteudoBotao fontSize={fontSizeConteudoBotao} color="#ffffff">
                CADASTRAR
              </ConteudoBotao>
            )}
          </Botao>
        </CaixaBotoes>
      </Body>
    </ScrollView>
  );
}

export default Cadastro;
