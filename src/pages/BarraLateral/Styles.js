import styled from "styled-components/native";
import { Cores } from "../../variaveis";
import { View, Text } from "react-native";
import { TextInput } from "react-native";
import { ActivityIndicator, Colors, Searchbar } from "react-native-paper";
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

export const HeaderChat = styled.View`
  display: flex;
  width: 100%;
  height: 65px;
  flex-direction: row;
  align-items: center;
  justify-content: center;

`;


export const ContainerIcone = styled.View`
  display: flex;
  width: 12%;
  height: 55px;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

export const CaixaUsuarioMensagem = styled.View`
    display:flex;
    flex-direction: row;
    justify-content: space-around;
    width: 97%;
    height: 100px;
`;

export const CaixaImagem = styled.View`
    display:flex;
    align-items: center;
    justify-content: center;
    width: 30px;
`;

export const TextoCaixa = styled.Text.attrs(()=>({
  numberOfLines: 1
}))`
  font-size: ${(props) => props.fontSize};
  padding-bottom: 5px;
  
`;

export const PaginaCarregando = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const CaixaTexto = styled.View`
    display:flex;
    flex-direction: column;
    justify-content: center;
    width: 70%;
    height: 100px;
`;

export const BarraPesquisa = styled.View`
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content:space-between;
  width: 97%;
  height: 45px;
  background-color: ${Cores.cinza[10]};
  border-radius: 5px;
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 20px;
  border: ${Cores.lilas[5]};
  border-width: 1.5px;
  font-size: 12px;
  margin-bottom: 30px;
`;

export const InputPesquisa = styled.TextInput`
height:100%;
font-size: 17px;
width:90%;
`;

export const IconPesquisa = styled.Image`
width:23px;
height:23px;
margin-right:1px;
`;

export const ImagemUsuario = styled.Image`
  display: flex;
  justify-content: center;
  align-items:center;
  width: 60.3px;
  height: 60.3px;
`;


export const CaixaModalGrande = styled.View`
  height:  ${(props) => props.height};
  width: 80%;
  max-width: 600px;
  margin-left: 10%;
  margin-right: 10%;
  padding: 3%;
  background-color: white;
  border-radius: 6px;
  border: 4px;
  border-color: #c4c4c4;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  opacity: 1;

`;

export const CaixaFechar = styled.View`
  width: 100%;
  height: auto;
  height: auto;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 8px;
`;
export const CaixaTituloModal = styled.View`
  width: 100%;


`;
export const TituloModal = styled.Text`
  font-size: 18px;
  text-align: center;
`;


export const PickerView = styled.View`
  display: flex;
  justify-content:center;
  align-items:center;
  width: 85%;
  background-color: #e4e6f4;
  border-radius: 5px;
  border-color: ${Cores.azul};
  border-width: 1.5px;
  overflow: hidden;
`;

export const PickerSecretaria = styled(Picker)`
  display: flex;
  background-color: #e4e6f4;
  width: 100%;
`;

export const CaixaExterna = styled.View`
    height: ${(props) => props.height};
    width: ${(props) => props.width};
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.6);
    
`;

export const CaixaInterna = styled.View`
    height: 80%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

