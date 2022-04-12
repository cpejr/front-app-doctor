import styled from "styled-components/native";



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
  width: 70%;
  align-items: center;
  justify-content: space-around;
  margin-top: 12%;
  margin-bottom: 6px;
  margin-bottom:15px
`;

export const Logo = styled.Image`
  width: 70px;
  height: 70px;
`;

export const Titulo = styled.Text`
  font-size: 25px;
  display:flex;
  align-items: center;
  width:50%;
`;

export const CaixaInputs = styled.View`
  height: auto;
  bottom: 0;
  align-items: center;
`;

export const CaixaInputsMesmaLinha = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width:100%
`;
export const CaixaBotoes = styled.View`
  display: flex;
  flex-direction: row;
  margin-top:6px;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  
  margin-bottom: 5%;
`;

