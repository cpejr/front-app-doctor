import styled from "styled-components/native";
import { Cores } from "../../variaveis";

export const Body = styled.View`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
`;

export const CaixaView = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 90%;
  height: 50%;
  margin-top: 5%;
`;

export const CaixaLogo = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height:70px;
  background-color: ${Cores.azul};
  padding-top: 10%;
  padding-bottom: 10%;
`;

export const Logo = styled.Image`
  width: 60px;
  height: 60px;
`;

export const CaixaTitulo = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;
export const Titulo = styled.Text`
  color: #000000;
  font-size: ${(props) => props.fontSize};
`;
export const CaixaInputs = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 10%;
`;

export const ContainerBotao = styled.View`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 40%;
`;

export const CaixaBotao = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 90%;
  height: auto;
  margin-top: 5%;
  margin-bottom: 20%;
  justify-content: space-between;
`;

export const Rotulo = styled.View`
  width: 100%;
  height: 22px;
  margin-bottom: 20px;
`;

export const TextoRotulo = styled.Text`
  font-weight: 400;
  font-size: 15px;
  color: red;
`;

export const InputNovaSenha = styled.TextInput`
  width: 100%;
  height: 50px;
  background-color: #e4e6f4;
  border-radius: 5px;
  padding-left: 10px;
  margin-top: 6px;
  margin-bottom: 6px;
  border: #151b57;
  border-width: 1.5px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
  font-size: 15px;
  border: ${(props) => {
    let cor;
    if (!props.borderColor) {
      if(props.erro || props.camposVazios){
        cor = Cores.vermelho;
      } else {
        cor = Cores.azul;
      }
    } else {
      cor = props.borderColor;
    }
    return cor;
  }};
`;