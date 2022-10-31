import styled from "styled-components/native";
import { Cores } from "../../variaveis"

export const Body = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: scroll;
`;

export const PaginaCarregando = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 100%;
`;

export const CaixaTitulo = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: ${(props) => props.marginTop};
  margin-bottom: 1%;
  width: 175px;
  height: 200px;
`;

export const Logo = styled.Image`
  width: 80%;
  height: 80%;
  border-radius: 10px;
`;

export const CaixaInputs = styled.View`
  width: 80%;
  padding-left: 10%;
  padding-right: 10%;
  height: auto;
  bottom: 0px;
  align-items: center;
  margin-bottom: 4%;
`;

export const TituloInput = styled.Text`
   font-size: 18px;
   color: ${Cores.azul};
   width: 100%;
   display: flex;
   flex-direction: column;
   margin-top: 5px;
`;

export const SenhaCadastro = styled.View`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  width: 100%;
  margin-top: 5%;
`;

export const BarraEstetica = styled.View`
  color: ${Cores.lilas[1]};
  background-color: ${Cores.lilas[1]};
  height: 4px;
  width: 75%;
  margin-top: 2%;
`;

export const BotoesAlternativos = styled.View`
  margin-top: 3%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 65%;
  height: 100px;
`;

export const ConteudoIcone = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const Icone = styled.View`
  margin-left: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
`;

export const AnimacaoCarregandoView = styled.View`
  position: relative;
  top: 0%;
  height: 35px;
`;
