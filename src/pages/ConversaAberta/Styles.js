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
  height: 82%;
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

export const CaixaModalUpdateFoto = styled.View` 
  height: ${(props) => props.height}; 
  width: 80%; 
  max-width: 600px; 
  margin-top: ${(props) => props.marginTop}; 
  margin-left: 10%; 
  margin-right: 10%; 
  padding-bottom: 5%; 
  padding-top:0%; 
  background-color: white; 
  border-radius: 6px; 
  border: 4px; 
  border-color: #c4c4c4; 
  display: flex; 
  align-items: center; 
  justify-content: flex-start; 
`; 
 
export const CaixaExterna = styled.View` 
  height: ${(props) => props.height}; 
  width:  ${(props) => props.width}; 
  background-color: rgba(0,0,0,0.6); 
  display: flex; 
  align-items: center; 
  justify-content: center; 
`; 
 
export const CaixaFechar = styled.View` 
  width: 100%; 
  height: 10%; 
  height: auto; 
  display: flex; 
  align-items: flex-end; 
  justify-content: flex-start; 
  padding-right: 5%; 
  padding-top: 5%; 
`; 
 
export const CaixaTituloModal = styled.View` 
  width: 80%; 
  height: 90%; 
  display: flex; 
  flex-direction: column; 
  justify-content: space-around; 
  align-items: center; 
`; 
 
export const CaixaBotoesAlterarEDeletarImagem = styled.View` 
 display: flex; 
 margin-top: 5%; 
 flex-direction: column; 
 justify-content: center; 
 align-items: center; 
 width: 100%; 
  
`; 
 
export const BotaoAlterarEDeletarImagem = styled.TouchableOpacity` 
  margin-top: 3%; 
  align-items:center; 
`; 
 
export const TituloModal = styled.Text` 
  font-size: 18px; 
  font-weight:600; 
  text-align: center; 
`; 
 
export const CaixaBotoesCancelarConfirmarModalExcluirFoto = styled.View` 
  width: 100%; 
  display: flex; 
  margin-top: 1%; 
  flex-direction: row; 
  justify-content: space-around; 
`; 
 
export const ImagemModal = styled.Image` 
 width: ${(props) => props.width}; 
 height: ${(props) => props.height}; 
 margin-top: 25px; 
 
`;