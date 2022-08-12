import styled from "styled-components/native";
import { Cores } from "../../variaveis";

export const ContainerBody = styled.View `

    height: 100%;
    width: 100%;
    display: flex;

`;

export const ContainerCima = styled.View `

    height: 15%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    elevation: 4;
    margin-bottom: 1%;

`;

export const ContainerTodasReceitas = styled.View ` 

    height: 80%;
    width: 100%;
    display: flex;

`;

//PRECISA ESTAR DENTRO DE SCROLVIEW 
export const ContainerReceitas = styled.View ` 

    height: 130px;
    width: 100%;
    padding: 4% 6% 4% 6%;
    background-color: white;
    border-radius: 3px;
    margin: 3% 0% 1% 0%;
    elevation: 4;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

`;

export const TituloReceitas = styled.Text ` 
    font-size: 16px;
    font-weight: 800;
    color: ${Cores.azulEscuro};
    text-decoration: underline;
`;

export const TextoData = styled.Text ` 
    font-size: 16px;
    color: #434B97;
`;

export const BarraPesquisa = styled.View`
display:flex;
flex-direction: row;
align-items: center;
width: 90%;
height: 45px;
background-color: #EDEDED;
border-radius: 5px;
padding-left: 10px;
border: #636AB4;
border-width: 1.5px;
font-size: 12px;
`;

export const InputPesquisa = styled.TextInput`
height:100%;
font-size: 17px;
width:90%;
`;

export const IconPesquisa = styled.Image`
width:23px;
height:23px;
margin-right:1px;
`;

export const PaginaCarregando = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;