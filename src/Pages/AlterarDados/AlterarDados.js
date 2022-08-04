import React, { useEffect, useState } from "react";
import Botao from "../../styles/Botao";
import ConteudoBotao from "../../styles/ConteudoBotao";
import Input from "../../styles/Input";
import InputMask from "../../styles/InputMask/InputMask";
import { useWindowDimensions, ScrollView } from "react-native";
import { brParaPadrao } from "../../utils/date";
import {
  Body,
  CaixaAlterarDados,
  CaixaInputs,
  CaixaTitulo,
  Titulo,
  CaixaBotoes,
} from "./Styles";
import * as managerService from "../../services/ManagerService/managerService";
import { Cores } from "../../variaveis"

function AlterarDados({ navigation }) {
  const [usuario, setUsuario] = useState({});
  const [endereco, setEndereco] = useState({});
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [complemento, setComplemento] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [numero, setNumero] = useState("");

  const [estado, setEstado] = useState({});
  const [novoEndereco, setNovoEndereco] = useState({});

  const [cpfMasked, setCpfMasked] = useState("");
  const [dataMasked, setDataMasked] = useState("");
  const [telMasked, setTelMasked] = useState("");
  const [camposNulos, setCamposNulos] = useState({
    nome: "",
    telefone: "",
    data_nascimento: "",
    cpf: "",
    email: "",
    cep: "",
    pais: "",
    estado: "",
    cidade: "",
    bairro: "",
    rua: "",
    numero: "",
    complemento: "",
  });

  async function pegandoDados() {
    const resposta = await managerService.GetDadosUsuario();
    setUsuario(resposta.dadosUsuario);
    setTelefone(resposta.dadosUsuario.telefone);
    setCpf(resposta.dadosUsuario.cpf);
    setDataNascimento(resposta.dadosUsuario.data_nascimento);
    setEndereco(resposta.dadosEndereco);
    setComplemento(resposta.dadosEndereco.complemento);
    setNumero(resposta.dadosEndereco.numero + " ");
    
  }

  useEffect(() => {
    setCpfMasked(
      cpf.slice(+0, -8) +
        "." +
        cpf.slice(+3, -5) +
        "." +
        cpf.slice(+6, -2) +
        "-" +
        cpf.slice(-2)
    );
  }, [cpf]);
  useEffect(() => {
    setTelMasked(
      "(" +
        telefone.slice(0, -9) +
        ")" +
        telefone.slice(2, -4) +
        "-" +
        telefone.slice(-4)
    );
  }, [telefone]);
  useEffect(() => {
    setDataMasked(
      dataNascimento.slice(8, -14) +
        "/" +
        dataNascimento.slice(5, -17) +
        "/" +
        dataNascimento.slice(0, -20)
    );
  }, [dataNascimento]);

  function formatacaoData() {
    try {
      const response = brParaPadrao(estado.data_nascimento);
      return response;
    } catch {
      alert("Data inválida.");
    }
  }

  async function atualizarDados() {
    await managerService.UpdateDadosUsuario(
      usuario.id,
      endereco.id,
      novoEndereco,
      estado
    );
    const dataFormatada = formatacaoData();
    estado.data_nascimento = dataFormatada;
    navigation.push("Perfil")
  }

  function preenchendoDados(identificador, valor) {
    setEstado({ ...estado, [identificador]: valor });
  }

  function preenchendoEndereco(identificador, valor) {
    setNovoEndereco({ ...novoEndereco, [identificador]: valor });
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

          <CaixaInputs width={tamanhoInputs}>
            <Input
              placeholder={usuario.nome}
              keyboardType="default"
              width="100%"
              label="nome"
              onChangeText={(text) => {
                preenchendoDados("nome", text);
              }}
            />
            <InputMask
              placeholder={telMasked}
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
            />
            <InputMask
              placeholder={dataMasked}
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

            <InputMask
              placeholder={cpfMasked}
              keyboardType="default"
              width="100%"
              label="cpf"
              type={"cpf"}
              includeRawValueInChangeText={true}
              onChangeText={(maskedText, rawText) => {
                preenchendoDados("cpf", rawText);
              }}
            />

            <Input
              placeholder={usuario.email}
              keyboardType="default"
              width="100%"
              label="email"
              onChangeText={(text) => {
                preenchendoDados("email", text);
              }}
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
            />

            <Input
              placeholder={endereco.pais}
              keyboardType="default"
              width="100%"
              label="pais"
              onChangeText={(text) => {
                preenchendoEndereco("pais", text);
              }}
            />

            <Input
              placeholder={endereco.estado}
              keyboardType="default"
              width="100%"
              label="estado"
              onChangeText={(text) => {
                preenchendoEndereco("estado", text);
              }}
            />

            <Input
              placeholder={endereco.cidade}
              keyboardType="default"
              width="100%"
              label="cidade"
              onChangeText={(text) => {
                preenchendoEndereco("cidade", text);
              }}
            />

            <Input
              placeholder={endereco.bairro}
              keyboardType="default"
              width="100%"
              label="bairro"
              onChangeText={(text) => {
                preenchendoEndereco("bairro", text);
              }}
            />

            <Input
              placeholder={endereco.rua}
              keyboardType="default"
              width="100%"
              label="rua"
              onChangeText={(text) => {
                preenchendoEndereco("rua", text);
              }}
            />
            <Input
              placeholder={numero}
              keyboardType="default"
              width="100%"
              label="numero"
              onChangeText={(text) => {
                preenchendoEndereco("numero", text);
              }}
            />
            {complemento === null ? (
              <Input
                placeholder="Complemento: "
                keyboardType="default"
                width="100%"
                label="complemento"
                onChangeText={(text) => {
                  preenchendoEndereco("complemento", text);
                }}
              />
            ) : (
              <Input
                placeholder={complemento}
                keyboardType="default"
                width="100%"
                label="complemento"
                onChangeText={(text) => {
                  preenchendoEndereco("complemento", text);
                }}
              />
            )}
          </CaixaInputs>

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
