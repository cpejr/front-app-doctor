import styled, { css } from "styled-components/native";
import { Cores } from "../../variaveis";
import { View, Text } from "react-native";
import { TextInput } from "react-native";

export const MensagemEnviada = styled.View`
  display: flex;
  align-items: flex-end;
  padding: 3px 13px 5px 13px;
  max-width: 55%;
  margin-top: 8px;
  margin-bottom: 8px;
  border-radius: 5px;
  align-items:center;
  align-self:  ${({ pertenceAoUsuarioAtual }) => pertenceAoUsuarioAtual ?  'flex-end' : 'flex-start'};
  background-color: ${({ pertenceAoUsuarioAtual }) => pertenceAoUsuarioAtual ?  Cores.lilas[4] : 'white'};
  ${({ pertenceAoUsuarioAtual }) => pertenceAoUsuarioAtual && css`margin-top: 0%;`}
`;

export const CorpoScroll = styled.ScrollView`
  display: flex;
`;

export const DataHoraMensagem = styled.View`
color: black;
width: 100%;
font-size: 10px;
font-weight: 400;
line-height: 18px;
text-align: right;
`;

export const HoraMensagem = styled.Text`
  font-size: 10px;
  color: ${Cores.preto};
`;