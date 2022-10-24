import styled from "styled-components/native";
import { Cores } from "../../variaveis";

export const Body = styled.View`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  background-color: ${Cores.branco};
`;

export const CaixaCima = styled.View`
  display: flex;
  width: 100%;
  height: auto;
  justify-content: flex-start;
  align-items: center;
  margin-top: ${(props) => props.marginTop};
`;

export const TextoExames = styled.Text`
  text-align: center;
  font-size: ${(props) => props.fontSize};
  color: ${Cores.azulEscuro};
`;

export const TabFiltro = styled.View`
  display: flex;
  flex-direction: row;
  width: 90%;
  height: auto;
  justify-content: center;
  align-items: center;
  margin-top: ${(props) => props.marginTop};
`;

export const TextoTabFiltro = styled.Text`
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 14px;
  color: ${(props) => {
    let cor;
    if (!props.color) {
      if (props.campoSelecionado) {
        cor = Cores.azul;
      } else {
        cor = Cores.cinza[2];
      }
    } else {
      cor = props.color;
    }
    return cor;
  }};
`;

export const BotaoFiltro = styled.TouchableOpacity`
  display: flex;
  width: 50%;
  height: ${(props) => props.height};
  justify-content: center;
  align-items: center;
  border-bottom-width: 3px;
  border-color: ${(props) => {
    let cor;
    if (!props.borderColor) {
      if (props.campoSelecionado) {
        cor = Cores.azul;
      } else {
        cor = Cores.cinza[2];
      }
    } else {
      cor = props.borderColor;
    }
    return cor;
  }};
`;

export const Scroll = styled.ScrollView`
  display: flex;
  flex: 1;
  width: 100%;
  background-color: ${Cores.branco};
`;

export const CaixaBaixo = styled.View`
  display: flex;
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${Cores.branco};
`;

export const Quadro = styled.View`
  display: flex;
  width: 90%;
  height: 500px;
  justify-content: flex-start;
  align-items: center;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 20px;
  padding-bottom: 20px;
  margin-top: 4%;
  margin-bottom: 4%;
  background-color: ${Cores.branco};
  border-radius: 5px;
  elevation: 8;
`;

export const TextoQuadro = styled.Text`
  text-align: center;
  line-height: 20px;
  font-size: 18px;
  color: ${Cores.preto};
  margin-bottom: 5px;
`;

export const ContainerBotao = styled.View`
  display: flex;
  flex: 1;
  width: 100%;
  height: 90%;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

export const QuadroExames = styled.View`
  display: flex;
  width: 90%;
  height: auto;
  justify-content: flex-start;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  margin-top: 4%;
  margin-bottom: 4%;
  background-color: ${Cores.branco};
  border-radius: 5px;
  border-width: 2px;
  border-color: ${Cores.azul};
  elevation: 8;
`;

export const ContainerExames = styled.TouchableOpacity`
  display: flex;
  width: 100%;
  height: auto;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 0%;
  margin-bottom: 20px;
  border-radius: 4px;
  border-width: 2px;
  border-color: ${Cores.lilas[3]};
  background-color: ${Cores.cinza[7]};
`;

export const CaixaData = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25%;
  height: 50px;
`;

export const Data = styled.Text`
  text-align: center;
  font-size: 12px;
  color: ${Cores.azul};
`;

export const CaixaTipoExame = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  border-left-width: 2px;
  border-right-width: 2px;
  border-color: ${Cores.lilas[3]};
  width: 50%;
  height: 50px;
`;

export const TipoExame = styled.Text`
  text-align: center;
  font-size: 14px;
  color: ${Cores.azul};
`;

export const CaixaHorario = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25%;
  height: 50px;
`;

export const Horario = styled.Text`
  text-align: center;
  font-size: 14px;
  color: ${Cores.azul};
`;

export const CaixaBaixoCarregando = styled.View`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${Cores.branco};
`;

export const TextoSemExame = styled.Text`
  text-align: center;
  justify-content: center;
  align-self: center;
  font-size: 18px;
  color: ${Cores.azul};
  margin-bottom: 20px;
`;
