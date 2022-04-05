import styled from "styled-components/native";

export const Corpo = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 395px;
  height: 100%;
  background-color: #151B57;
`;
export const Botaoo = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #151B57;
  border-style: solid;
  border-radius: 25px;
  border: #000000;
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
  border: #000000;
  border-width: 0px;
  background-color: #c4c4c4;
`;