import styled from "styled-components/native";
import { TextInputMask } from "react-native-masked-text"
import { TextInput } from "react-native";

export const InputMask = styled(TextInputMask)`
  width: ${(props) => props.width};
  height: 40px;
  background-color: #e4e6f4;
  border-radius: 5px;
  padding-left: 10px;
  margin-top: 6px;
  margin-bottom: 6px;
  border: #151b57;
  border-width: 1.5px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
  font-size: 12px;
`;
export default InputMask;