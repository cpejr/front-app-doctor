import styled from "styled-components/native"; 
 
export const Body = styled.View` 
  flex:1;
  align-items: center; 
  width: 100%; 
  background-color: #ffffff;
  height:${(props) => props.height};
`; 

export const CaixaTitulo = styled.View` 
  display: flex; 
  flex-direction: row; 
  align-items: center; 
  justify-content: space-between;
  margin-top: 4%; 
  margin-bottom: 4%; 
  margin-left: ${(props) => props.marginLeft};
  width:100%;
`;

export const VoltarIcone = styled.Image`
margin-left: 0px;
height:28px;
width:28px;
`;

export const Titulo = styled.Text` 
  font-size: ${(props) => props.fontSize};
  color: #0A0E3C;
  font-weight: 600;
  width:81%;
`; 

export const ConteudoView = styled.Text` 
   color: #0A0E3C;
   font-size: ${(props) => props.fontSize};
   width:94%;
   font-weight: 300;
`; 

export const BotaoView = styled.View` 
  display: flex; 
  flex-direction: row; 
  justify-content: center; 
  width: 100%; 
  margin-bottom: 20px;
  margin-top: 2%;
`; 

export const Botao = styled.TouchableOpacity` 
  display: flex; 
  flex-direction: row; 
  align-items: center; 
  justify-content: center; 
  padding-left: 5%; 
  padding-right: 5%; 
  margin-top: 2%; 
  height: 100%; 
  width: ${(props) => props.width};
  overflow: hidden; 
  background-color: #FFFFFF; 
  border-style: solid; 
  border-radius: 3px; 
  border-color: #000000; 
  border-width: 1px; 
`; 

export const BotaoIcone = styled.Image`
margin-right: 5px;
height:28px;
width:28px;
`;