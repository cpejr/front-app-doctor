import styled from "styled-components/native";

export const Body = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 2% 3% 2% 3%;
  background-color: #ffffff;
`;

export const Titulo = styled.Text`
  font-family: ${(props) => props.fontFamily};
  font-size: 30px;
  color: #838ad0;
`;

export const Subtitulo = styled.Text`
  font-family: ${(props) => props.fontFamily};
  margin-top: 2%;
  text-align: center;
  font-size: 20px;
  color: #717171;
`;

export const TituloPrimeiroTopico = styled.Text`
  font-family: ${(props) => props.fontFamily};
  margin-top: 2%;
  font-size: 25px;
  color: #838ad0;
  align-self: flex-start;
`;

export const TextoPrimeiroTopico = styled.Text`
  font-family: ${(props) => props.fontFamily};
  margin-top: 2%;
  font-size: 20px;
  text-align: justify;
  color: #8A8181;
`;
