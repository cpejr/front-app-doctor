import styled from "styled-components/native";
import { Cores } from "../../variaveis";

export const Container = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: scroll;
  background-color: ${Cores.branco};
  padding-right: 5%;
  padding-left: 5%;
`;

export const HeaderFormularios = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
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

export const CorpoScroll = styled.ScrollView`
  display: flex;
  width: 90%;
  height: 100%;
  background-color: ${Cores.cinza[11]};
`;

export const Corpo = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
  height: ${(props) => props.height};
  border-width: 1px;
  border-color: ${Cores.azulEscuro};
  background-color: ${Cores.cinza[11]};
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 20px;
  flex-direction: column;
`;

export const CaixaCima = styled.View`
  width: 100%;
  height: 95%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  
`;

export const CaixaTitulo = styled.View`
  display: flex;
  margin-top: 20px;
  width: 90%;
  align-items: center;
`;

export const CaixaFormulario = styled.View`
  display: flex;
  height: 100%;
  margin-top: 30px;
  width: 100%;
  padding-right: 7%;
  padding-left: 7%;
  margin-bottom: 40%;
`;

export const CaixaBotao = styled.View`
  width: 90%;
  height: auto;
  margin-top: 10%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${Cores.cinza[11]};
  align-items: center;
  margin-top: 25px;
`;

export const ConteudoBotaoUpload = styled.View`
  width: 100%;
  padding-left: 5%;
  padding-right: 10%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;



