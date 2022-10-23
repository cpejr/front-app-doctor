import styled from "styled-components/native";
import { Cores } from "../../variaveis";
import { Picker } from "@react-native-picker/picker";

export const Body = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${Cores.branco};
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 10px;
  padding-bottom: 20px;
`;

export const Modal = styled.View`
  display: flex;
  align-items: center;
  width: 80%;
  height: 50%;
  background-color: ${Cores.cinza[3]};
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 25px;
  padding-bottom: 20px;
`;

export const PickerView = styled.View`
  display: flex;
  justify-content:center;
  align-items:center;
  width: 100%;
  background-color: #e4e6f4;
  border-radius: 5px;
  border-color: ${Cores.azul};
  border-width: 1.5px;
  margin-top: 20px;
  overflow: hidden;
`;

export const PickerSecretaria = styled(Picker)`
  display: flex;
  background-color: #e4e6f4;
  width: 100%;
`;

export const TextoIniciarConversa = styled.Text`
    width: 100%;
    font-size: 18px;
`;