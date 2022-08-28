
import styled from "styled-components/native";
import { Cores } from "../../variaveis";

export const Corpo = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
  height: ${(props) => props.height};
  overflow: scroll;
  background-color: ${Cores.cinza[11]};
`;
export const HeaderFormularios = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px;
  border-color: ${(props) => props.borderColor};
  padding-top: 10px;
  padding-bottom: 15px;
  padding-left: 5px;
  width: 100%;
`;

export const Titulo = styled.Text`
  font-size: ${(props) => props.fontSize};
  color: ${(props) => props.color};
  margin-bottom: ${(props) => props.marginBottom ?? "0px"};
  margin-left: 13px;
`;

export const CaixaTitulo = styled.View`
  display: flex;
  margin-top: 20px;
  width: 90%;
  align-items: center;
`;

export const CaixaFormulario = styled.View`
  display: flex;
  margin-top: 20px;
  width: 90%;
`;

export const CaixaBotao = styled.View`
  align-items: flex-end;
  margin-top: 5%;
  width: 90%;
`;