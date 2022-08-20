import React, { useEffect, useState } from "react";
import {
  useWindowDimensions,
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
  CaixaNomeUrgencia,
  CaixaUrgenciaEstrela,
  FormNome,
  UrgenciaTexto,
  CaixaEstrela,
  CaixaTipoData,
  TextoTipoData,
  CaixaLoading,
} from "./Styles";
import searchIcon from "../../assets/searchIcon.png";
import * as managerService from "../../services/ManagerService/managerService";
import Icon from "react-native-vector-icons/Entypo";
import { Cores } from "../../variaveis";
import AsyncStorage from "@react-native-async-storage/async-storage";

function ListaFormularios({ navigation }) {
  const { width } = useWindowDimensions();

  const larguraUrgenciaEstrelaMaior = width < 600 ? "26%" : "20%";
  const larguraUrgenciaEstrelaMedio =
    width < 550 ? "37%" : larguraUrgenciaEstrelaMaior;
  const larguraUrgenciaEstrela =
    width < 400 ? "39%" : larguraUrgenciaEstrelaMedio;
  const larguraCaixaTipoData = width < 700 ? "88%" : "95%";

  const [listaOriginal, setListaOriginal] = useState([]);
  const [formulariosPaciente, setFormulariosPaciente] = useState([]);
  const [listaFormRespondido, setListaFormRespondido] = useState([]);
  const [listaFormPendente, setListaFormPendente] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [telaRespondido, setTelaRespondido] = useState(true);
  const [busca, setBusca] = useState("");
  const aux = [];

  const lowerBusca = busca.toLowerCase();
  const onChangeBusca = (busca) => setBusca(busca);
  const formulariosFiltrados = formulariosPaciente.filter((form) => {
    if (lowerBusca === "") return formulariosPaciente;
    else
      return (
        form?.titulo
          ?.toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(lowerBusca) ||
        form?.tipo
          ?.toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(lowerBusca) ||
        form?.titulo?.toLowerCase().includes(lowerBusca) ||
        form?.tipo?.toLowerCase().includes(lowerBusca)
      );
  });

  async function pegandoFormulariosPaciente() {
    await AsyncStorage.getItem("@AirBnbApp:email")
      .then((res) => {
        managerService.GetFormulariosPaciente(res).then((resposta) => {
          resposta.forEach((formulario) => {
            if (formulario.status === true) {
              listaFormRespondido.push(formulario);
            } else {
              listaFormPendente.push(formulario);
            }
          });
          setFormulariosPaciente(listaFormRespondido);
          setCarregando(false);
        });
      })
      .catch((error) => alert(error));
  }

  useEffect(() => {
    pegandoFormulariosPaciente();
  }, []);

  function formatandoData(dataCriacao) {
    const data = new Date(dataCriacao).toLocaleDateString();
    return data;
  }

  function renderizarEstrelaPreenchida(numPreenchido) {
    if (numPreenchido !== 0) {
      return (
        <>
          <Icon name="star" size={18} color="#434B97" />
          {renderizarEstrelaPreenchida(numPreenchido - 1)}
        </>
      );
    } else {
      return;
    }
  }

  function renderizarEstrelaNaoPreenchida(numNaoPreenchido) {
    if (numNaoPreenchido !== 0) {
      return (
        <>
          <Icon name="star-outlined" size={20} color="#434B97" />
          {renderizarEstrelaNaoPreenchida(numNaoPreenchido - 1)}
        </>
      );
    } else {
      return;
    }
  }

  function trocandoTelaRespondido() {
    setFormulariosPaciente("");
    setFormulariosPaciente(listaFormRespondido);
    setTelaRespondido(true);
  }

  function trocandoTelaPendente() {
    setFormulariosPaciente("");
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
          <InputPesquisa
            placeholder="Pesquisar formulário"
            onChangeText={onChangeBusca}
            value={busca}
          />
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
        {formulariosFiltrados?.map((valor) => (
          <CaixaLista key={valor.id}>
            <TouchableOpacity
              onPress={() => {
                abrirFormularioEspecifico(valor);
              }}
            >
              <CaixaItem>
                {carregando ? (
                  <CaixaLoading>
                    <ActivityIndicator
                      animating={true}
                      color={Cores.cinza[2]}
                    />
                  </CaixaLoading>
                ) : (
                  <>
                    <CaixaNomeUrgencia>
                      <FormNome>{valor.titulo}</FormNome>
                      <CaixaUrgenciaEstrela width={larguraUrgenciaEstrela}>
                        <UrgenciaTexto>Urgência</UrgenciaTexto>
                        <CaixaEstrela>
                          {renderizarEstrelaPreenchida(valor.urgencia)}
                          {renderizarEstrelaNaoPreenchida(3 - valor.urgencia)}
                        </CaixaEstrela>
                      </CaixaUrgenciaEstrela>
                    </CaixaNomeUrgencia>
                    <CaixaTipoData width={larguraCaixaTipoData}>
                      <TextoTipoData>Tipo: {valor.tipo}</TextoTipoData>
                      <TextoTipoData>
                        {formatandoData(valor.data_criacao)}
                      </TextoTipoData>
                    </CaixaTipoData>
                  </>
                )}
              </CaixaItem>
            </TouchableOpacity>
          </CaixaLista>
        ))}
      </Body>
    </Scroll>
  );
}

export default ListaFormularios;
