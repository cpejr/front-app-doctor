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
  CaixaRotulo,
  CaixaRotuloMesmaLinha,
  Rotulo,
  Data,
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
import _ from "lodash";

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

  const errors = {};
  const teste = {
    nome: false,
    telefone: false,
    email: false,
    cep: false,
    pais: false,
    estado: false,
    cidade: false,
    rua: false,
    numero: false,
    cpf: false,
    data_nascimento: false,
    bairro: false,
    senha: false,
    senhaConfirmada: false,
  };

  const [erro, setErro] = useState(false);

  const [estadoSelecionado, setEstadoSelecionado] = useState();
  const [carregando, setCarregando] = useState(false);
  const [cepFormatado, setCepFormatado] = useState("");
  const [camposVazios, setCamposVazios] = useState(false);
  const [data_nascimentoFront, setData_nascimentoFront] = useState();

  const { width, height } = useWindowDimensions();

  const apenasLetras = (value) => {
    return value.replace(/[^A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+/g, "");
  };

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
    if (!estado.nome) errors.nome = true;
    if (!estado.telefone) errors.telefone = true;
    if (!estado.tipo) errors.tipo = true;
    if (!estado.data_nascimento) errors.data_nascimento = true;
    if (!estado.cpf) errors.cpf = true;
    if (!estado.email) errors.email = true;
    if (!endereco.cep) errors.cep = true;
    if (!endereco.pais) errors.pais = true;
    if (!endereco.estado) errors.estado = true;
    if (!endereco.cidade) errors.cidade = true;
    if (!endereco.bairro) errors.bairro = true;
    if (!endereco.rua) errors.rua = true;
    if (!endereco.numero) errors.numero = true;
    if (!estado.senha) errors.senha = true;
    if (!estado.senhaConfirmada) errors.senhaConfirmada = true;
    if (erro.email === true) errors.email = true;

    setCamposVazios({ ...camposVazios, ...errors });


    if (_.isEqual(camposVazios, teste)) {
      if (estado.senha === estado.senhaConfirmada) {

        const dataFormatada = formatacaoData();
        estado.data_nascimento = dataFormatada;
        const resposta = await managerService.requisicaoCriarUsuario(
          estado,
          endereco
        );
        if (resposta) {
          Alert.alert("Bem vindo(a)", "Usuário cadastrado com sucesso!");
          navigation.navigate("Login");
        } else {
          Alert.alert("Erro", "Não foi possível cadastrar o usuario!");
          navigation.push("Cadastro");
        }
      } else {
        Alert.alert("Erro", "As senhas digitadas são diferentes!");
      }
    } else {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios!");
   
    }

    setCarregando(false);
  }

  function setandoCamposNulos(inputIdentifier, enteredValue) {
    if (inputIdentifier !== "complemento") {
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
  }

  function preenchendoDados(inputIdentifier, enteredValue) {
    if (inputIdentifier === "nome") {
      enteredValue = apenasLetras(enteredValue);
    }

    if(inputIdentifier === "data_nascimento"){
      setData_nascimentoFront(enteredValue);
     }

    if (
      (inputIdentifier === "telefone" && enteredValue.length < 11) ||
      (inputIdentifier === "cpf" && enteredValue.length < 11) ||
      (inputIdentifier === "senha" && enteredValue.length < 8) ||
      (inputIdentifier === "senhaConfirmada" && enteredValue.length < 8)
    ) {
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

  function formatacaoData() {
    try {
      const response = brParaPadrao(data_nascimentoFront);
      return response;
    } catch {
      alert("Data inválida.");
    }
  }

  function preenchendoEndereco(inputIdentifier, enteredValue) {
    if (inputIdentifier === "cidade" || inputIdentifier === "pais") {
      enteredValue = apenasLetras(enteredValue);
    }
    if (inputIdentifier === "cep" && enteredValue.length < 8) {
      setErro({ ...erro, [inputIdentifier]: true });
    } else {
      setErro({ ...erro, [inputIdentifier]: false });
    }

    setandoCamposNulos(inputIdentifier, enteredValue);

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
            camposVazios={camposVazios.nome}
          />
          <CaixaInputsMesmaLinha>
            <CaixaRotuloMesmaLinha>
              <InputMask
                placeholder="Telefone:"
                keyboardType="numeric"
                width="100%"
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
                erro={erro.telefone}
                camposVazios={camposVazios.telefone}
              />
              {erro.telefone && (
                <Rotulo>Digite um telefone no formato (xx)xxxxx-xxxx</Rotulo>
              )}
            </CaixaRotuloMesmaLinha>
            <CaixaRotuloMesmaLinha>
              <Data
                customStyles={{
                  dateInput: { borderWidth: 0 },
                  placeholderText: { color: "#90929B" },
                }}
                placeholder="Data de Nascimento:"
                maxDate={new Date()}
                format="DD/MM/YYYY"
                mode="date"
                showIcon={false}
                date={estado.data_nascimento}
                onDateChange={(data) => {
                  preenchendoDados("data_nascimento", data);
                }}
                camposVazios={camposVazios.data_nascimento}
              />
            </CaixaRotuloMesmaLinha>
          </CaixaInputsMesmaLinha>
          <CaixaRotulo>
            <InputMask
              placeholder="CPF:"
              keyboardType="numeric"
              width="100%"
              label="cpf"
              type={"cpf"}
              includeRawValueInChangeText={true}
              onChangeText={(maskedText, rawText) => {
                preenchendoDados("cpf", rawText);
              }}
              value={estado.cpf}
              erro={erro.cpf}
              camposVazios={camposVazios.cpf}
            />
            {erro.cpf && (
              <Rotulo>Digite um CPF no formato xxx.xxx.xxx-xx</Rotulo>
            )}
          </CaixaRotulo>
          <CaixaRotulo>
            <Input
              placeholder="Email:"
              keyboardType="default"
              width="100%"
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
          </CaixaRotulo>
          <CaixaRotulo>
            <InputMask
              placeholder="CEP:"
              keyboardType="numeric"
              type={"zip-code"}
              width="100%"
              label="CEP"
              includeRawValueInChangeText={true}
              onChangeText={(maskedText, rawText) => {
                preenchendoEndereco("cep", rawText);
              }}
              value={endereco.cep}
              erro={erro.cep}
              camposVazios={camposVazios.cep}
            />
            {erro.cep && <Rotulo>Digite um CEP no formato xxxxx-xxx</Rotulo>}
          </CaixaRotulo>
          <Input
            placeholder="País:"
            keyboardType="default"
            width="100%"
            label="País"
            onChangeText={(text) => {
              preenchendoEndereco("pais", text);
            }}
            value={endereco.pais}
            camposVazios={camposVazios.pais}
          />

          <PickerView camposVazios={camposVazios.estado}>
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
            camposVazios={camposVazios.cidade}
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
            camposVazios={camposVazios.bairro}
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
            camposVazios={camposVazios.rua}
          />
          <InputMask
            type={"only-numbers"}
            pattern="[0-9]*"
            placeholder="Número:"
            keyboardType="numeric"
            width="100%"
            label="Numero"
            onChangeText={(text) => {
              preenchendoEndereco("numero", text);
            }}
            value={endereco.numero}
            camposVazios={camposVazios.numero}
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
          <CaixaRotulo>
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
              camposVazios={camposVazios.senha}
              erro={erro.senha}
            />
            {erro.senha && (
              <Rotulo>A senha deve ter no minimo 8 digitos</Rotulo>
            )}
          </CaixaRotulo>
          <CaixaRotulo>
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
              camposVazios={camposVazios.senhaConfirmada}
              erro={erro.senhaConfirmada}
            />
            {erro.senhaConfirmada && (
              <Rotulo>A senha deve ter no minimo 8 digitos</Rotulo>
            )}
          </CaixaRotulo>
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
