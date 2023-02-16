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
  elevation: 20;
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
  height: ${(props) => props.height};
  width: ${(props) => props.width};
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
  background-color: green;
`;

export const ConteudoAmie = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: auto;
  margin-top: 5%;
`;

export const ImagemAmie = styled.Image`
  width: 35%;
  margin-right: 9%;
  margin-left: 3%;
  object-fit: contain;
  height: ${(props) => props.height};
`;

export const TextoAmie = styled.Text`
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
