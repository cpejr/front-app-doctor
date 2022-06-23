import React, { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  TextInput,
  useWindowDimensions,
  Button,
  Text,
  TouchableOpacity,
  ActivityIndicator,
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
import { Cores } from "../../variaveis";

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
  const [carregando, setCarregando] = useState(true);
  const [telaRespondido, setTelaRespondido] = useState(true);

  async function pegandoFormulariosPaciente() {
    const resposta = await managerService.GetFormulariosPaciente();
    if (listaFormRespondido.length === 0 && listaFormPendente.length === 0) {
      resposta.forEach((formulario) => {
        if (formulario.status === true) {
          listaFormRespondido.push(formulario);
        } else {
          listaFormPendente.push(formulario);
        }
      });
    }
    setFormulariosPaciente(listaFormRespondido);
    setCarregando(false);
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

  function trocandoTelaRespondido() {
    setFormulariosPaciente(listaFormRespondido);
    setTelaRespondido(true);
  }

  function trocandoTelaPendente() {
    setFormulariosPaciente(listaFormPendente);
    setTelaRespondido(false);
  }

  async function abrirFormularioEspecifico(formularioEspecifico) {
    navigation.navigate("PreencherFormulario", {
      paramKey: formularioEspecifico,
    });
  }

  const corRespondido = telaRespondido ? Cores.azulEscuro : Cores.cinza[2];
  const corPendente = telaRespondido ? Cores.cinza[2] : Cores.azulEscuro;
  const linhaRespondido = telaRespondido ? "1.5px" : "0px";
  const linhaPendente = telaRespondido ? "0px" : "1.5px";

  return (
    <Scroll>
      <Body>
        <BarraPesquisa>
          <InputPesquisa placeholder="Pesquisar formulário" />
          <IconPesquisa source={searchIcon} />
        </BarraPesquisa>

        <TabView>
          <TouchableOpacity onPress={() => trocandoTelaRespondido()}>
            <FiltroRespondido
              color={corRespondido}
              borderBottomWidth={linhaRespondido}
            >
              Respondido
            </FiltroRespondido>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => trocandoTelaPendente()}>
            <FiltroNaoRespondido
              color={corPendente}
              borderBottomWidth={linhaPendente}
            >
              Não Respondido
            </FiltroNaoRespondido>
          </TouchableOpacity>
        </TabView>
        {formulariosPaciente?.map((valor) => (
          <>
            {carregando ? (
              <ActivityIndicator animating={true} color={"#8D8D8D"} />
            ) : (
              <CaixaLista key={valor.id}>
                <TouchableOpacity
                  onPress={() => {
                    abrirFormularioEspecifico(valor);
                  }}
                >
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
                      <TextoTipoData>
                        {formatandoData(valor.data_criacao)}
                      </TextoTipoData>
                    </CaixaTipoData>
                  </CaixaItem>
                </TouchableOpacity>
              </CaixaLista>
            )}
          </>
        ))}
      </Body>
    </Scroll>
  );
}

export default ListaFormularios;
