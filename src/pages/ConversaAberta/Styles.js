import styled from "styled-components/native";
import { Cores } from "../../variaveis";
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
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-left: 10px;
  background-color: ${Cores.branco};
`;

export const FundoConversaAberta = styled.View`
  display: flex;
  width: 100%;
  height: 89%;
  background-color: ${Cores.amarelo};
`;

export const FooterConversaAberta = styled.View`
  display: flex;
  flex-direction: row;
  padding: 0 18px 0 18px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  height: 65px;
  position: absolute;
  bottom: 0px;
  background-color: ${Cores.branco};
`;

export const BarraEnviarMensagemConversaAberta = styled.TextInput`
  display: flex;
  width: 83%;
  height: 40px;
  justify-content: center;
  background-color: ${Cores.branco};
  border: solid;
  border-color: ${Cores.azulEscuro};
  border-radius: 5px;
  border-width: 2px;
  padding-left: 15px;
`;

export const CaixaTexto = styled.View`
  max-width: 80%;
`;

export const TextoMensagem = styled.Text.attrs(() => ({
  numberOfLines: 1,
}))`
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
`;

export const TextoMensagemEnviada = styled.Text`
  font-size: 15px;
  color: ${Cores.preto};
`;

export const MensagemEnviada = styled.View`
  display: flex;
  align-items: flex-end;
  align-self: flex-end;
  padding: 3px 13px 5px 13px;
  max-width: 55%;
  margin-top: 8px;
  margin-bottom: 8px;
  background-color: ${Cores.lilas[4]};
  border-radius: 5px;
`;

export const PaginaCarregando = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const MensagemRecebida = styled.View`
  display: flex;
  align-items: flex-end;
  align-self: flex-start;
  padding: 3px 13px 5px 13px;
  max-width: 55%;
  margin-top: 8px;
  margin-bottom: 8px;
  background-color: ${Cores.branco};
  border-radius: 5px;
`;

export const HoraMensagem = styled.Text`
  font-size: 10px;
  color: ${Cores.preto};
`;

export const ImagemUsuario = styled.Image`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50.3px;
  height: 50.3px;
  margin-right: 15px;
  margin-left: 12px;
`;
