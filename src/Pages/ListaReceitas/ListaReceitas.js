import React, { useState, useEffect } from "react";
import { sleep } from "../../utils/sleep";
import { ActivityIndicator, Colors } from 'react-native-paper';
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
    PaginaCarregando,
} from "./Styles";
import searchIcon from "../../assets/searchIcon.png";
import Botao from "../../styles/Botao";
import { Cores } from "../../variaveis";
import * as managerService from "../../services/ManagerService/managerService";


function ListaReceitas({ navigation }) {

    const [ receitas, setReceitas ] = useState([]);
    const [carregando, setCarregando] = useState(false);

  async function pegandoReceitas() {
    setCarregando(true);
    const resposta = await managerService.GetDadosReceitas();
    setReceitas(resposta.dadosReceitas[0].receita);
    setCarregando(false);
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
        {carregando ? (
            <PaginaCarregando>
              <ActivityIndicator animating={true} color={Colors.black} />
            </PaginaCarregando>) : ( 
        <ContainerTodasReceitas>         
        {receitas?.map((value) => (
            <ContainerReceitas key = {value.id}>
                <TituloReceitas>{value.titulo}</TituloReceitas>
                <TextoData>{value.data_criacao}</TextoData>
            </ContainerReceitas>))}
            
        </ContainerTodasReceitas>)}
    </ContainerBody> );

}

export default ListaReceitas;