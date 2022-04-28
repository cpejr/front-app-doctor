import styled from "styled-components/native"; 
 
export const Body = styled.View` 
  display: flex; 
  align-items: center; 
  width: 100%; 
  height: 100%; 
  background-color: #ffffff; 
  padding-right:10%; 
  padding-left:10%; 
`; 

export const CaixaTitulo = styled.View` 
  display: flex; 
  flex-direction: row; 
  align-items: center; 
  justify-content: center; 
  margin-top: 4%; 
  margin-bottom: 4%; 
`; 

export const Titulo = styled.Text` 
  font-size: 30px; 
`; 

export const ConteudoView = styled.Text` 
   
`; 

export const BotaoView = styled.View` 
  display: flex; 
  flex-direction: row; 
  justify-content: flex-end; 
  width: 100%; 
  margin-bottom: 5%; 
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
  width: 50%; 
  overflow: hidden; 
  background-color: #e9ebfc; 
  border-style: solid; 
  border-radius: 3px; 
  border-color: #000000; 
  border-width: 1px; 
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3); 
`; 

export const BotaoIcone = styled.Image``; 