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
  height: ${(props) => props.height};
  border-radius: 10px;
  margin-top: 5%;
  background-color: ${(props) => props.backgroundColor};
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
  margin-top: 5%;
  max-width: 80%;
  margin-bottom: 3%;
`;

export const Video = styled.View`
  display: flex;
  align-items: center;
  margin-top: 1%;
  background-color: green;
`;

export const CorpoCard = styled.View`
  display: flex;
  align-items: flex-start;
`;

export const TituloInformacao = styled.Text`
  font-size: 20px;
  margin-top: 6%;
  margin-left: 9%;
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
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: green;
`;

export const ConteudoAmie = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

export const ImagemAmie = styled.Image`
  height: ${(props) => props.height};
  width: 35%;
  margin-right: 9%;
  margin-top: 9%;
`;

export const TextoAmie = styled.Text`
  text-align: justify;
  font-size: 12px;
  margin-top: 6%;
  margin-left: 9%;
  margin-right: 9%;
  width: 50%;
  color: ${(props) => props.color};
`;
