import styled from "styled-components/native";
import { Cores } from "../../variaveis";

export const Body = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${Cores.branco};
`;

export const CaixaAlterarDados = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin-bottom: 5%;
  margin-top: 7%;
  border-style: solid;
  border-radius: 6px;
  border-color: rgba(0, 0, 0, 0.15);
  border-width: 3px;
`;

export const CaixaTitulo = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 4%;
  margin-bottom: 4%;
`;

export const Titulo = styled.Text`
  font-size: 30px;
`;

export const CaixaInputs = styled.View`
  width: 100%;
  padding-left: 10%;
  padding-right: 10%;
  height: auto;
  bottom: 0;
  background-color: ${Cores.branco};
  align-items: center;
`;

export const CaixaInputsMesmaLinha = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;
export const CaixaBotoes = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  margin-top: 5%;
  margin-bottom: 5%;
`;
