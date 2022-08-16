import React, { useState, useEffect } from "react";
import { sleep } from "../../utils/sleep";
import { ActivityIndicator, Colors, Searchbar } from 'react-native-paper';
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
    const [busca, setBusca] = useState("");
    const lowerBusca = busca.toLowerCase();

  const onChangeBusca = busca => setBusca(busca);

  async function pegandoReceitas() {
    setCarregando(true);
    const resposta = await managerService.GetDadosReceitas();
    setReceitas(resposta.dadosReceitas[0].receita);
    setCarregando(false);
  }
  
  useEffect(() => {
    pegandoReceitas();
  }, []);


  const receitasFiltradas = receitas.filter((receita) => {
    if (lowerBusca === "") 
      return receitas;
    else 
      return(
        (receita?.titulo?.toLowerCase().includes(lowerBusca))
      );
    }); 

    return(
    <ContainerBody>
        <ContainerCima>   
            <BarraPesquisa>
              <InputPesquisa
                placeholder= "BUSCAR"
                onChangeText={onChangeBusca}
                value={busca} />
              <IconPesquisa source = { searchIcon }/>
              </BarraPesquisa>
        </ContainerCima>
        {carregando ? (
            <PaginaCarregando>
              <ActivityIndicator animating={true} color={Colors.black} />
            </PaginaCarregando>) : ( 
        <ContainerTodasReceitas>         
        {receitasFiltradas?.map((value) => (
            <ContainerReceitas key = {value.id}>
                <TituloReceitas>{value.titulo}</TituloReceitas>
                <TextoData>
                  {parseInt(value.data_criacao.slice(11, 13)) < 12 ? (
                    value.data_criacao.slice(8, 10) + "/" + value.data_criacao.slice(5, 7) + "/" + value.data_criacao.slice(0, 4)
                  ) : (
                    value.data_criacao.slice(8, 10) + "/" + value.data_criacao.slice(5, 7) + "/" + value.data_criacao.slice(0, 4)
                  )}
                </TextoData>
            </ContainerReceitas>))}
        </ContainerTodasReceitas>)}
    </ContainerBody> 
    );
}

export default ListaReceitas;