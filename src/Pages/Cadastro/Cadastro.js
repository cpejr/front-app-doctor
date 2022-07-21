import React, { useState, useCallback, useRef } from "react";
import {
  ScrollView,
  Alert,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import Input from "../../styles/Input";
import Botao from "../../styles/Botao";
import ConteudoBotao from "../../styles/ConteudoBotao";
import logoGuilherme from "./../../assets/logoGuilherme.png";
import requisicaoErro from "../../utils/HttpErros";
import { Picker } from "@react-native-picker/picker";
import { ActivityIndicator, Colors, Checkbox } from "react-native-paper";
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
  CheckboxTexto,
  Lgpd,
} from "./Styles";
import InputMask from "../../styles/InputMask/InputMask";
import { brParaPadrao } from "../../utils/date";
import api from "../../services/api";
import { estados } from "./estados";
import { useFonts } from "expo-font";
import * as managerService from "../../services/ManagerService/managerService";

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
  const [estadoSelecionado, setEstadoSelecionado] = useState();
  const [carregando, setCarregando] = useState(false);
  const [cepFormatado, setCepFormatado] = useState("");

  const { width, height } = useWindowDimensions();

  async function verificacaoTermosUso() {
    setCarregando(true);
    if (!checked) {
      alert("É obrigatório concordar com os termos de uso.");
      setCarregando(false);
    } else {
      requisicaoCadastro();
    }
  }

  async function requisicaoCadastro() {
    if (estado.senha === estado.senhaConfirmada) {
      const dataFormatada = formatacaoData();
      estado.data_nascimento = dataFormatada;
      const resposta = await managerService.requisicaoCriarUsuario(
        estado,
        endereco
      );
      if (resposta) {
        alert("Usuário cadastrado com sucesso.");
        navigation.navigate("Login");
      } else {
        alert("Erro ao cadastrar usuario!");
        navigation.push("Cadastro");
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
  const margemSuperior = height < 200 ? "5px" : "100px";
  const tamanhoInputs = width < 400 ? "85%" : "80%";
  const larguraCaixaTitulo = width < 400 ? "70%" : larguraCaixaTituloMaior;
  const larguraTitulo = width < 300 ? "45%" : larguraTituloMaior;

  const [checked, setChecked] = useState(false);
  const [loaded] = useFonts({
    BarlowSemibold: require("../../assets/fonts/Barlow-SemiBold.ttf"),
    BarlowMedium: require("../../assets/fonts/Barlow-Medium.ttf"),
  });
  if (!loaded) {
    return null;
  }

  return (
    <ScrollView>
      <Body>
        <CaixaTitulo marginTop={margemSuperior} width={larguraCaixaTitulo}>
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
          <InputMask
            placeholder="CPF:"
            keyboardType="default"
            width="100%"
            label="cpf"
            type={"cpf"}
            includeRawValueInChangeText={true}
            onChangeText={(maskedText, rawText) => {
              preenchendoDados("cpf", rawText);
            }}
            value={estado.cpf}
          />
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
          <InputMask
            placeholder="CEP:"
            keyboardType="default"
            type={"zip-code"}
            width="100%"
            label="CEP"
            includeRawValueInChangeText={true}
            onChangeText={(maskedText, rawText) => {
              preenchendoEndereco("cep", rawText);
            }}
            value={endereco.cep}
          />
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

          <PickerView>
            <PickerEstado
              selectedValue={estadoSelecionado}
              onValueChange={(itemValue, itemIndex) => {
                setEstadoSelecionado(itemValue);
                preenchendoEndereco("estado", itemValue);
              }}
            >
              <Picker.Item
                style={{ fontSize: 15, color: "grey" }}
                value=""
                label="Selecione um Estado"
              />
              {estados.map((estado) => (
                <Picker.Item
                  key={estado.sigla}
                  style={{ fontSize: 15, color: "black" }}
                  value={estado.sigla}
                  label={estado.nome}
                />
              ))}
            </PickerEstado>
          </PickerView>

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
        </CaixaInputs>

        <CheckboxTexto>
          <Checkbox
            status={checked ? "checked" : "unchecked"}
            onPress={() => {
              setChecked(!checked);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("LGPD");
            }}
          >
            <Lgpd fontFamily="BarlowMedium">
              Li e concordo com os Termos de Uso
            </Lgpd>
          </TouchableOpacity>
        </CheckboxTexto>

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
            <ConteudoBotao fontSize="15px" color="#000000" width="100%">
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
            onPress={verificacaoTermosUso}
          >
            {carregando ? (
              <ActivityIndicator animating={true} color={Colors.white} />
            ) : (
              <ConteudoBotao fontSize="15px" color="#ffffff" width="100%">
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
