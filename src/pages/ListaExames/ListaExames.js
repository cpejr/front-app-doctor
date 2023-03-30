import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import {
  Body,
  CaixaBaixo,
  CaixaCima,
  Quadro,
  TabFiltro,
  TextoExames,
  TextoTabFiltro,
  TextoQuadro,
  ContainerBotao,
  BotaoFiltro,
  Scroll,
  QuadroExames,
  ContainerExames,
  CaixaData,
  Data,
  CaixaTipoExame,
  TipoExame,
  CaixaHorario,
  Horario,
  CaixaBaixoCarregando,
  TextoSemExame,
} from "./Styles";
import Botao from "../../styles/Botao";
import ConteudoBotao from "../../styles/ConteudoBotao/ConteudoBotao";
import { Cores } from "../../variaveis";
import * as managerService from "../../services/ManagerService/managerService";

function ListaExames({ navigation }) {
  const heightTela = `${Dimensions.get("window").height}px`;
  const widthTela = `${Dimensions.get("window").width}px`;

  const telaPanorâmica = widthTela > heightTela ? "1.2%" : "4%";
  const tituloTelaPanorâmica = widthTela > heightTela ? "22px" : "27px";
  const botaoEstadoTelaPanorâmica = widthTela > heightTela ? "30px" : "50px";

  const [estadoAgendamentoESugestoes, setEstadoAgendamentoESugestoes] =
    useState(true);
  const [estadoExamesMarcados, setEstadoExamesMarcados] = useState(false);
  const [examesMarcados, setExamesMarcados] = useState([]);
  const [carregando, setCarregando] = useState();
  const [todosExames, setTodosExames] = useState([]);

  function alterarEstado() {
    setCarregando(true);
    setEstadoAgendamentoESugestoes(!estadoAgendamentoESugestoes);
    setEstadoExamesMarcados(!estadoExamesMarcados);
  }

  async function PegandoExamesMarcadosdoUsuario() {
    setCarregando(true);
    const resposta = await managerService.PegarExamesMarcadosUsuario();
    setExamesMarcados(resposta);
    setCarregando(false);
  }

  async function PegandoTodosExames() {
    const resposta = await managerService.pegarTodosExames();
    setTodosExames(resposta);
  }

  useEffect(() => {
    PegandoTodosExames();
  },[]);

  useEffect(() => {
    PegandoExamesMarcadosdoUsuario();
  }, [estadoExamesMarcados]);

  function comparaData(a, b) {
    var data1 = new Date(a.data_criacao);
    var data2 = new Date(b.data_criacao);
    if (data1 > data2) {
      return -1;
    } else {
      return 1;
    }
  }

  async function abrirExameClicado(exame) {
    if (exame.id) {
      navigation.push("SolicitarExame", {
        paramKey: exame,
      });
    } else {
      Alert.alert("Erro ao abrir o exame.");
    }
  }

  return (
    <Body>
      <CaixaCima marginTop={telaPanorâmica}>
        <TextoExames fontSize={tituloTelaPanorâmica}>Exames</TextoExames>
        <TabFiltro marginTop={telaPanorâmica}>
          <BotaoFiltro
            height={botaoEstadoTelaPanorâmica}
            campoSelecionado={estadoAgendamentoESugestoes}
            onPress={alterarEstado}
          >
            <TextoTabFiltro campoSelecionado={estadoAgendamentoESugestoes}>
              Agendamento e sugestões
            </TextoTabFiltro>
          </BotaoFiltro>
          <BotaoFiltro
            height={botaoEstadoTelaPanorâmica}
            campoSelecionado={estadoExamesMarcados}
            onPress={alterarEstado}
          >
            <TextoTabFiltro campoSelecionado={estadoExamesMarcados}>
              Exames Marcados
            </TextoTabFiltro>
          </BotaoFiltro>
        </TabFiltro>
      </CaixaCima>
      {estadoAgendamentoESugestoes ? (
        <Scroll>
          <CaixaBaixo>
            <Quadro>
              <TextoQuadro>Se precisar de agendar algum dos exames abaixo, preencha os campos do formulatório específico. A mensagem será encaminhada para a secretaria da Clínica para confirmação e agendamento do exame.
              </TextoQuadro>
              <ContainerBotao
              maxHeight="78%">
                {todosExames?.map((value) => (
                  <Botao
                    key={todosExames.id}
                    marginTop="8%"
                    marginRight="0"
                    marginBotton="10%"
                    height="9%"
                    width="100%"
                    backgroundColor={Cores.cinza[7]}
                    borderRadius="3px"
                    borderColor={Cores.azul}
                    borderWidth="2px"
                    onPress={() => {
                      abrirExameClicado(value)
                    }} 
                  >
                    <ConteudoBotao fontSize="16px" color={Cores.azulEscuro} width="100%">
                      {value?.titulo}
                    </ConteudoBotao>
                    </Botao>
                  ))
                }
                <Botao
                  marginTop="8%"
                  marginRight="0"
                  marginBotton="10%"
                  height="9%"
                  width="100%"
                  backgroundColor={Cores.cinza[7]}
                  borderRadius="3px"
                  borderColor={Cores.azul}
                  borderWidth="2px"
                  onPress={() => navigation.navigate("ExameNormal")}
                >
                  <ConteudoBotao fontSize="16px" color={Cores.azulEscuro}  width="100%">
                    Outros Exames
                  </ConteudoBotao>
                </Botao>
                <Botao
                  marginTop="8%"
                  marginRight="0"
                  marginBotton="10%"
                  height="9%"
                  width="100%"
                  backgroundColor={Cores.cinza[7]}
                  borderRadius="3px"
                  borderColor={Cores.azul}
                  borderWidth="2px"
                  onPress={() => navigation.navigate("Recomendacoes")}
                >
                  <ConteudoBotao fontSize="13px" color={Cores.azulEscuro} width="100%">
                    Sugestões e Indicações (exames & profissionais)
                  </ConteudoBotao>
                </Botao>
                
              </ContainerBotao>
            </Quadro>
          </CaixaBaixo>
        </Scroll>
      ) : (
        <>
          {carregando ? (
            <CaixaBaixoCarregando>
              <ActivityIndicator animating={true} color={Cores.preto} />
            </CaixaBaixoCarregando>
          ) : (
            <Scroll>
              <CaixaBaixo>
                {examesMarcados.length === 0 ? (
                  <QuadroExames>
                    <TextoSemExame>
                      Você ainda não possui exames marcados!
                    </TextoSemExame>
                  </QuadroExames>
                ) : (
                  <QuadroExames>
                    {examesMarcados?.sort(comparaData).map((value) => (
                      <ContainerExames key={value.id}>
                        <CaixaData>
                          <Data>
                            {value.data_hora.slice(8, 10) +
                              "/" +
                              value.data_hora.slice(5, 7) +
                              "/" +
                              value.data_hora.slice(0, 4)}
                          </Data>
                        </CaixaData>
                        <CaixaTipoExame>
                          <TipoExame>{value.titulo}</TipoExame>
                        </CaixaTipoExame>
                        <CaixaHorario>
                          <Horario>{value.data_hora.slice(11, 16)}</Horario>
                        </CaixaHorario>
                      </ContainerExames>
                    ))}
                  </QuadroExames>
                )}
              </CaixaBaixo>
            </Scroll>
          )}
        </>
      )}
    </Body>
  );
}

export default ListaExames;
