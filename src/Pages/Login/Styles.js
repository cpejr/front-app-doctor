import styled from "styled-components/native";

export const Body = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const CaixaTitulo = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 15%;
  margin-bottom: 8%;
`;

export const Logo = styled.Image`
  width: 90;
  height: 90;
`;

export const CaixaInputs = styled.View`
  width: 80%;
  padding-left: 10%;
  padding-right: 10%;
  height: auto;
  bottom: 0;
  align-items: center;
  margin-bottom: 4%;
`;

export const SenhaCadastro = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 70%;
  margin-top: 5%;
`;

export const BarraEstetica = styled.View`
  color: #434b97;
  background-color: #434b97;
  height: 4px;
  width: 75%;
  margin-top: 2%;
`;

export const BotoesAlternativos = styled.View`
  margin-top: 3%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 65%;
  height: 100px;
`;

export const ConteudoIcone = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const Icone = styled.View`
  margin-left: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
