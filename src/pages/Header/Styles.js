import styled from "styled-components/native";
import { Cores } from "../../variaveis"

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
  justify-content: space-between;
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
  border: ${Cores.preto};
  border-width: 0px;
  background-color: ${Cores.azul};
  /*background-color: ${Cores.cinza[3]};*/

`;

export const Foto = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;

`;

export const AnimacaoCarregandoViewNome = styled.View`
  position: relative;
  top: 0%;
  height: 35px;
`;
