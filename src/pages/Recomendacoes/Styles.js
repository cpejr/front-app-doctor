import styled from "styled-components/native";
import { Cores } from "../../variaveis";
import { ScrollView } from "react-native";

export const Body = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${Cores.branco};
  display: flex;
  flex-direction: column;
  align-items: center;
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

export const CaixaTitulo = styled.View`
  width: 75%;
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
  color: ${Cores.preto};
  text-align: center;
`;

export const CaixaSubTitulo = styled.View`
  width: 90%;
  height: auto;
  padding: 3%;
`;

export const SubTitulo = styled.Text`
  font-size: 15px;
  text-align: center;
  font-weight: normal;
  color: ${Cores.preto};
  margin-bottom: 15px;
`;

export const CaixaScroll = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => props.height};
  width: 100%;
`;

export const CaixaExames = styled.View`
   width: 100%;
   height: 50px;
   background-color: ${Cores.cinza[7]};
   border: solid;
   border-color: ${Cores.azul};
   border-radius: 5px;
   border-width: 1px;
   margin-bottom: 10px;
   align-items: center;
   justify-content: center;
`;

export const NomeExame = styled.Text`
  font-size: 15px;
  text-align: center;
  font-weight: normal;
  color: ${Cores.preto};
`;


