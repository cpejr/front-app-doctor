import styled from "styled-components/native";
import { Cores } from "../../variaveis";

export const Body = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 2%;
`;

export const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${Cores.branco};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding:2%;
`;

export const ImagemLogo = styled.Image`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  margin-bottom: 5%;
`;

export const ImagemMedicos = styled.Image`
   height: ${(props) => props.height};
  width: ${(props) => props.width};
  margin-top: 5%;
  border-radius: 8px;
`;

export const CaixaSeta = styled.View`
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 5px;
`;

export const CaixaDescricao = styled.View`
  width: 90%;
  min-height: 200px;
  height: auto;
  padding: 4%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Descricao = styled.Text`
  font-size: 15px;
  font-weight: 300;
  color: ${Cores.preto};
  text-align: center;
`;

export const CaixaBotao = styled.View`
  width: 100%;
  height: 15%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${Cores.branco};
  padding: 4%;
`;

export const TextoBotao = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: ${Cores.azulEscuro};
`;
