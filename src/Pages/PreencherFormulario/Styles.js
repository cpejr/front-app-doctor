import styled from "styled-components/native";
import { Cores } from "../../variaveis";

export const CorpoScroll = styled.ScrollView`
  display: flex;
  width: 100%;
  background-color: ${Cores.cinza[11]};
`;
export const Body = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: scroll;
  background-color: ${Cores.cinza[11]};
`;

export const Corpo = styled.View`
  display: flex;
  align-items: center;
  width: 90%;
  height: 75%;
  flex-direction: column;
  background-color: ${Cores.cinza[11]};
`;

export const HeaderFormularios = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.borderColor};
  padding-top: 10px;
  padding-bottom: 15px;
  padding-left: 5px;
  width: 100%;
`;

export const CaixaCima = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${Cores.cinza[11]};
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
  height: 50%;
  margin-top: 20px;
  width: 100%;
`;

export const CaixaBotao = styled.View`
  width: 90%;
  height: 20%;
  padding-top: 5%;
  display: flex;
  background-color: ${Cores.cinza[11]};
  align-items: flex-end;
`;
