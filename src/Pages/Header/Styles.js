import styled from "styled-components/native";
import { Cores } from "../../variaveis"
import Icon from 'react-native-vector-icons/AntDesign';

export const Corpo = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${Cores.azul};
`;
export const Botaoo = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${Cores.azul};
  border-style: solid;
  border-radius: 25px;
  border: ${Cores.preto};
  border-width: 0px;
  width: 50px;
  height: 50px;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 5px;
`;

export const Logo = styled.Image`
  width: 100%;
  height: 100%;
`;

export const Perfil = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 85%;
  height: 85%;
  border-style: solid;
  border-radius: 25px;
  border: ${Cores.branco};
  border-width: 0px;
  background-color: ${Cores.branco};


`;