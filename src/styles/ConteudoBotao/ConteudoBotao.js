import styled from "styled-components/native";

export const ConteudoBotao = styled.Text`
  /*Posição */
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  /*Fonte*/
  font-size: ${(props) => props.fontSize};
  color: ${(props) => props.color};
  width: ${(props) => props.width};
  /*Estilização*/
  text-decoration: ${(props) => props.textDecoration?? ""};
`;
export default ConteudoBotao;
