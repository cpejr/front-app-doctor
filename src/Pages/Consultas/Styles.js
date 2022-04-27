import styled from "styled-components/native";

export const Body = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  padding-right: 5%;
  padding-left: 5%;
`;

export const ViewConsultas = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 5%;
  border-style: solid;
  border-radius: 6px;
  border: #151b57;
  border-width: 2px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 6%;
  padding-bottom: 1%;
`;

export const CaixaConsulta = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  border-radius: 5px;
  margin-bottom: 4%;
  background-color: #e1e4ff;
  height: 38px;
`;

export const CaixaData = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25%;
  border-style: solid;
  border: #bbc0f4;
  border-width: 2.5px;
  height: 100%;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`;

export const CaixaNome = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 50%;
  border-style: solid;
  border: #bbc0f4;
  border-top-width: 2.5px;
  border-bottom-width: 2.5px;
  height: 100%;
`;

export const CaixaHora = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25%;
  border-style: solid;
  border: #bbc0f4;
  border-width: 2.5px;
  height: 100%;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
`;

export const ConteudoCaixa = styled.Text`
  color: #151b57;
  font-size: 13px;
`;

export const Icone = styled.Image`
  margin-left: ${(props) => props.marginLeft};
  margin-right: ${(props) => props.marginRight};
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
export const ViewBotao= styled.View`
  height: 12%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 5%;
`;
export const CaixaBotao = styled.TouchableOpacity`
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
export const IconeBotao = styled.Image`
`;
