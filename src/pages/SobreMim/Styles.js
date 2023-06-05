import styled from "styled-components/native";
import { Cores } from "../../variaveis"

export const ContainerScroll = styled.ScrollView`
  width: 100%;
  height: 100%;
  background-color: ${Cores.branco};
`;

export const PaginaCarregando = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-top: 70%;
`;

export const CaixaBotao = styled.View`
    display: flex;
    flex: 1;
    width: 100%;
    height: 50px;
    padding-left: 6%;
    margin-top: 20px;
    margin-bottom: 10px;
`;

export const BotaoVoltar = styled.TouchableOpacity`
    width: 44px;
    height: 44px;
`;

export const CaixaImagem = styled.View`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    width: 88%;
    border-radius: 3px;
`;

export const CaixaTexto = styled.View`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    width: 88%;
    height: auto;
    background-color: ${Cores.cinza[9]};
    flex-direction: column;
    border: 2px solid ${Cores.azul};
    border-radius: 3px;
    padding-top: 20px;
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 35px;
    margin-bottom: 5%;
`;

export const TituloTexto = styled.Text`
  font-family: ${(props) => props.fontFamily};
  text-align: center;
  font-size: 25px;
  font-weight: 500;
  color: ${Cores.azulEscuro};
`;

export const Texto = styled.Text`
  font-family: ${(props) => props.fontFamily};
  text-align: ${(props) => props.textAlign};
  font-size: 18px;
  color: ${Cores.preto};
`;