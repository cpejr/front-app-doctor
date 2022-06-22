import React, { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  TextInput,
  useWindowDimensions,
  Button,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  Scroll,
  Body,
  BarraPesquisa,
  InputPesquisa,
  IconPesquisa,
  TabView,
  FiltroRespondido,
  FiltroNaoRespondido,
  CaixaLista,
  CaixaItem,
  BotaoForm,
  CaixaNomeUrgencia,
  CaixaUrgenciaEstrela,
  FormNome,
  UrgenciaTexto,
  CaixaEstrela,
  EstrelaIcon,
  CaixaTipoData,
  TextoTipoData,
} from "./Styles";
import Input from "../../styles/Input";
import searchIcon from "../../assets/searchIcon.png";
import * as managerService from "../../services/ManagerService/managerService";
import Icon from "react-native-vector-icons/Entypo";

function ListaFormularios({ navigation }) {
  const { width } = useWindowDimensions();

  const larguraUrgenciaEstrelaMaior = width < 600 ? "26%" : "20%";
  const larguraUrgenciaEstrelaMedio =
    width < 550 ? "37%" : larguraUrgenciaEstrelaMaior;
  const larguraUrgenciaEstrela =
    width < 400 ? "39%" : larguraUrgenciaEstrelaMedio;
  const larguraCaixaTipoData = width < 700 ? "88%" : "95%";

  const [formulariosPaciente, setFormulariosPaciente] = useState([]);
  const [listaFormRespondido, setListaFormRespondido] = useState([]);
  const [listaFormPendente, setListaFormPendente] = useState([]);
  const [corRespondido, setCorRespondido] = useState("#0A0E3C");
  const [bordaRespondido, setBordaRespondido] = useState("1.5px");
  const [corPendente, setCorPendente] = useState("#8D8D8D");
  const [bordaPendente, setBordaPendente] = useState("0px")

  async function pegandoFormulariosPaciente() {
    const resposta = await managerService.GetFormulariosPaciente();
    resposta.forEach((formulario) => {
      if (formulario.status === true) {
        listaFormRespondido.push(formulario);
      } else {
        listaFormPendente.push(formulario);
      }
    });
    setFormulariosPaciente(listaFormRespondido);
  }

  useEffect(() => {
    pegandoFormulariosPaciente();
  }, []);

  function formatandoData(dataCriacao) {
    const data = new Date(dataCriacao).toLocaleDateString();
    return data;
  }

  function estrelaPreenchida(numPreenchido) {
    if (numPreenchido !== 0) {
      return (
        <>
          <Icon name="star" size={18} color="#434B97" />
          {estrelaPreenchida(numPreenchido - 1)}
        </>
      );
    } else {
      return;
    }
  }
  function estrelaNaoPreenchida(numNaoPreenchido) {
    if (numNaoPreenchido !== 0) {
      return (
        <>
          <Icon name="star-outlined" size={20} color="#434B97" />
          {estrelaNaoPreenchida(numNaoPreenchido - 1)}
        </>
      );
    } else {
      return;
    }
  }

  function trocandoTelaRespondido(){
    setFormulariosPaciente(listaFormRespondido)
    setCorRespondido("#0A0E3C")
    setBordaRespondido("1.5px")
    setCorPendente("#8D8D8D")
    setBordaPendente("0px")
  }

  function trocandoTelaPendente(){
    setFormulariosPaciente(listaFormPendente)
    setCorRespondido("#8D8D8D")
    setBordaRespondido("0px")
    setCorPendente("#0A0E3C")
    setBordaPendente("1.5px")
  }

  // async function abrirFormularioEspecifico() {
  //   navigation.navigate("FormularioEspecifico", {
  //     paramKey: formularioEspecifico,
  //   });
  // }

  return (
    <Scroll>
      <Body>
        <BarraPesquisa>
          <InputPesquisa placeholder="Pesquisar formulário" />
          <IconPesquisa source={searchIcon} />
        </BarraPesquisa>

        <TabView>
          <TouchableOpacity
            onPress={() => trocandoTelaRespondido()}
          >
            <FiltroRespondido
            color={corRespondido}
            borderBottomWidth={bordaRespondido}
            >Respondido</FiltroRespondido>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => trocandoTelaPendente()}
          >
            <FiltroNaoRespondido
            color={corPendente}
            borderBottomWidth={bordaPendente}
            >Não Respondido</FiltroNaoRespondido>
          </TouchableOpacity>
        </TabView>

        {formulariosPaciente?.map(
          (valor) => (
            <CaixaLista key={valor.id}>
              <CaixaItem>
                <CaixaNomeUrgencia>
                  <FormNome>{valor.titulo}</FormNome>
                  <CaixaUrgenciaEstrela width={larguraUrgenciaEstrela}>
                    <UrgenciaTexto>Urgência</UrgenciaTexto>
                    <CaixaEstrela>
                      {estrelaPreenchida(valor.urgencia)}
                      {estrelaNaoPreenchida(3 - valor.urgencia)}
                    </CaixaEstrela>
                  </CaixaUrgenciaEstrela>
                </CaixaNomeUrgencia>
                <CaixaTipoData width={larguraCaixaTipoData}>
                  <TextoTipoData>Tipo: {valor.tipo}</TextoTipoData>
                  <TextoTipoData>{formatandoData(valor.data_criacao)}</TextoTipoData>
                </CaixaTipoData>
              </CaixaItem>
            </CaixaLista>
          )
        )}
      </Body>
    </Scroll>
  );
}

export default ListaFormularios;
