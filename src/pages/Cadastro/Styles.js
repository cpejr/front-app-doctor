import styled from "styled-components/native";
import { Picker } from "@react-native-picker/picker";
import { Cores } from "../../variaveis";
import DatePicker from "@react-native-community/datetimepicker";

export const Body = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #fff;
`;

export const CaixaTitulo = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 30px;
  height: auto;
  width: ${(props) => props.width};
  margin-top: ${(props) => props.marginTop};
`;

export const Logo = styled.Image`
  border-radius: 10px;
`;

export const Titulo = styled.Text`
  font-size: 25px;
  display: flex;
  align-items: center;
  width: ${(props) => props.width};
`;

export const CaixaInputs = styled.View`
  height: auto;
  bottom: 0;
  align-items: center;
`;

export const CaixaRotuloMesmaLinha = styled.View`
  display: flex;
  flex-direction: column;
  width: 48%;
`;

export const CaixaRotulo = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Rotulo = styled.Text`
  font-size: 12px;
  color: ${Cores.vermelho};
  text-align: justify;
  line-height: 12px;
  margin-bottom: 1%;
`;

export const Data = styled(DatePicker)`
  width: 100%;
  height: 50px;
  margin-top: 6px;
  margin-bottom: 6px;
  background-color: #e4e6f4;
  border-width: 1.5px;
  border-color: ${(props) => {
    let cor;
    if (!props.borderColor) {
      if (props.camposVazios) {
        cor = Cores.vermelho;
      } else {
        cor = Cores.azul;
      }
    } else {
      cor = props.borderColor;
    }
    return cor;
  }};
  border-radius: 5px;
  justify-content: center;
`;

export const PickerView = styled.View`
  display: flex;
  width: 100%;
  background-color: #e4e6f4;
  border-radius: 5px;
  border: ${(props) => {
    let cor;
    if (!props.borderColor) {
      if (props.camposVazios) {
        cor = Cores.vermelho;
      } else {
        cor = Cores.azul;
      }
    } else {
      cor = props.borderColor;
    }
    return cor;
  }};
  border-width: 1.5px;
  margin-top: 6px;
  margin-bottom: 6px;
  overflow: hidden;
`;

export const PickerEstado = styled(Picker)`
  display: flex;
  background-color: #e4e6f4;
  width: 100%;
  margin-top: 0;
`;

export const MensagemErro = styled.Text`
  color: #d90429;
  width: 100%;
  font-size: 11px;
  padding-left: 10px;
`;

export const CaixaInputsMesmaLinha = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const CaixaBotoes = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: 16px;
  justify-content: space-between;
  align-items: center;
  width: 70%;

  margin-bottom: 30px;
`;

export const CheckboxTexto = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Lgpd = styled.Text`
  font-family: ${(props) => props.fontFamily};
  font-size: 16px;
  text-align: right;
  color: #151b57;
  text-decoration: underline;
`;

export const CaixaTituloInput = styled.View`
  display: flex;
  justify-content: flex-start;
  width: 100%;
`;

export const TituloInput = styled.Text`
  font-size: 12px;
  color: ${Cores.azulEscuro};
  text-align: left;
`;

export const PossuiConvenio = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 2% 10% 0% 10%;

  color: ${Cores.azul};
  .ant-switch-checked {
    background-color: ${Cores.azul};
  }
`;

export const Texto = styled.Text`
  font-size: 12px;
  color: ${Cores.azulEscuro};
`;

export const CaixaTextoConvenioCuidador = styled.View`
  margin-top: 5%;
`;

export const CaixaParaDatadeNascimento = styled.Text`
  width: ${(props) => props.width ?? "100%"};
  height: 50px;
  background-color: #e4e6f4;
  border-radius: 5px;
  padding-left: 10px;
  margin-top: 6px;
  margin-bottom: 6px;
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
  border-width: 1.5px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
  font-size: 15px;
`;