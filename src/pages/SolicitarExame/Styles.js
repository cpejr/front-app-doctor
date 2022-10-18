import styled from "styled-components/native";
import { Cores } from "../../variaveis";

export const Body = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${Cores.branco};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const CaixaSeta = styled.View`
  width: 100%;
  height: 8%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 10px;
`;

export const CaixaCentro = styled.View`
  width: 100%;
  height: 60%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const CaixaTitulo = styled.View`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
`;

export const Titulo = styled.Text`
  font-size: 27px;
  font-weight: 600;
  color: green;
`;

export const CaixaScroll = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: 5%;
  padding-bottom: 5%;
`;

export const CaixaDescricao = styled.View`
  width: 75%;
  min-height: 200px;
  height: auto;
  border-style: solid;
  border-width: 2px;
  border-radius: 5px;
  border-color: ${Cores.azul};
  padding: 4%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  elevation: 5;
  background-color: green;
`;

export const Descricao = styled.Text`
  font-size: 17px;
  font-weight: 600;
  color: ${Cores.azulEscuro};
  text-align: center;
`;


export const CaixaBotao = styled.View`
  width: 100%;
  height: 15%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${Cores.branco};
  padding: 4%;
 
`;

export const TextoBotao = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: ${Cores.azulEscuro};
`;
