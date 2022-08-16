import React, { useState, useEffect } from "react";
import { sleep } from "../../utils/sleep";
import { ActivityIndicator, Colors, Searchbar } from "react-native-paper";
import {
  Alert,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
  FlatList,
} from "react-native";
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
  const [receitas, setReceitas] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [busca, setBusca] = useState("");
  const lowerBusca = busca.toLowerCase();

  const onChangeBusca = (busca) => setBusca(busca);

  async function pegandoReceitas() {
    setCarregando(true);
    const resposta = await managerService.GetDadosReceitas();
    setReceitas(resposta.dadosReceitas[0].receita);
    setCarregando(false);
  }

  useEffect(() => {
    pegandoReceitas();
  }, []);

  function comparaData(a, b){
    var data1 = new Date(a.data_criacao);
    var data2 = new Date(b.data_criacao);
    if (data1 > data2){
        return 1;
    }
    else {
        return -1;
    }
}

  const receitasFiltradas = receitas.filter((receita) => {
    if (lowerBusca === "") return receitas;
    else return receita?.titulo?.toLowerCase().includes(lowerBusca);
  });

  return (
    <ContainerBody>
      <ContainerCima>
        <BarraPesquisa>
          <InputPesquisa
            placeholder="BUSCAR"
            onChangeText={onChangeBusca}
            value={busca}
          />
          <IconPesquisa source={searchIcon} />
        </BarraPesquisa>
      </ContainerCima>
      {carregando ? (
        <PaginaCarregando>
          <ActivityIndicator animating={true} color={Colors.black} />
        </PaginaCarregando>
      ) : (
        <ScrollView>
          <ContainerTodasReceitas>
            {receitasFiltradas?.sort(comparaData).map((value) => (
              <ContainerReceitas key={value.id}>
                <TituloReceitas>{value.titulo}</TituloReceitas>
                <TextoData>
                  {value.data_criacao.slice(8, 10) +
                    "/" +
                    value.data_criacao.slice(5, 7) +
                    "/" +
                    value.data_criacao.slice(0, 4)}
                </TextoData>
              </ContainerReceitas>
            ))}
          </ContainerTodasReceitas>
        </ScrollView>
      )}
    </ContainerBody>
  );
}

export default ListaReceitas;
