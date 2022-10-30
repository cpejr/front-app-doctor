import styled from "styled-components/native";
import { Cores } from "../../variaveis";
import { ScrollView } from "react-native";

export const Body = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${Cores.branco};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CaixaSeta = styled.View`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 10px;
  padding-top:4px;
`;

export const CaixaTitulo = styled.View`
  width: 75%;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 10px;
`;

export const Titulo = styled.Text`
  font-size: 25px;
  font-weight: 600;
  color: ${Cores.preto};
  text-align: center;
`;

export const CaixaSubTitulo = styled.View`
  width: 90%;
  height: auto;
  padding: 3%;
`;

export const SubTitulo = styled.Text`
  font-size: 15px;
  text-align: center;
  font-weight: normal;
  color: ${Cores.preto};
  margin-bottom: 15px;
`;

export const CaixaScroll = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => props.height};
  width: 100%;
`;

export const CaixaExames = styled.View`
   width: 100%;
   height: 50px;
   background-color: ${Cores.cinza[7]};
   border: solid;
   border-color: ${Cores.azul};
   border-radius: 5px;
   border-width: 1px;
   margin-bottom: 10px;
   align-items: center;
   justify-content: center;
`;

export const NomeExame = styled.Text`
  font-size: 15px;
  text-align: center;
  font-weight: normal;
  color: ${Cores.preto};
`;

export const CaixaExterna = styled.View`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  display: flex;
  justify-content: center;
  align-items: center; 
  background-color: rgba(0,0,0,0.6); 
`;

export const CaixaModal = styled.View`
  max-height: ${(props) => props.height};
  height: auto;
  width: 80%;
  padding:0% 5% 5% 5%;
  background-color: white;
  border-radius: 6px;
  border: 4px;
  border-color: #c4c4c4;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
`;
export const CaixaFechar = styled.View`
  width: 100%;
  height: 10%;
  height: auto;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  padding-top: 5%;
`;
export const CaixaTituloModal = styled.View`
  width: 80%;
  display: flex;
  flex-direction: row;
  margin-top: 2%;
  margin-bottom:25px;
  justify-content: center;
`;
export const TituloModal = styled.Text`
  font-size: 23px;
  text-align: center;
`;

export const CaixaDescricaoModal = styled.View`
  width: 100%;
  height: auto;
  margin-bottom:25px;
`;

export const DescricaoModal = styled.Text`
  font-size: 13px;
  text-align: center;
`;

export const CaixaContatos = styled.View`
  height: ${(props) => props.height};
  width: 100%;
  display: flex;
  justify-content: center;

`;

export const Contatos = styled.View`
  height: auto;
  width: 100%;
  margin-bottom: 5px;
`;

export const CaixaNomeMedica = styled.View`
  height: auto;
  width: 100%;
  margin-bottom: 5px;

`;

export const NomeMedica = styled.Text`
  font-size: 19px;
  text-align: center;
`;

export const CaixaInfo = styled.View`
  height: auto;
  width: 100%;
  
`;

export const Info = styled.Text`
  font-size: 15px;
  text-align: left;
  margin-bottom: 4px;
`;


