import styled from "styled-components/native";
import { Cores } from "../../variaveis";


export const ContainerIconeSeta = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding-top: 10px;
  padding-bottom: 0px;
  padding-left: 10px;
  width: 100%;
`;

export const Container = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: scroll;
  background-color: ${Cores.branco};
 
`;

export const PaginaCarregando = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const Titulo = styled.Text`
  font-size: 26px;
`;

export const ContainerScrollView = styled.ScrollView`
  margin-top: 25px;
  background-color: ${Cores.branco};
  height: auto;
  padding-left: 5%;
  padding-right: 5%;
`

export const ContainerComentariosEResposta = styled.View`
  display: flex;
  margin-bottom: 10%;
  height: auto;
  flex-direction: column;
  justify-content: center;
  align-items: center; 
`

export const ContainerComentarios = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: auto;
  width: 100%;
  padding-right: 2%;
  padding-left: 2%;
  align-items: center;
  margin-bottom: ${(props) => props.marginBottom};
  margin-top: ${(props) => props.marginTop ?? "0px"};
  
`

export const ContainerResposta = styled.View`
  margin-top: 5%;
  margin-bottom: 5%;
`

export const TextoComentario = styled.Text`
  font-size: 15px;
  text-align: center;
  font-style: italic;
`

export const TextoResposta = styled.Text`
  font-size: 15px;
  text-align: center;
  color: #3C3C3C;
`



