import styled from "styled-components/native";
import { Cores } from "../../variaveis";
import DatePicker  from "react-native-datepicker";
import { Picker } from "@react-native-picker/picker";

export const Body = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${Cores.branco};
`;

export const CaixaAlterarDados = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin-bottom: 5%;
  margin-top: 7%;
  border-style: solid;
  border-radius: 6px;
  border-color: rgba(0, 0, 0, 0.15);
  border-width: 3px;
`;

export const CaixaTitulo = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const CaixaCima = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-top: 8%;
  margin-bottom: 4%;
  padding: 0 5% 0 5%;
`;

export const Titulo = styled.Text`
  font-size: 30px;
  width: 200px;
`;


export const CaixaInputs = styled.View`
  width: 100%;
  padding-left: 10%;
  padding-right: 10%;
  margin-top: 2%;
  height: auto;
  bottom: 0;
  background-color: ${Cores.branco};
  align-items: center;
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
  justify-content: space-between;
  align-items: center;
  width: 70%;
  margin-top: 5%;
  margin-bottom: 5%;
`;

export const Foto = styled.View`
  width: 100px;
  height: 100px;
  border-color: ${(props) => props.borderColor};
  border-left-width: 3px;
  border-right-width: 3px;
  border-radius: 2px;
  background-color: ${Cores.cinza[9]};
  justify-content: center;
  align-items: center;
  display: flex;
  elevation: 2;
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
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export const Rotulo = styled.Text`
  font-size: 12px;
  color: ${Cores.vermelho};
  text-align: justify;
  line-height: 12px;
  margin-bottom: 1%;
`;

export const TituloRotulos = styled.Text`
  font-size: 13px;
  color: ${Cores.cinza[6]};
  
`;

export const CaixaTitulosRotulos = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  margin-left: 2%;
`;

export const PickerView = styled.View`
  display: flex;
  width: 100%;
  background-color: #e4e6f4;
  border-radius: 5px;
  border-color: ${Cores.azul};
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