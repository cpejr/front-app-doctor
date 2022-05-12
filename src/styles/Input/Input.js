import styled from "styled-components/native";

export const Input = styled.TextInput`
  width: ${(props) => props.width};
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
`;
export default Input;
