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
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 10px;
  padding-top:4px;
`;

export const CaixaCentro = styled.View`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
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
  margin-bottom: 10px;
`;

export const Titulo = styled.Text`
  font-size: 25px;
  font-weight: 600;
  color: green;
`;

export const CaixaScroll = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 2%;
  padding-bottom: 3%;
`;

export const CaixaDescricao = styled.View`
  width: 80%;
  min-height: 150px;
  height: auto;
  border-style: solid;
  border-width: 2px;
  border-radius: 5px;
  border-color: ${Cores.azul};
  padding: 3%;
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
  padding: 3%;

 
`;

export const TextoBotao = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: ${Cores.azulEscuro};
`;
