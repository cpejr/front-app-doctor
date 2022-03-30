import styled from "styled-components/native";

export const Body = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  /* background-color: #e5e5e5 */
`;

export const CaixaTitulo = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 15%;
`;

export const Logo = styled.Image`
  width: 70;
  height: 70;
`;

export const Titulo = styled.Text`
  font-size: 30px;
`;

export const CaixaInputs = styled.View`
  width: 100%;
  padding-left: 10%;
  padding-right: 10%;
  height: auto;
  bottom: 0;
  background-color: #fff;
  align-items: center;
`;

export const CaixaInputsMesmaLinha = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;
export const CaixaBotoes = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 70%;
`;

