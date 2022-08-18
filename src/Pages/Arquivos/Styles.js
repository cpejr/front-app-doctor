import styled from "styled-components/native";
import { Cores } from "../../variaveis";

export const ContainerBody = styled.View`
  height: 100%;
  width: 100%;
  display: flex;
  background-color: white;
`;

export const ContainerCima = styled.View`
  height: 25%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  margin-bottom: 1%;
`;

export const ContainerBaixo = styled.View`
    height: 75%;
    width: 100%;
    display: flex;
    justify-content: flex-start;
`;

export const TextoBotao = styled.Text`
  font-size: 15px;
  font-weight: 400;
  color: ${Cores.azulEscuro};
`;

export const ContainerBotoes = styled.View`
  height: 16%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const CaixaBotao = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 75%;
  height: 40px;
  margin-top: 1%;
  margin-bottom: 3%;
  background-color: ${Cores.cinza[7]};
  border-radius: 3px;
  border-color: ${Cores.azulEscuro};
  border-width: 1.5px;
  elevation: 5;
`;

export const TextoCima = styled.Text`
  font-size: 33px;
  font-weight: 600;
  color: ${Cores.azulEscuro};
`;
