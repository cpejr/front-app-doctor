import styled from "styled-components/native";
import { Cores } from "../../variaveis";

export const Scroll = styled.ScrollView`
  width: 100%;
  height: 100%;
  background-color: ${Cores.branco};
`;

export const Body = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${Cores.branco};
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 10px;
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
  margin-top: 10px;
  border: ${Cores.lilas[5]};
  border-width: 1.5px;
  font-size: 12px;
`;

export const InputPesquisa = styled.TextInput`
height:100%;
font-size: 17px;
width:90%;
background-color: green;
`;

export const IconPesquisa = styled.Image`
width:23px;
height:23px;
margin-right:1px;
background-color: green;
`;

export const TabView = styled.View`
display: flex;
flex-direction: row;
width: 95%;
margin-top: 20px;
margin-bottom: 5px;
align-items: flex-end;
height: 25px;
border-bottom-width: 1px;
border-color: ${Cores.cinza[11]};

`

export const FiltroRespondido = styled.Text`
height: 100%;
border-bottom-width: ${(props) => props.borderBottomWidth};
color:${(props) => props.color};
/* background-color: green; */
`

export const FiltroNaoRespondido = styled.Text`
height: 100%;
margin-left: 12px;
color:${(props) => props.color};
border-bottom-width:${(props) => props.borderBottomWidth};
/* background-color: green; */
`

export const CaixaLista = styled.View`
flex:1;
width:95%;
margin-top:8px;
`;

export const BotaoForm = styled.View`
align-items: center;
flex-direction: column;
width:100%;
`

export const CaixaItem = styled.View`
border-bottom-width: 1px;
border-color: ${Cores.cinza[11]};
`

export const CaixaNomeUrgencia = styled.View`
display:flex;
align-items: flex-start;
flex-direction: row;
justify-content: space-between;
width:100%;
margin-bottom:15px;
margin-top:20px;
padding-right: 10px;

`;

export const FormNome = styled.Text`
text-decoration: underline;
width: 58%;
font-size:17px;
font-weight: 700;
color:${Cores.azulEscuro};
/* background-color: green; */

`;

export const CaixaUrgenciaEstrela = styled.View`
display:flex;
justify-content:space-between;
align-items: center;
width:${(props) => props.width};
flex-direction: row;
`;

export const UrgenciaTexto = styled.Text`
font-size:16px;
font-weight: 600;
color:${Cores.lilas[1]};
`;

export const CaixaEstrela = styled.View`
display: flex;
flex-direction: row;
/* background-color: green; */
`

export const EstrelaIcon = styled.Image`
width:18px;
height:18px;
`;

export const CaixaTipoData = styled.View`
display:flex;
align-items: flex-start;
flex-direction: row;
justify-content: space-between;
height:60px;
padding-left:5%;
width: ${(props) => props.width};
`;

export const TextoTipoData = styled.Text`
font-size:16px;
font-weight: 600;
color:${Cores.lilas[1]};
/* background-color: green; */
`;


