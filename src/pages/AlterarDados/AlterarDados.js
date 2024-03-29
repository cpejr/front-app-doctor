import React, { useEffect, useState } from "react";
import Botao from "../../styles/Botao";
import ConteudoBotao from "../../styles/ConteudoBotao";
import Input from "../../styles/Input";
import InputMask from "../../styles/InputMask/InputMask";
import { useWindowDimensions, ScrollView, TouchableOpacity, } from "react-native";
import { Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ActivityIndicator, Colors, Checkbox } from "react-native-paper";
import {
  Body,
  CaixaAlterarDados,
  CaixaInputs,
  CaixaTitulo,
  Titulo,
  CaixaBotoes,
  Data,
  TituloRotulos,
  CaixaTitulosRotulos,
  Rotulo,
  PickerView,
  PickerEstado,
  CheckboxTexto,
  Lgpd
} from "./Styles";
import { brParaPadrao } from "../../utils/date";
import { estados } from "./estados";
import { cep } from "../../utils/masks";
import { Cores } from "../../variaveis";
import * as managerService from "../../services/ManagerService/managerService";
import _ from "lodash";
import { isEqual } from "lodash";
import { sleep } from "../../utils/sleep";
import { CaixaRotulo } from "../Cadastro/Styles";
import { apenasLetras, apenasNumeros } from "../../utils/masks"

