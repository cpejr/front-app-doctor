import React, { useState, useEffect } from "react";
import { Alert, ScrollView, Text, View} from "react-native";
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
import * as managerService from "../../services/ManagerService/managerService";


function ListaReceitas({ navigation }) {

    const [ receitas, setReceitas ] = useState([]);
    const [ idUsuario, setIdUsuario ] = useState({});

    useEffect(() => {
    pegandoDadosReceitas();
  }, []);
  useEffect(() => {
    pegandoDados();
  }, []);

  async function pegandoDados() {
    const resposta = await managerService.GetDadosUsuario();
    setIdUsuario(resposta.dadosUsuario.id_usuario);
  }
  
  async function pegandoDadosReceitas() {
    const resposta = await managerService.GetDadosReceitas(idUsuario);
    setReceitas(resposta);
    console.log(receitas);
  }


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
                <TituloReceitas>{receitas.titulo}</TituloReceitas>
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