import React, { useState, useEffect } from "react";
import { sleep } from "../../utils/sleep";
import { Alert, ScrollView, Text, View, useWindowDimensions} from "react-native";
import { 
    ContainerBody, 
    ContainerCima, 
    ContainerTodasReceitas, 
    ContainerReceitas, 
    TituloReceitas, 
    TextoData,
    BarraPesquisa,
    IconPesquisa,
    InputPesquisa,
} from "./Styles";
import searchIcon from "../../assets/searchIcon.png";
import Botao from "../../styles/Botao";
import { Cores } from "../../variaveis";
import * as managerService from "../../services/ManagerService/managerService";


function ListaReceitas({ navigation }) {

    const [ receitas, setReceitas ] = useState([]);
    const [ idUsuario, setIdUsuario ] = useState("");


  /*async function pegandoDados() {
    const resposta = await managerService.GetDadosUsuario();
    setIdUsuario(resposta.dadosUsuario.id);
    console.log("Id usuario é tatnatnatna ", resposta);
  }*/

  async function pegandoReceitas() {
    const resposta = await managerService.GetDadosReceitas();
    //setReceitas(resposta.dadosReceitas.receita);
    console.log("teste aqui", resposta.dadosReceitas);
  }
  
  useEffect(() => {
    pegandoReceitas();
  }, []);


    return(
    <ContainerBody>
        <ContainerCima>   
            <BarraPesquisa>
            <InputPesquisa placeholder="Pesquisar no chat" />
            <IconPesquisa source={searchIcon} />
            </BarraPesquisa>
        </ContainerCima>
        <ContainerTodasReceitas>
          
            <ContainerReceitas>
            
                <TituloReceitas></TituloReceitas>
                <TextoData>XX/XX/XXXX</TextoData>
            </ContainerReceitas>

            <ContainerReceitas>
                <TituloReceitas>Receita Numero2 Receita</TituloReceitas>
                <TextoData>XX/XX/XXXX</TextoData> 
            </ContainerReceitas> 

        </ContainerTodasReceitas>
    </ContainerBody> );

}

export default ListaReceitas;