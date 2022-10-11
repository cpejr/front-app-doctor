import styled from "styled-components/native";
import { Cores } from "../../../variaveis";
import { View, Text } from "react-native";
import { TextInput } from "react-native";

export const Body = styled.View`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

export const HeaderConversaAberta = styled.View`
  display: flex;
  width: 100%;
  height: 65px;
  justify-content:center;
  padding-left: 10px;
  background-color: ${Cores.branco};
`;

export const FundoConversaAberta = styled.View`
  display: flex;
  width: 100%;
  height: 82%;
  background-color: ${Cores.amarelo};
`;

export const FooterConversaAberta = styled.View`
  display: flex;
  flex-direction:row;
  padding: 0 18px 0 18px;
  width: 100%;
  justify-content:space-between;
  align-items:center;
  height: 65px;
  background-color: ${Cores.branco};
`;

export const BarraEnviarMensagemConversaAberta = styled.View`
  display: flex;
  width: 83%;
  height: 40px;
  justify-content:center;
  background-color: ${Cores.branco};
  border: solid;
  border-color: ${Cores.azulEscuro};
  border-radius: 5px;
  border-width: 2px;
  padding-left: 15px;
`;

export const TextoMensagem = styled.Text`
    font-size: 15px;
    color: ${Cores.cinza[2]};
`;

export const TextoMensagemEnviada = styled.Text`
    font-size: 15px;
    color: ${Cores.preto};
`;

export const MensagemEnviada = styled.View`
display: flex;
align-items: flex-end;
align-self:flex-end;
padding: 3px 13px 5px 13px;
max-width: 55%;
background-color:${Cores.lilas[4]};
margin: 2%;
`;

export const MensagemRecebida = styled.View`
display: flex;
align-items: flex-end;
align-self:flex-start;
padding: 3px 13px 5px 13px;
max-width: 55%;
background-color:${Cores.branco};
margin: 2%;
`;

export const HoraMensagem = styled.Text`
    font-size: 10px;
    color: ${Cores.preto};
`;

