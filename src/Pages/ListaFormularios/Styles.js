import styled from "styled-components/native";

export const Body = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 10px;
`;

export const BarraPesquisa = styled.View`
display:flex;
flex-direction: row;
align-items: center;
  width: 100%;
  height: 40px;
  background-color: #EDEDED;
  border-radius: 5px;
  padding-left: 10px;
  margin-top: 10px;
  border: #636AB4;
  border-width: 1.5px;
  font-size: 12px;
`;

export const InputPesquisa = styled.TextInput`
height:100%;
font-size: 17px;
width:90%;
`;

export const IconPesquisa = styled.Image`
width:23px;
height:23px;
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
border-color: #C6C6C6;
`

export const Linha = styled.View`
background-color: aqua;
height: 100%;
`

export const FiltroRespondido = styled.Text`
height: 100%;
border-bottom-width: 1.5px;
color:#0A0E3C
`

export const FiltroNaoRespondido = styled.Text`
height: 100%;
/* border-bottom-width: 1.5px; */
margin-left: 12px;
color:#8D8D8D
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

export const CaixaNomeUrgencia = styled.View`
display:flex;
align-items: flex-start;
flex-direction: row;
justify-content: space-between;
width:100%;
height:50px;
margin-top:20px;
padding-right: 10px;
`;

export const CaixaUrgenciaEstrela = styled.View`

`;

export const FormNome = styled.Text`
text-decoration: underline;
font-size:17px;
font-weight: 700;
color:#0A0E3C;
`;

export const UrgenciaTexto = styled.Text`
font-size:16px;
font-weight: 600;
color:#434B97;
`;

export const EstrelaIcon = styled.Image`

`;

export const CaixaTipoData = styled.View`
display:flex;
align-items: flex-start;
flex-direction: row;
justify-content: space-between;
height:60px;
padding-left:5%;
width:88%
`;

export const TextoTipoData = styled.Text`
font-size:16px;
font-weight: 600;
color:#434B97

`;


