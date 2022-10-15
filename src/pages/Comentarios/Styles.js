import styled from "styled-components/native";
import { Cores } from "../../variaveis";


export const ContainerIconeSeta = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 15px;
  padding-left: 5px;
  width: 100%;
`;

export const Container = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: scroll;
  background-color: ${Cores.branco};
  padding-right: 5%;
  padding-left: 5%;
`;

export const Titulo = styled.Text`
  font-size: 26px;
`;

export const ContainerScrollView = styled.ScrollView`
  margin-top: 30px;
  background-color: ${Cores.branco};
  height: auto;
`

export const ContainerComentarios = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; 
  padding-top: 15%;
  padding-bottom: 35%;
  margin-bottom: 10%;
  margin-top: 5%;

`

export const ContainerComentarioIndividual = styled.View`
  height: auto;
  width: 87%;
  align-items: center;
  margin-bottom: 13%;
`

export const TextoComentario = styled.Text`
  font-size: 15px;
  text-align: center;
`



