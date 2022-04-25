import React, { useEffect, useState } from "react";
import Botao from "./../../styles/Botao";
import ConteudoBotao from "./../../styles/ConteudoBotao";
import Input from "./../../styles/Input";
import { useWindowDimensions, ScrollView } from "react-native";
import {
  Body,
  CaixaAlterarDados,
  CaixaInputs,
  CaixaTitulo,
  Titulo,
  CaixaBotoes,
} from "./Styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as managerService from "../../services/ManagerService/managerService";

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

  async function pegandoDados() {
    const email = await AsyncStorage.getItem("@AirBnbApp:email");
    const resposta = await managerService.GetDadosUsuario(email);
    setUsuario(resposta.dadosUsuario);
    setTelefone(resposta.dadosUsuario.telefone);
    setCpf(resposta.dadosUsuario.cpf);
    setDataNascimento(resposta.dadosUsuario.data_nascimento);
    setEndereco(resposta.dadosEndereco);
    setComplemento(resposta.dadosEndereco.complemento);
    setNumero(endereco.numero + " ");
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

  async function atualizarDados() {
    await managerService.UpdateDadosUsuario(
      usuario.id,
      endereco.id,
      novoEndereco,
      estado,
    );
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
  const larguraConteudoBotaoEntrar = width > 480 ? "45%" : "50%";
  const larguraConteudoBotaoCancelar = width > 480 ? "60%" : "60%";
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
            <Input
              placeholder={telMasked}
              keyboardType="default"
              width="100%"
              label="telefone"
              onChangeText={(text) => {
                preenchendoDados("telefone", text);
              }}
            />
            <Input
              placeholder={dataMasked}
              keyboardType="default"
              width="100%"
              label="data_nascimento"
              onChangeText={(text) => {
                preenchendoDados("data_nascimento", text);
              }}
            />

            <Input
              placeholder={cpfMasked}
              keyboardType="default"
              width="100%"
              label="cpf"
              onChangeText={(text) => {
                preenchendoDados("cpf", text);
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
              backgroundColor="#ffffff"
              borderRadius="3px"
              borderColor="rgba(255, 0, 0, 0.25)"
              borderWidth="3px"
              boxShadow="none"
              onPress={() => navigation.navigate("Perfil")}
            >
              <ConteudoBotao
                width={larguraConteudoBotaoCancelar}
                fontSize={tamanhoFonte}
                color="#000000"
              >
                CANCELAR
              </ConteudoBotao>
            </Botao>
            <Botao
              width="40%"
              height="40px"
              backgroundColor="#434B97"
              borderRadius="4px"
              borderColor="#151B57"
              borderWidth="3px"
              boxShadow="none"
              onPress={() => atualizarDados()}
            >
              <ConteudoBotao
                width={larguraConteudoBotaoEntrar}
                fontSize={tamanhoFonte}
                color="#ffffff"
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
