
import styled from "styled-components/native";
import { Cores } from "../../variaveis";

export const Corpo = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  height: ${(props) => props.height};
  overflow: scroll;
`;
export const HeaderFormularios = styled.View`
  display: flex;
  flex-direction: row;
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
`;

export const CaixaTitulo = styled.View`
  display: flex;
  margin-top: 8px;
  width: 90%;
`;

export const CaixaFormulario = styled.View`
  display: flex;
  margin-top: 8px;
  width: 90%;
`;

export const CaixaBotao = styled.View`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
  align-items: flex-end;
  width: 90%;
`;