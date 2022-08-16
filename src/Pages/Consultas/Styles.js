import styled from "styled-components/native";
import { Cores } from "../../variaveis";


export const Body = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
  height: ${(props) => props.height};
  background-color: ${Cores.branco};
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
  border: ${Cores.azul};
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
  background-color: ${Cores.cinza[8]};
  height: 38px;
  border-radius: 5px;
  border-style: solid;
  border: ${Cores.lilas[4]};
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
  border: ${Cores.lilas[4]};
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
  height: 100%;
`;

export const ConteudoCaixa = styled.Text`
  color: ${Cores.azul};
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
export const ViewBotao = styled.View`
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
  justify-content: space-around;
  padding-left: 2%;
  padding-right: 3%;
  margin-top: 2%;
  height: 35px;
  width: ${(props) => props.width};
  overflow: hidden;
  background-color: ${Cores.cinza[7]};
  border-style: solid;
  border-radius: 3px;
  border-color: ${Cores.preto};
  border-width: 1px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
`;
export const IconeBotao = styled.Image`
  height: 18.5px;
  width: 18.5px;
`;
export const CaixaModal = styled.View`
  height: 50%;
  width: 80%;
  margin-top:25%;
  margin-left: 10%;
  margin-right: 10%;
  padding-bottom: 10%;
  background-color: #f7f7f7;
  border-radius: 6px;
  border: 4px;
  border-color: #c4c4c4;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const CaixaFechar = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 5%;
`;
export const CaixaTituloModal = styled.View`
  width: 80%;
  display: flex;
  flex-direction: row;
  margin-top: 5%;
  justify-content: center;
`;
export const TituloModal = styled.Text`
  font-size: 25px;
  text-align: center;
`;
export const CaixaDadosModal = styled.View`
  width: 80%;
  display: flex;
  flex-direction: column;
  margin-top: 5%;
  justify-content: center;
`;
export const EnderecoModal = styled.Text`
  font-size: 15px;
  text-align: center;
`;
export const DataModal = styled.Text`
  font-size: 15px;
  text-align: center;
`;
export const CaixaAvaliacaoModal = styled.View`
  width: 80%;
  display: flex;
  flex-direction: row;
  margin-top: 10%;
  justify-content: center;
`;

//width: ${(props) => props.width}
