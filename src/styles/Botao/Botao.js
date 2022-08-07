import styled from "styled-components/native";

export const Botao = styled.TouchableOpacity`
  /*Posição */
  display: flex;
  align-items: center;
  justify-content: center;
  /*Medidas*/
  margin-top: ${(props) => props.marginTop?? "2%"};
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  /*cor e borda do botão*/
  overflow: hidden;
  background-color: ${(props) => props.backgroundColor};
  border-style: solid;
  border-radius: ${(props) => props.borderRadius};
  border-color: ${(props) => props.borderColor};
  border-width: ${(props) => props.borderWidth};
`;
export default Botao;
