import styled from "styled-components/native";
import { Cores, Fontes } from "../../variaveis";

export const Body = styled.View`

  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${Cores.branco};
`;


export const ScrollViewBranco = styled.ScrollView`
  background-color: ${Cores.branco};
`;


export const CaixaTextoCima = styled.View`

  display: flex;
  padding-top: ${(props) => props.paddingTop}; 
  padding-left: 5%; 
  padding-right: ${(props) => props.paddingRight}; 
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  height:${(props) => props.height};
  background-color: ${Cores.branco};
  margin-bottom:${(props) => props.marginBottom}; 
`;

export const CaixaContato = styled.View`

  display: flex;
  padding: 4% 3% 8% 3%;
  align-items: center;
  justify-content: space-between;
  width: 77%;
  height:${(props) => props.height};
  border: solid;
  border-color:${Cores.preto};
  border-radius: 3px;
  border-width: 1px;
  elevation: 8;
  background-color: ${Cores.cinza[7]};
`;

export const Titulo = styled.Text`

  font-size: 26px;
  color: ${Cores.azulEscuro};

`;

export const TextoCaixa = styled.Text`

    font-size: 13px;
    color: ${Cores.azulEscuro};
    
`;

export const TextoCaixaContato = styled.Text`

    font-size: 20px;
    color: ${Cores.azulEscuro};
    font-family: ${(props) => props.fontFamily};
`;

export const CaixaFaleConosco = styled.View`

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 3% 0 2%;
  justify-content: space-around;
  width:${(props) => props.width}; 
  height:${(props) => props.height};        
  border-width: 1px;
  border-color:${Cores.azulEscuro};
  border-radius: 2px;
  border-width: 1.2px;
  elevation: 6;
  background-color: ${Cores.branco};
  margin-top:${(props) => props.marginTop}; 
`;

