import styled from "styled-components/native";
import { Cores } from "../../../variaveis";
import { View, Text } from "react-native";
import { TextInput } from "react-native";
import { ActivityIndicator, Colors, Searchbar } from "react-native-paper";

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
  width: 100%;
  height: 45px;
  background-color: ${Cores.cinza[10]};
  border-radius: 5px;
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 10px;
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
