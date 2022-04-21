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

function AlterarDados() {
  const [usuario, setUsuario] = useState({});
  const [endereco, setEndereco] = useState({});
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [complemento, setComplemento] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");

  async function pegandoDados() {
    await AsyncStorage.getItem("@AirBnbApp:email").then((res) => {
      const resposta = managerService.GetDadosUsuario(res);
      console.log(resposta);
      setUsuario(resposta.dadosUsuario);
      setTelefone(resposta.dadosUsuario.telefone);
      setCpf(resposta.dadosUsuario.cpf);
      setDataNascimento(resposta.dadosUsuario.data_nascimento);
      setEndereco(resposta.dadosEndereco);
      setComplemento(resposta.dadosEndereco.complemento);
    });
  }

  async function atualizarDados() {
    await managerService.UpdateDadosUsuario(
      usuario.id,
      endereco.id,
      endereco,
      estado
    );
  }
  function preenchendoDados(e) {
    setEstado({ ...estado, [e.target.name]: e.target.value });
  }

  function preenchendoEndereco(e) {
    setEndereco({ ...endereco, [e.target.name]: e.target.value });
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
              label="Nome"
              onChange={preenchendoDados}
            />
            <Input
              placeholder="Telefone:"
              keyboardType="default"
              width="100%"
              label="Telefone"
            />
            <Input
              placeholder="Data de Nascimento:"
              keyboardType="default"
              width="100%"
              label="DataDeNascimento"
            />

            <Input
              placeholder="CPF:"
              keyboardType="default"
              width="100%"
              label="cpf"
            />

            <Input
              placeholder="Email:"
              keyboardType="default"
              width="100%"
              label="email"
            />

            <Input
              placeholder="País:"
              keyboardType="default"
              width="100%"
              label="País"
            />

            <Input
              placeholder="Estado:"
              keyboardType="default"
              width="100%"
              label="Estado"
            />

            <Input
              placeholder="Cidade:"
              keyboardType="default"
              width="100%"
              label="Cidade"
            />

            <Input
              placeholder="Bairro:"
              keyboardType="default"
              width="100%"
              label="Bairro"
            />

            <Input
              placeholder="Rua:"
              keyboardType="default"
              width="100%"
              label="Rua"
            />

            <Input
              placeholder="Número:"
              keyboardType="default"
              width="100%"
              label="Numero"
            />

            <Input
              placeholder="Complemento:"
              keyboardType="default"
              width="100%"
              label="Complemento"
            />
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
              onPress={() => requisicaoLogin()}
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
          </CaixaBotoes>
        </CaixaAlterarDados>
      </Body>
    </ScrollView>
  );
}

export default AlterarDados;
