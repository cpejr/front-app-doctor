import styled from "styled-components/native";
import { Cores } from "../../variaveis";
const BarlowMedium = require("../../assets/fonts/Barlow-Medium.ttf");

export const Body = styled.View`
	display: flex;
	flex: 1;
	flex-direction: column;
  width: 100%;
  height: 100%;
	align-items: center;
	background-color: ${Cores.branco};
`;

export const CaixaCima = styled.View`
	display: flex;
  width: 100%;
	height: auto;
	justify-content: flex-start;
	align-items: center;
	margin-top: 5%;
`;

export const TextoExames = styled.Text`
	text-align: center;
	font-size: 27px;
  color: ${Cores.azulEscuro};
`;

export const TabFiltro = styled.View`
	display: flex;
	flex-direction: row;
  width: 90%;
  height: auto;
	justify-content: space-around;
	align-items: center;
	border-bottom-width: 2px;
	border-color: ${Cores.cinza[11]};
	margin-top: 10px;
`;

export const TextoTabFiltro = styled.Text`
	width: 100%;
	text-align: center;
	font-size: 16px;
  color: ${Cores.cinza[2]};
	margin-bottom: 5px;
`;
 
export const BotaoFiltro = styled.TouchableOpacity`
	display: flex;
	width: 50%;
	height: 100%;
	border-bottom-width: 3px;
	border-color: ${Cores.azul};
`;

export const CaixaBaixo = styled.View`
	display: flex;
	flex: 1;
  width: 100%;
	justify-content: center;
	align-items: center;
	background-color: ${Cores.branco};
`;

export const Quadro = styled.View`
	display: flex;
  width: 90%;
	height: 90%;
	justify-content: flex-start;
	align-items: center;
	padding-left: 30px;
	padding-right: 30px;
	padding-top: 20px;
	padding-bottom: 20px;
	background-color: ${Cores.branco};
	border-radius: 5px;
	elevation: 8;
`;

export const TextoQuadro = styled.Text`
	text-align: center;
	line-height: 20px;
	font-size: 18px;
  color: ${Cores.preto};
	margin-bottom: 5px;
`;

export const ContainerBotao = styled.View`
	display: flex;
	flex: 1;
	width: 100%;
	height: 100%;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
`;