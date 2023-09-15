import styled from "styled-components/native";
import { Cores } from "../../variaveis";

export const Corpo = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-bottom: 50px;
`;

export const Card = styled.View`
  display: flex;
  align-items: center;
  width: 90%;
  border-radius: 10px;
  margin-top: 5%;
  //elevation: 20;
  padding-bottom: 2%;
  background-color: ${(props) => props.backgroundColor};
  height: ${(props) => props.height};
`;

export const TituloCard = styled.Text`
  text-align: center;
  font-size: 18px;
  margin-top: 5%;
  color: ${Cores.azul};
`;

export const TextoCard = styled.Text`
  text-align: center;
  font-size: 14px;
  margin-top: 4%;
  max-width: 80%;
  margin-bottom: 1%;
`;

export const Video = styled.View`
  display: flex;
  align-items: center;
  margin-top: 3%;
  background-color: green;
`;

export const CorpoCard = styled.View`
  display: flex;
  align-items: flex-start;
  height: auto;
`;

export const TituloInformacao = styled.Text`
  font-size: 20px;
  margin-top: 6%;
  margin-left: 9%;
  color: ${(props) => props.color};
`;
export const TituloPagina = styled.Text`
  font-size: 20px;
  margin-top: 0%;
  margin-left: 5%;
  margin-right: 5%;
  color: ${(props) => props.color};
`;
export const TextoPagina = styled.Text`
  font-size: 16px;
  text-align: justify;
  margin-top: 2%;
  margin-left: 6%;
  margin-right: 5%;
  margin-bottom: 5%;
  color: ${(props) => props.color};
`;

export const TextoInfomacao = styled.Text`
  text-align: justify;
  font-size: 14px;
  margin-top: 4%;
  margin-left: 9%;
  margin-right: 9%;
  color: ${(props) => props.color};
`;

export const BotaoSaibaMais = styled.TouchableOpacity`
  margin-top: 5%;
  margin-left: 9%;
  margin-bottom: 3%;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => props.color};
`;

export const ConteudoAprendendo = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: auto;
  margin-top: 5%;
`;

export const ImagemAprendendo = styled.Image`
  width: 35%;
  margin-right: 9%;
  margin-left: 3%;
  object-fit: contain;
  height: ${(props) => props.height};
`;

export const TextoAprendendo = styled.Text`
  text-align: justify;
  font-size: 12px;
  margin-left: 9%;
  width: 50%;
  color: ${(props) => props.color};
`;

export const ImagemCarrossel = styled.Image`
  width: 100%;
  height: 250px;
  border-radius: 5px;
  margin-top: 10%;
`;

export const AnimacaoCarregando = styled.View`
  position: relative;
  margin-top: 70%;
`;

export const CaixaSeta = styled.View`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 10px;
  padding-top:4px;
  margin-top: 5%;
  margin-left: 3%;
`;
export const TituloMemoria = styled.Text`
font-size: 20px;
margin-top: 6%;
margin-left: 28%;
margin-right: 21%;
color: ${(props) => props.color};
`;
export const TextoMemoria = styled.Text`
text-align: justify;
font-size: 12px;
margin-left: 28%;
width: 50%;
color: ${(props) => props.color};
`;
export const BotaoSaibaMaisMem = styled.TouchableOpacity`
  margin-top: 5%;
  margin-left: 25%;
  margin-bottom: 3%;
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: ${(props) => props.color};
`;
export const TituloDisturbio = styled.Text`
font-size: 20px;
margin-top: 6%;
margin-left: 19%;
margin-right: 21%;
color: ${(props) => props.color};
`;
export const TextoDisturbio = styled.Text`
text-align: justify;
font-size: 12px;
margin-left: 18%;
width: 50%;
color: ${(props) => props.color};
`;
export const BotaoSaibaMaisDis = styled.TouchableOpacity`
  margin-top: 5%;
  margin-left: 15%;
  margin-bottom: 3%;
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: ${(props) => props.color};
`;
export const TituloAVC = styled.Text`
font-size: 20px;
margin-top: 6%;
margin-left: 21%;
margin-right: 21%;
color: ${(props) => props.color};
`;
export const TextoAVC = styled.Text`
text-align: justify;
font-size: 12px;
margin-left: 21%;
width: 50%;
color: ${(props) => props.color};
`;
export const BotaoSaibaMaisAVC= styled.TouchableOpacity`
  margin-top: 5%;
  margin-left: 18%;
  margin-bottom: 3%;
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: ${(props) => props.color};
`;
export const TituloOutros = styled.Text`
font-size: 20px;
margin-top: 6%;
margin-left: 21%;
margin-right: 21%;
color: ${(props) => props.color};
`;
export const TextoOutros = styled.Text`
text-align: justify;
font-size: 12px;
margin-left: 21%;
width: 50%;
color: ${(props) => props.color};
`;
export const BotaoSaibaMaisOutros= styled.TouchableOpacity`
  margin-top: 5%;
  margin-left: 18%;
  margin-bottom: 3%;
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: ${(props) => props.color};
`;