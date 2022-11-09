import styled from "styled-components/native";
import { Cores } from "../../variaveis"

export const ContainerScroll = styled.ScrollView`
  width: 100%;
  height: 100%;
  background-color: ${Cores.branco};
`;

export const Corpo = styled.View`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const CaixaBotao = styled.View`
    display: flex;
    flex: 1;
    width: 100%;
    height: auto;
    padding-left: 5%;
    margin-top: 4%;
`;

export const BotaoVoltar = styled.TouchableOpacity`
    width: 44px;
    height: 44px;
`;

//tornar dimensões responsivas
export const CaixaImagem = styled.View`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const Imagem = styled.Image`
  width: 423px;
  height: 243px;
  resize-mode: center;
  border-radius: 3px;
`;

export const CaixaTexto = styled.View`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    width: 88%;
    background-color: ${Cores.cinza[9]};
    height: 200px;
    flex-direction: column;
    border: 2px solid ${Cores.azul};
    border-radius: 3px;
`;

//add fonte
export const TituloTexto = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: ${Cores.azulEscuro};
`;