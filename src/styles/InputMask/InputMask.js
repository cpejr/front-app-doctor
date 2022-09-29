import styled from "styled-components/native";
import { TextInputMask } from "react-native-masked-text"
import { TextInput } from "react-native";
import { Cores } from "../../variaveis";

export const InputMask = styled(TextInputMask)`
  width: ${(props) => props.width};
  height: 50px;
  background-color: #e4e6f4;
  border-radius: 5px;
  padding-left: 10px;
  margin-left: ${(props) => props.marginLeft?? "0%"};
  margin-right: ${(props) => props.marginRight?? "0%"};
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
export default InputMask;