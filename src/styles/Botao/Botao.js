import styled from "styled-components/native";

export const Botao = styled.TouchableOpacity`
  /*Posição */
  display: flex;
  align-items: center;
  justify-content: center;
  /*Medidas*/
  margin-top: 2%;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  /*cor e borda do botão*/
  overflow: hidden;
  background-color: ${(props) => props.backgroundColor};
  border-style: solid;
  border-radius: ${(props) => props.borderRadius};
  border: ${(props) => props.borderColor};
  border-width: ${(props) => props.borderWidth};
  box-shadow: ${(props) => props.boxShadow};
`;
export default Botao;
