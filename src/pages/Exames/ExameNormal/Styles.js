import styled from "styled-components/native";
import { Cores, Fontes } from "../../../variaveis";

export const Body = styled.View`

  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${Cores.branco};

`;

export const CaixaTextoCima = styled.View`

  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 15%;
  background-color: ${Cores.branco};

`;

export const CaixaContato = styled.View`

  display: flex;
  padding: 4% 3% 6% 3%;
  align-items: center;
  justify-content: space-between;
  width: 77%;
  height: 30%;
  border: solid;
  border-color:${Cores.preto};
  border-radius: 3px;
  border-width: 1px;
  elevation: 8;
  background-color: ${Cores.cinza[7]};

`;

export const Titulo = styled.Text`

  font-size: 30px;

`;

export const TextoCaixa = styled.Text`

    font-size: 13px;
    color: ${Cores.azulEscuro};
    
`;

export const TextoCaixaContato = styled.Text`

    font-size: 20px;
    color: ${Cores.azulEscuro};
`;

export const CaixaFaleConosco = styled.View`

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 3% 0 2%;
  justify-content: space-around;
  width: 55%;
  height: 26%;
  border-width: 1px;
  border-color:${Cores.azulEscuro};
  border-radius: 2px;
  border-width: 1.2px;
  elevation: 8;
  background-color: ${Cores.branco};

`;

export const ContainerVoltarCima = styled.View`

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  width: 15%;
  height: 10%;
  background-color: ${Cores.azulEscuro};

`;