function AlterarDados({ navigation }) {
  const [usuario, setUsuario] = useState({});
  const [endereco, setEndereco] = useState({});
  const [telefone, setTelefone] = useState("");
  const [telefoneCuidador, setTelefoneCuidador] = useState("");
  const [cpf, setCpf] = useState("");
  const [complemento, setComplemento] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [numero, setNumero] = useState("");
  const [estado, setEstado] = useState({});
  const [novoEndereco, setNovoEndereco] = useState({});
  const [cpfMasked, setCpfMasked] = useState("");
  const [dataMasked, setDataMasked] = useState("");
  const [telMasked, setTelMasked] = useState("");
  const [telCuidadorMasked, setTelCuidadorMasked] = useState("");
  const [estadoSelecionado, setEstadoSelecionado] = useState();
  const [checked, setChecked] = useState(false);
  const [carregando, setCarregando] = useState(false);


  const [camposNulos, setCamposNulos] = useState({
    nome: true,
    telefone: true,
    data_nascimento: true,
    cpf: true,
    cep: true,
    pais: true,
    estado: true,
    cidade: true,
    rua: true,
    numero: true,
    bairro: true,
    complemento: true,
    convenio: true,
    nome_cuidador: true,
    telefone_cuidador: true,
  });

  const referenciaCamposNulos = {
    nome: true,
    telefone: true,
    data_nascimento: true,
    cpf: true,
    cep: true,
    pais: true,
    estado: true,
    cidade: true,
    rua: true,
    numero: true,
    bairro: true,
    complemento: true,
    convenio: true,
    nome_cuidador: true,
    telefone_cuidador: true,

  };

  const errors = {};

  useEffect(() => {
    if (!estado.nome) errors.nome = true;
    if (!estado.telefone) errors.telefone = true;
    if (!estado.cpf) errors.cpf = true;
    if (!novoEndereco.cep) errors.cep = true;
    if (!novoEndereco.pais) errors.pais = true;
    if (!novoEndereco.estado) errors.estado = true;
    if (!novoEndereco.cidade) errors.cidade = true;
    if (!novoEndereco.bairro) errors.bairro = true;
    if (!novoEndereco.rua) errors.rua = true;
    if (!novoEndereco.numero) errors.numero = true;
    if (!novoEndereco.complemento) errors.complemento = true;
    if (!estado.convenio) errors.convenio = true;
    if (!estado.nome_cuidador) errors.nome_cuidador = true;
    if (!estado.telefone_cuidador) errors.telefone_cuidador = true;



    setCamposNulos({ ...camposNulos, ...errors });
  }, [estado, novoEndereco]);

  const [erro, setErro] = useState({
    cpf: false,
    telefone: false,
    cep: false,
    telefone_cuidador: false,
  });
  const referenciaFormatacao = {
    cpf: false,
    telefone: false,
    cep: false,
    telefone_cuidador: false,
  };




  function formatacaoData() {
    let dataNascimento = estado.data_nascimento
    const response = brParaPadrao(dataNascimento);
    return response;
  }


  async function pegandoDados() {
    setCarregando(true);
    await sleep(500);
    const resposta = await managerService.GetDadosUsuario();
    setUsuario(resposta.dadosUsuario);
    setTelefone(resposta.dadosUsuario.telefone);
    setCpf(resposta.dadosUsuario.cpf);
    setDataNascimento(resposta.dadosUsuario.data_nascimento);
    setEndereco(resposta.dadosEndereco);
    setComplemento(resposta.dadosEndereco.complemento);
    setNumero(resposta.dadosEndereco.numero + " ");
    if (resposta.dadosUsuario.telefone_cuidador !== null) {
      setTelefoneCuidador(resposta.dadosUsuario.telefone_cuidador);
    }
    setCarregando(false);
  }

  useEffect(() => {
    if (cpf !== undefined) {
      setCpfMasked(
        cpf.slice(+0, -8) +
        "." +
        cpf.slice(+3, -5) +
        "." +
        cpf.slice(+6, -2) +
        "-" +
        cpf.slice(-2)
      );
    }
  }, [cpf]);
  useEffect(() => {
    if (telefone !== undefined) {
      setTelMasked(
        "(" +
        telefone.slice(0, -9) +
        ")" +
        telefone.slice(2, -4) +
        "-" +
        telefone.slice(-4)
      );
    }
  }, [telefone]);

  useEffect(() => {
    if (telefoneCuidador !== undefined) {
      setTelCuidadorMasked(
        "(" +
        telefoneCuidador.slice(0, -9) +
        ")" +
        telefoneCuidador.slice(2, -4) +
        "-" +
        telefoneCuidador.slice(-4)
      );
    }
  }, [telefoneCuidador]);

  useEffect(() => {
    if (dataMasked !== undefined) {
      setDataMasked(
        dataNascimento.slice(8, -14) +
        "/" +
        dataNascimento.slice(5, -17) +
        "/" +
        dataNascimento.slice(0, -20)
      );
    }
  }, [dataNascimento]);

  async function atualizarDados() {
    setCarregando(true);
    if (camposNulos.data_nascimento === false) {
      estado.data_nascimento = formatacaoData(estado.data_nascimento);
    }

    if (!_.isEqual(camposNulos, referenciaCamposNulos)) {
      if (_.isEqual(erro, referenciaFormatacao)) {
        await managerService.UpdateDadosUsuario(
          usuario.id,
          endereco.id,
          novoEndereco,
          estado
        );
        navigation.push("Perfil");
      } else {
        Alert.alert("Erro", "Preencha os campos corretamente.");
      }
    } else {
      Alert.alert("Erro", "Preencha Algum Campo.");
    }
    setCarregando(false);
  }

  function preenchendoDados(identificador, valor) {

    if (identificador === "nome" || identificador === "nome_cuidador") {
      valor = apenasLetras(valor);
    }

    setEstado({ ...estado, [identificador]: valor });
    setCamposNulos({ ...camposNulos, [identificador]: false });
    verificaErros(identificador, valor);


  }

  function preenchendoEndereco(identificador, valor) {

    if (identificador === "cidade" || identificador === "pais" ) {
      valor = apenasLetras(valor);
    }

    if (identificador === "numero"){
      valor = apenasNumeros(valor)
    }


    setNovoEndereco({ ...novoEndereco, [identificador]: valor });
    setCamposNulos({ ...camposNulos, [identificador]: false });
    verificaErros(identificador, valor);
  }

  function verificaErros(identificador, valor) {

    if (
      (identificador === "telefone") ||
      (identificador === "cpf") ||
      (identificador === "cep") ||
      (identificador === "telefone_cuidador")
    ) {
      if (
        (identificador === "telefone" && valor.length > 0 && valor.length < 11) ||
        (identificador === "cpf" && valor.length > 0 && valor.length < 11) ||
        (identificador === "cep" && valor.length > 0 && valor.length < 8) ||
        (identificador === "telefone_cuidador" && valor.length > 0 && valor.length < 11)
      ) {
        setErro({ ...erro, [identificador]: true });
      } else {
        setErro({ ...erro, [identificador]: false });
      }
    }
  }

  useEffect(() => {
    pegandoDados();
  }, []);



  const { width } = useWindowDimensions();
  const tamanhoInputs = width < 400 ? "85%" : "80%";
  const tamanhoFonte = width > 500 ? "18px" : "11px";
  return (
    <ScrollView>
      <Body>
        <CaixaAlterarDados>
          <CaixaTitulo>
            <Titulo>Alterar Dados:</Titulo>
          </CaixaTitulo>
          {carregando ? (
            <>
              <ActivityIndicator animating={true} color={Colors.black} />
            </>) : (
            <>
            <CaixaInputs width={tamanhoInputs}>

              <CaixaTitulosRotulos>
                <TituloRotulos>Nome:</TituloRotulos>
              </CaixaTitulosRotulos>

              <Input
                placeholder={usuario.nome}
                keyboardType="default"
                width="100%"
                label="nome"
                onChangeText={(text) => {
                  preenchendoDados("nome", text);
                }}
                value={estado.nome}

              />
              <CaixaTitulosRotulos>
                <TituloRotulos>Telefone:</TituloRotulos>
              </CaixaTitulosRotulos>

              <InputMask
                placeholder={telMasked}
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
                erro={erro.telefone}
                onChangeText={(maskedText, rawText) => {
                  preenchendoDados("telefone", rawText);
                }}
              />
              {erro.telefone && (
                <CaixaRotulo>
                  <Rotulo>Digite um telefone no formato (xx)xxxxx-xxxx</Rotulo>
                </CaixaRotulo>
              )}
              <CaixaTitulosRotulos>
                <TituloRotulos>Data de nascimento:</TituloRotulos>
              </CaixaTitulosRotulos>

              <Data
                customStyles={{
                  dateInput: {
                    borderWidth: 0,
                    alignItems: "flex-start",
                    paddingLeft: 10,
                  },
                  placeholderText: { color: "#90929B" },
                }}
                placeholder={dataMasked}
                maxDate={new Date()}
                format="DD/MM/YYYY"
                mode="date"
                showIcon={false}
                date={estado.data_nascimento}
                onDateChange={(data) => {
                  preenchendoDados("data_nascimento", data);
                  setCamposNulos({ ...camposNulos, data_nascimento: false });
                }}
              />
              <CaixaTitulosRotulos>
                <TituloRotulos>CPF:</TituloRotulos>
              </CaixaTitulosRotulos>

              <InputMask
                placeholder={cpfMasked}
                keyboardType="default"
                width="100%"
                label="cpf"
                type={"cpf"}
                includeRawValueInChangeText={true}
                erro={erro.cpf}
                onChangeText={(maskedText, rawText) => {
                  preenchendoDados("cpf", rawText);
                }}
              />
              {erro.cpf && (
                <CaixaRotulo>
                  <Rotulo>Digite um CPF no formato xxx.xxx.xxx-xx</Rotulo>
                </CaixaRotulo>
              )}

              {usuario.convenio !== null ? (
                <>
                  <CaixaTitulosRotulos>
                    <TituloRotulos>Convenio:</TituloRotulos>
                  </CaixaTitulosRotulos>

                  <Input
                    placeholder={usuario.convenio}
                    keyboardType="default"
                    width="100%"
                    label="convenio"
                    onChangeText={(text) => {
                      preenchendoDados("convenio", text);
                    }}
                  />
                </>
              ) : (
                <>
                  <CaixaTitulosRotulos>
                    <TituloRotulos>Convenio:</TituloRotulos>
                  </CaixaTitulosRotulos>

                  <Input
                    placeholder="Nome do Convênio:"
                    keyboardType="default"
                    width="100%"
                    label="convenio"
                    onChangeText={(text) => {
                      preenchendoDados("convenio", text);
                    }}
                  />
                </>
              )}

              {usuario.nome_cuidador !== null ? (
                <>
                  <CaixaTitulosRotulos>
                    <TituloRotulos>Nome Cuidador:</TituloRotulos>
                  </CaixaTitulosRotulos>

                  <Input
                    placeholder={usuario.nome_cuidador}
                    keyboardType="default"
                    width="100%"
                    label="nome_cuidador"
                    onChangeText={(text) => {
                      preenchendoDados("nome_cuidador", text);
                    }}
                    value={estado.nome_cuidador}
                  />

                  <CaixaTitulosRotulos>
                    <TituloRotulos>Telefone Cuidador:</TituloRotulos>
                  </CaixaTitulosRotulos>

                  <InputMask
                    placeholder={telCuidadorMasked}
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
                    erro={erro.telefone_cuidador}
                    onChangeText={(maskedText, rawText) => {
                      preenchendoDados("telefone_cuidador", rawText);
                    }}
                  />
                  {erro.telefone_cuidador && (
                    <CaixaRotulo>
                      <Rotulo>Digite um telefone no formato (xx)xxxxx-xxxx</Rotulo>
                    </CaixaRotulo>
                  )}
                </>
              ) : (
                <>
                  <CaixaTitulosRotulos>
                    <TituloRotulos>Nome Cuidador:</TituloRotulos>
                  </CaixaTitulosRotulos>

                  <Input
                    placeholder="Nome do cuidador:"
                    keyboardType="default"
                    width="100%"
                    label="nome_cuidador"
                    onChangeText={(text) => {
                      preenchendoDados("nome_cuidador", text);
                    }}
                  />

                  <CaixaTitulosRotulos>
                    <TituloRotulos>Telefone Cuidador:</TituloRotulos>
                  </CaixaTitulosRotulos>

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
                    erro={erro.telefone_cuidador}
                    onChangeText={(maskedText, rawText) => {
                      preenchendoDados("telefone_cuidador", rawText);
                    }}
                  />
                  {erro.telefone_cuidador && (
                    <CaixaRotulo>
                      <Rotulo>Digite um telefone no formato (xx)xxxxx-xxxx</Rotulo>
                    </CaixaRotulo>
                  )}
                </>
              )}

              <CaixaTitulosRotulos>
                <TituloRotulos>CEP:</TituloRotulos>
              </CaixaTitulosRotulos>

              <InputMask
                placeholder={cep(endereco.cep)}
                keyboardType="default"
                type={"zip-code"}
                width="100%"
                label="CEP"
                includeRawValueInChangeText={true}
                erro={erro.cep}
                onChangeText={(maskedText, rawText) => {
                  preenchendoEndereco("cep", rawText);
                }}
              />
              {erro.cep && (
                <CaixaRotulo>
                  <Rotulo>Digite um CEP no formato xxxxx-xxx</Rotulo>
                </CaixaRotulo>
              )}


              <CaixaTitulosRotulos>
                <TituloRotulos>País:</TituloRotulos>
              </CaixaTitulosRotulos>

              <Input
                placeholder={endereco.pais}
                keyboardType="default"
                width="100%"
                label="pais"
                onChangeText={(text) => {
                  preenchendoEndereco("pais", text);
                }}
                value={novoEndereco.pais}
              />

              <CaixaTitulosRotulos>
                <TituloRotulos>Estado:</TituloRotulos>
              </CaixaTitulosRotulos>

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
                    label={endereco.estado}
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

              <CaixaTitulosRotulos>
                <TituloRotulos>Cidade:</TituloRotulos>
              </CaixaTitulosRotulos>

              <Input
                placeholder={endereco.cidade}
                keyboardType="default"
                width="100%"
                label="cidade"
                onChangeText={(text) => {
                  preenchendoEndereco("cidade", text);
                }}
                value={novoEndereco.cidade}
              />

              <CaixaTitulosRotulos>
                <TituloRotulos>Bairro:</TituloRotulos>
              </CaixaTitulosRotulos>

              <Input
                placeholder={endereco.bairro}
                keyboardType="default"
                width="100%"
                label="bairro"
                onChangeText={(text) => {
                  preenchendoEndereco("bairro", text);
                }}
              />
              <CaixaTitulosRotulos>
                <TituloRotulos>Rua:</TituloRotulos>
              </CaixaTitulosRotulos>



              <Input
                placeholder={endereco.rua}
                keyboardType="default"
                width="100%"
                label="rua"
                onChangeText={(text) => {
                  preenchendoEndereco("rua", text);
                }}
              />
              <CaixaTitulosRotulos>
                <TituloRotulos>Número:</TituloRotulos>
              </CaixaTitulosRotulos>



              <Input
                placeholder={numero}
                value={novoEndereco.numero}
                keyboardType="default"
                width="100%"
                label="numero"
                onChangeText={(text) => {
                  preenchendoEndereco("numero", text);
                }}
              />
              {complemento === null ? (
                <>
                  <CaixaTitulosRotulos>
                    <TituloRotulos>Complemento:</TituloRotulos>
                  </CaixaTitulosRotulos>


                  <Input
                    placeholder="Complemento: "
                    keyboardType="default"
                    width="100%"
                    label="complemento"
                    onChangeText={(text) => {
                      preenchendoEndereco("complemento", text);
                    }}
                  /></>
              ) : (
                <>
                  <CaixaTitulosRotulos>
                    <TituloRotulos>Complemento:</TituloRotulos>
                  </CaixaTitulosRotulos>

                  <Input
                    placeholder={complemento}
                    keyboardType="default"
                    width="100%"
                    label="complemento"
                    onChangeText={(text) => {
                      preenchendoEndereco("complemento", text);
                    }}
                  /></>
              )}
            </CaixaInputs>
          </>
          )}

          <CaixaBotoes>
            <Botao
              width="40%"
              height="40px"
              backgroundColor={Cores.branco}
              borderRadius="3px"
              borderColor="rgba(255, 0, 0, 0.25)"
              borderWidth="3px"
              boxShadow="none"
              onPress={() => navigation.navigate("Perfil")}
            >
              <ConteudoBotao
                width="100%"
                fontSize={tamanhoFonte}
                color={Cores.preto}
              >
                CANCELAR
              </ConteudoBotao>
            </Botao>
            <Botao
              width="40%"
              height="40px"
              backgroundColor={Cores.lilas[1]}
              borderRadius="4px"
              borderColor={Cores.azul}
              borderWidth="3px"
              boxShadow="none"
              onPress={() => atualizarDados()}
            >
              <ConteudoBotao
                width="100%"
                fontSize={tamanhoFonte}
                color={Cores.branco}
              >
                CONFIRMAR
              </ConteudoBotao>
            </Botao>
          </CaixaBotoes>
        </CaixaAlterarDados>
      </Body>
    </ScrollView>
  );
}

export default AlterarDados;
