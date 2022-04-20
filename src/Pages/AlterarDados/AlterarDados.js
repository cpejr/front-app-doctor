import React from "react";
import Botao from "./../../styles/Botao";
import ConteudoBotao from "./../../styles/ConteudoBotao";
import Input from "./../../styles/Input";
import { useWindowDimensions, ScrollView } from "react-native";
import { Body, CaixaAlterarDados, CaixaInputs, CaixaTitulo, Titulo, CaixaBotoes } from "./Styles";

function AlterarDados() {
  const { width } = useWindowDimensions();
  const tamanhoInputs = width < 400 ? "85%" : "80%";
  const tamanhoFonte = width > 500 ? "18px" : "11px";
  const larguraConteudoBotaoEntrar = width > 480 ? "35%" : "55%";
  const larguraConteudoBotaoCancelar = width > 480 ? "35%" : "70%";
  return (
    <ScrollView>
      <Body>
        <CaixaAlterarDados>
          <CaixaTitulo>
            <Titulo>Alterar Dados:</Titulo>
          </CaixaTitulo>

          <CaixaInputs width={tamanhoInputs}>
            <Input
              placeholder="Nome Completo:"
              keyboardType="default"
              width="100%"
              label="Nome"
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
