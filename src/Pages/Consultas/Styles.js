import styled from "styled-components/native";

export const Body = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  padding-right: ${(props) => props.paddingRight};
  padding-left: ${(props) => props.paddingLeft};
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
  border-radius:5px;
  border-style: solid;
  border: #bbc0f4;
  border-width: 2.5px;
`;

export const CaixaData = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25%;  
  height: 100%;
`;

export const CaixaNome = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 50%;
  border-style: solid;
  border: #bbc0f4;
  border-left-width: ${(props) => props.borderLeftWidth};
  border-right-width: ${(props) => props.borderRightWidth};
  border-top-width: 0px;
  border-bottom-width: 0px;
  height: 100%;
`;

export const CaixaHora = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25%;
  border-style: solid;
  height:100%;
`;

export const ConteudoCaixa = styled.Text`
  color: #151b57;
  font-size: ${(props) => props.fontSize};
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
  width: ${(props) => props.width};
  overflow: hidden;
  background-color: #e9ebfc;
  border-style: solid;
  border-radius: 3px;
  border-color: #000000;
  border-width: 1px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
`;
export const IconeBotao = styled.Image`
height: 18px;
width: 18px;
`;

//width: ${(props) => props.width}
