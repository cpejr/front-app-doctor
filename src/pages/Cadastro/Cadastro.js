import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Alert,
  useWindowDimensions,
  TouchableOpacity,
  Switch,
  View,
} from "react-native";
import Input from "../../styles/Input";
import Botao from "../../styles/Botao";
import ConteudoBotao from "../../styles/ConteudoBotao";
import logoGuilherme from "./../../assets/logoGuilherme.png";
import requisicaoErro from "../../utils/HttpErros";
import { Picker } from "@react-native-picker/picker";
import { ActivityIndicator, Colors, Checkbox, Button } from "react-native-paper";
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
  CaixaTituloInput,
  TituloInput,
  PossuiConvenio,
  Texto,
  CaixaTextoConvenioCuidador,
  CaixaParaDatadeNascimento,
} from "./Styles";
import InputMask from "../../styles/InputMask/InputMask";
import { brParaPadrao } from "../../utils/date";
import api from "../../services/api";
import { estados } from "./estados";
import { useFonts } from "expo-font";
import * as managerService from "../../services/ManagerService/managerService";
import _ from "lodash";
import { isEqual } from "lodash";
import { sleep } from "../../utils/sleep";

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
  const [camposVazios, setCamposVazios] = useState({
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
  });
  const [data_nascimentoFront, setData_nascimentoFront] = useState();

  const { width, height } = useWindowDimensions();

  const [convenio, setConvenio] = useState(false);
  const [cuidador, setCuidador] = useState(false);

  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
  function formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
  }

  const [formularios, setFormularios] = useState([]);
  const [formularioEspecifico, setFormularioEspecifico] = useState();
  const [idUsuarioCriado, setIdUsuarioCriado] = useState();

  function funcaoConvenio() {
    setConvenio(!convenio);
    setEstado({ ...estado, convenio: null });
    setCamposVazios({ ...camposVazios, convenio: false });
  }

  function funcaoCuidador() {
    setCuidador(!cuidador);
    setEstado({ ...estado, nome_cuidador: null, telefone_cuidador: null });
    setCamposVazios({
      ...camposVazios,
      nome_cuidador: false,
      telefone_cuidador: false,
    });
  }

  const apenasLetras = (value) => {
    return value.replace(/[^A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+/g, "");
  };

  function verificacaoTermosUso() {
    setCarregando(true);

    if (!checked) {
      alert("É obrigatório concordar com os termos de uso.");
      setCarregando(false);
    } else {
      verificandoErros();
    }
  }

  async function verificandoErros() {
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
    if (cuidador === true) {
      if (!estado.nome_cuidador) errors.nome_cuidador = true;
      if (!estado.telefone_cuidador) errors.telefone_cuidador = true;
    }
    if (convenio === true) {
      if (!estado.convenio) errors.convenio = true;
    }
    if (erro.email === true) errors.email = true;
    if (erro.cpf === true) errors.email = true;
    if (erro.cep === true) errors.cep = true;
    if (erro.telefone === true) errors.telefone = true;
    if (erro.telefone_cuidador === true) errors.telefone_cuidador = true;
    if (erro.senha === true) errors.senha = true;
    if (erro.senhaConfirmada === true) errors.senhaConfirmada = true;

    if (convenio === true) {
      teste.convenio = false;
    } else if (convenio === false && camposVazios.convenio != undefined) {
      delete camposVazios.convenio;
    }

    if (cuidador === true) {
      teste.nome_cuidador = false;
      teste.telefone_cuidador = false;
    } else if (
      cuidador === false &&
      (camposVazios.nome_cuidador != undefined ||
        camposVazios.telefone_cuidador != undefined)
    ) {
      delete camposVazios.nome_cuidador;
      delete camposVazios.telefone_cuidador;
    }

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
      requisicaoCadastro();
    } else {
      Alert.alert(
        "Erro",
        "Preencha todos os campos obrigatórios corretamente!"
      );
      await sleep(1500);
      setCarregando(false);
    }
  }

  async function pegandoFormularioEspecifico() {
    id = "046975f7-d7d0-4635-a9d9-25efbe65d7b7";
    const resposta = await managerService.GetFormularioEspecifico(id);
    setFormularioEspecifico(resposta);
    setCarregando(false);
  }

  useEffect(() => {
    pegandoFormularioEspecifico();
  }, []);

  async function enviandoFormularioPaciente(id_usuario) {
    setCarregando(true);
    await managerService.EnviandoFormularioPaciente(
      false,
      true,
      formularioEspecifico.id,
      id_usuario
    );
    setCarregando(false);
    Alert.alert("Bem vindo(a)", "Usuário cadastrado com sucesso!");
    navigation.navigate("Login");
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
        setIdUsuarioCriado(resposta.id);
        enviandoFormularioPaciente(resposta.id);
      }
    } else {
      Alert.alert("Erro", "As senhas digitadas são diferentes!");
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

    if (inputIdentifier === "data_nascimento") {
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

    if (cuidador === true && inputIdentifier === "telefone_cuidador") {
      if (enteredValue.length < 11) {
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
      Alert.alert("Erro", "Data inválida.");
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
  const larguraCaixaTituloMaior = width < 600 ? "80%" : "60%";
  const larguraTituloMaior = width < 600 ? "35%" : "40%";
  //responsividade aparelhos
  const margemSuperior = height < 200 ? "5px" : "100px";
  const tamanhoInputs = width < 400 ? "85%" : "80%";
  const larguraCaixaTitulo = width < 400 ? "80%" : larguraCaixaTituloMaior;
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
          <Logo source={logoGuilherme} width={110} height={110}/>
          <Titulo width={larguraTitulo}>Faça seu Cadastro</Titulo>
        </CaixaTitulo>

        <CaixaInputs width={tamanhoInputs}>
          <CaixaTituloInput>
            <TituloInput>Nome completo: </TituloInput>
          </CaixaTituloInput>
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
              <CaixaTituloInput>
                <TituloInput>Telefone: </TituloInput>
              </CaixaTituloInput>
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
              <CaixaTituloInput>
                <TituloInput onPress={() => setDatePicker(true)}>Data de nascimento: </TituloInput>
              </CaixaTituloInput>
              <CaixaParaDatadeNascimento 
              onPress={() => setDatePicker(true)}>
              {estado.data_nascimento}
              {datePicker && (<Data
                maximumDate={new Date()}
                mode="date"
                value={new Date()}
                onChange={(evt, value) => {
                  preenchendoDados("data_nascimento", formatDate(value));
                  setDate(value)
                  setDatePicker(false)
                }}
                camposVazios={camposVazios.data_nascimento}
              />)}
              </CaixaParaDatadeNascimento>
            </CaixaRotuloMesmaLinha>
          </CaixaInputsMesmaLinha>
          <CaixaRotulo>
            <CaixaTituloInput>
              <TituloInput>CPF:</TituloInput>
            </CaixaTituloInput>
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
            <CaixaTituloInput>
              <TituloInput>Email:</TituloInput>
            </CaixaTituloInput>
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
          <PossuiConvenio>
            <CaixaTextoConvenioCuidador>
              <Texto>Possui Convênio?</Texto>
            </CaixaTextoConvenioCuidador>
            <Switch value={convenio} onChange={funcaoConvenio}></Switch>
          </PossuiConvenio>
          {convenio && (
            <>
              <CaixaTituloInput>
                <TituloInput>Nome do Convênio:</TituloInput>
              </CaixaTituloInput>
              <Input
                placeholder="Nome do Convênio:"
                width="100%"
                label="convenio"
                value={estado.convenio}
                onChangeText={(text) => {
                  preenchendoDados("convenio", text);
                }}
                camposVazios={camposVazios.convenio}
              ></Input>
            </>
          )}

          <PossuiConvenio>
            <CaixaTextoConvenioCuidador>
              <Texto>Possui Cuidador(a)?</Texto>
            </CaixaTextoConvenioCuidador>
            <Switch value={cuidador} onChange={funcaoCuidador}></Switch>
          </PossuiConvenio>
          {cuidador && (
            <>
              <CaixaTituloInput>
                <TituloInput>Nome do cuidador:</TituloInput>
              </CaixaTituloInput>
              <Input
                placeholder="Nome do cuidador:"
                width="100%"
                label="nome_cuidador"
                value={estado.nome_cuidador}
                onChangeText={(text) => {
                  preenchendoDados("nome_cuidador", text);
                }}
                camposVazios={camposVazios.nome_cuidador}
              ></Input>
              <CaixaTituloInput>
                <TituloInput>Telefone do cuidador:</TituloInput>
              </CaixaTituloInput>
              <CaixaRotulo>
                <InputMask
                  placeholder="Telefone do Cuidador:"
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
                  label="telefone_cuidador"
                  includeRawValueInChangeText={true}
                  onChangeText={(maskedText, rawText) => {
                    preenchendoDados("telefone_cuidador", rawText);
                  }}
                  value={estado.telefone_cuidador}
                  camposVazios={camposVazios.telefone_cuidador}
                  erro={erro.telefone_cuidador}
                />
                {erro.telefone_cuidador && (
                  <Rotulo>Digite um telefone no formato (xx)xxxxx-xxxx</Rotulo>
                )}
              </CaixaRotulo>
            </>
          )}

          <CaixaRotulo>
            <CaixaTituloInput>
              <TituloInput>CEP:</TituloInput>
            </CaixaTituloInput>
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
          <CaixaTituloInput>
            <TituloInput>País:</TituloInput>
          </CaixaTituloInput>
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
          <CaixaTituloInput>
            <TituloInput>Estado:</TituloInput>
          </CaixaTituloInput>
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
          <CaixaTituloInput>
            <TituloInput>Cidade:</TituloInput>
          </CaixaTituloInput>
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
          <CaixaTituloInput>
            <TituloInput>Bairro:</TituloInput>
          </CaixaTituloInput>
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
          <CaixaTituloInput>
            <TituloInput>Rua:</TituloInput>
          </CaixaTituloInput>
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
          <CaixaTituloInput>
            <TituloInput>Número:</TituloInput>
          </CaixaTituloInput>
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
          <CaixaTituloInput>
            <TituloInput>Complemento:</TituloInput>
          </CaixaTituloInput>
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
            <CaixaTituloInput>
              <TituloInput>Senha</TituloInput>
            </CaixaTituloInput>
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
            <CaixaTituloInput>
              <TituloInput>Confirme sua senha:</TituloInput>
            </CaixaTituloInput>
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
              navigation.push("LGPD");
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
