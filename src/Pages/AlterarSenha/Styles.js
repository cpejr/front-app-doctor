import styled from "styled-components/native";

export const Body = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
  height: ${(props) => props.height};
  background-color: #ffffff;
`;

export const CaixaView = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin-bottom: 5%;
  border-style: solid;
  border-radius: 6px;
  border: #151b57;
  border-width: 2px;
  padding-top: 4%;
  padding-bottom: 5%;
  padding-left: 5%;
  padding-right: 5%;
  margin-top: 5%;
`;
export const CaixaTitulo = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;
export const Titulo = styled.Text`
  color: #000000;
  font-size: ${(props) => props.fontSize};
`;
export const CaixaInputs = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 10%;
`;
export const CaixaBotao = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-top: 5%;
  justify-content: space-between;
`;
