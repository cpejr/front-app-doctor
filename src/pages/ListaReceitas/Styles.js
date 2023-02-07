import styled from "styled-components/native";
import { Cores } from "../../variaveis";

export const ContainerBody = styled.View`
  height: 100%;
  width: 100%;
  display: flex;
  background-color: ${Cores.branco};
`;

export const ContainerCima = styled.View`
  height: auto;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  margin-bottom: 0%;
  
`;

export const TextoCima = styled.Text`
  font-size: 33px;
  font-weight: 600;
  color: ${Cores.azulEscuro};
`;

export const CaixaTextoCima = styled.View`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  padding-top: 15px;
  padding-bottom: 15px;
`;

export const ContainerTodasReceitas = styled.View`
  height: 80%;
  width: 100%;
  display: flex;
`;

export const ContainerReceitas = styled.View`
  height: 80px;
  width: 100%;
  padding: 1% 6% 4% 6%;
  background-color: white;
  border-radius: 3px;
  margin: 2% 0% 1% 0%;
  z-index: 100;
  border-bottom-width: 1px;
  border-color: ${Cores.cinza[11]};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

// export const TituloReceitas = styled.Text`
//   width: 50%;
//   font-size: 16px;
//   font-weight: bold;
//   color: ${Cores.azulEscuro};
//   text-decoration: underline;
// `;

export const TextoData = styled.Text`
  font-size: 16px;
  color: #434b97;
`;

export const BarraPesquisa = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 90%;
  height: 45px;
  background-color: ${Cores.cinza[10]};
  border-radius: 5px;
  padding-left: 10px;
  border: #636ab4;
  border-width: 1.5px;
  margin-bottom: 25px;
  font-size: 12px;
`;

export const InputPesquisa = styled.TextInput`
  height: 100%;
  font-size: 17px;
  width: 90%;
`;

export const IconPesquisa = styled.Image`
  width: 23px;
  height: 23px;
  margin-right: 1px;
`;

export const PaginaCarregando = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Titulo = styled.Text`
  font-size: ${(props) => props.fontSize};
  color: ${(props) => props.color};
  margin-bottom: ${(props) => props.marginBottom ?? "0px"};
  margin-left: 13px;
`;

export const HeaderListaReceitas = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.borderColor};
  padding-top: 10px;
  padding-bottom: 15px;
  padding-left: 5px;
  width: 100%;
`;

export const TextoSemReceita = styled.Text`
  text-align: center;
  justify-content: center;
  align-self: center;
  font-size: 18px;
  color: ${Cores.azul};
  margin-bottom: 20px;
`;
export const BordaReceita = styled.View`
  display: flex;
  width: 90%;
  height: auto;
  justify-content: flex-start;
  align-items: center;
  align-self: center;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  margin-top: 4%;
  margin-bottom: 4%;
  background-color: ${Cores.branco};
  border-radius: 5px;
  border-width: 2px;
  border-color: ${Cores.azul};
  elevation: 8;
`;
