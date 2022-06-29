import styled from "styled-components/native";
import { Picker } from '@react-native-picker/picker';

export const Body = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #fff;
`;

export const CaixaTitulo = styled.View`
  display: flex;
  flex-direction: row;
  width:${(props) => props.width};
  align-items: center;
  justify-content: space-around;
  margin-top: ${(props) => props.marginTop};
  margin-bottom:30px;
`;

export const Logo = styled.Image`
  width: 70px;
  height: 70px;
`;

export const Titulo = styled.Text`
  font-size: 25px;
  display:flex;
  align-items: center;
  width:${(props) => props.width};
`;

export const CaixaInputs = styled.View`
  height: auto;
  bottom: 0;
  align-items: center;
`;

export const PickerView = styled.View`
  display: flex;
  width: 100%;
  background-color: #e4e6f4;
  border-radius: 5px;
  border: #151b57;
  border-width: 1.5px;
  margin-top: 6px;
  margin-bottom: 6px;
  overflow: hidden;
`

export const PickerEstado = styled(Picker)`
  display:flex;
  background-color: #e4e6f4;
  width:100%;
  margin-top: 0;
`;

export const MensagemErro = styled.Text`
color: #d90429;
width:100%;
font-size: 11px;
padding-left: 10px;
`;


export const CaixaInputsMesmaLinha = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width:100%;
`;

export const CaixaBotoes = styled.View`
  display: flex;
  flex-direction: row;
  margin-top:16px;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  
  margin-bottom: 30px;
`;

export const CheckboxTexto = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Lgpd = styled.Text`
  font-family: ${(props) => props.fontFamily};
  font-size: 16px;
  text-align: right;
  color: #151B57;
  text-decoration: underline;
`;