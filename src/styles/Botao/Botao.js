import styled from "styled-components/native";

export const Botao = styled.TouchableOpacity`
  /*Posição */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: ${(props) => props.flexDirection?? "row"}
  /*Medidas*/
  margin-top: ${(props) => props.marginTop?? "2%"};
  margin-bottom: ${(props) => props.marginBottom?? "0%"};
  margin-right: ${(props) => props.marginRight?? "0%"};
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  /*cor e borda do botão*/
  overflow: hidden;
  background-color: ${(props) => props.backgroundColor};
  border-style: solid;
  border-radius: ${(props) => props.borderRadius};
  border-color: ${(props) => props.borderColor};
  border-width: ${(props) => props.borderWidth};



  padding: ${(props) => props.padding?? "0%"};
`;
export default Botao;
